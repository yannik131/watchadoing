<template>
    <div id="canvas" class="absolute text-center cursor-pointer blurry">
    </div>
    
    <div class="text-3xl font-bold fixed text-center z-20 flex justify-center items-center text-white" style="left: 50%; transform: translate(-50%, 0)">
        <div v-if="$store.getters.selectedLocation">
            {{ formatLocation($store.getters.selectedLocation) }}
            <div v-touch="onCloseClick">
                <i class="ml-2 fas fa-window-close cursor-pointer"></i>
            </div>
        </div>
        <div v-else-if="$store.getters.isFetching">
            Loading data.. <i class="fa fa-spinner fa-spin mt-10 text-6xl"></i>
        </div>
        <div v-else-if="$store.getters.locationConfirmed">
            Watcha doing?
        </div>
    </div>
    
    <div id="add" class="fixed z-20 flex items-center blurry" style="top: 50%; right: 0; transform: translate(0, -50%)">
        <div class="flex flex-col">
            <div class="flex justify-center items-center flex-col cursor-pointer hover-green" style="background-color: white; height: 40px; width: 40px; border-radius: 50%;" v-touch="toggleAddActivity">
            <i class="fas fa-plus text-xl"></i>
        </div>
        <div class="text-white text-center">Add</div>
        </div>
    </div>
    
    <Introduction v-if="!$store.getters.locationConfirmed"></Introduction>
    
    <AddActivity v-if="$store.getters.showAddActivity" @activity-created="onActivityCreated" @close="toggleAddActivity({ closed: true })"></AddActivity>
    
    <Bubble 
        v-for="activity in $store.getters.displayedActivities" 
        :key="activity.title" 
        :activity="activity"
        :bubbleSvgEdgeLength="601"
        :mapRectSvgEdgeLength="150"
        >
    </Bubble>
</template>

<style>
#canvas {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
}

.blurry {
    filter: blur(2px);
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
}

.hover-green:hover {
    color: green;
}
</style>

<script>
import Bubble from '../components/Bubble';
import AddActivity from '../components/AddActivity.vue';
import Introduction from '../components/Introduction.vue';
import { createActivity, getActivities } from '../services/activity';
import { watch, onMounted } from 'vue';
import { centerMapToUserLocation, getMap, addMarker, clearLayers } from '../services/map';
import store from '../services/store';
import { getLocations, locationTree, formatLocation } from '../services/location';
import { addToList } from '../helpers/utils.js';
import PositionFactory from '../helpers/positionFactory';

export default {
    name: 'Home',
    components: {
        Bubble,
        AddActivity,
        Introduction
    },
    setup() {
        function onMarkerClick(location) {
            clearLayers();
            store.commit('setSelectedLocation', { location });
            let cities = locationTree.collectCitiesIn(location);
            const activities = {};
            
            for(const city of cities) {
                const activitiesInCity = store.getters.activityMap[city.id];
                if(!activitiesInCity) {
                    continue;
                }
                for(const activity of activitiesInCity) {
                    if(!activities[activity.title]) {
                        activities[activity.title] = activity.likeCount;
                    }
                    else {
                        activities[activity.title] += activity.likeCount;
                    }
                }
            }
            
            const center = getMap().latLngToLayerPoint([location.latitude, location.longitude]);
            PositionFactory.set(center.x, center.y, 150);
            
            let displayedActivities = [];
            for(const [title, likeCount] of Object.entries(activities)) {
                displayedActivities.push({
                    title, likeCount
                });
            }
            
            displayedActivities.sort((a, b) => {
                return b.likeCount - a.likeCount;
            });
            const isUserLocation = store.getters.userLocation.id === location.id;
            
            displayedActivities = displayedActivities.slice(0, isUserLocation? 100 : 10);
            if(displayedActivities.length === 0) {
                store.commit('setDisplayedActivities', { displayedActivities });
                return; //TODO: Issue info
            }
            const maxLikeCount = displayedActivities[0].likeCount;
            const minLikeCount = displayedActivities[displayedActivities.length-1].likeCount;
            
            store.commit('setLikeCountMinMax', { minLikeCount, maxLikeCount });
            store.commit('setDisplayedActivities', { displayedActivities });
        }
        
        function clearBubbles() {
            store.commit('setDisplayedActivities', { displayedActivities: [] });
            store.commit('setSelectedLocation', { location: null });
            clearLayers();
        }
        
        function addMarkersForCurrentZoomLevel() {
            const locations = [];
            const zoomMap = {
                4: locationTree.countries,
                6: locationTree.states,
                8: locationTree.counties,
                10: locationTree.cities
            };
            const locationMap = zoomMap[getMap().getZoom()];
            
            for(const locationId of Object.keys(locationMap)) {
                for(const child of locationMap[locationId]) {
                    locations.push(child);
                    addMarker(child.latitude, child.longitude)
                        .bindPopup(`${child.country}, ${child.state}, ${child.county}, ${child.city}`)
                        .addEventListener('click', () => {
                            onMarkerClick(child);
                        });
                }
            }
        }
        
        function onCloseClick() {
            clearBubbles();
            addMarkersForCurrentZoomLevel();
        }
        
        onMounted(async () => {
            getMap();
        });
        
        function toggleAddActivity({ closed }) {
            if(!closed) {
                getMap().setZoom(10, { animate: false });
                centerMapToUserLocation();
                if(!(store.getters.selectedLocation && store.getters.userLocation) || store.getters.selectedLocation.id !== store.getters.userLocation.id) {
                    //I don't know when exactly the zoomend and zoomstart event listeners are triggered. This small time out
                    //ought to take care of the issue.
                    setTimeout(() => {
                        clearBubbles();
                        onMarkerClick(store.getters.userLocation);
                    }, 100);
                }
                
            }
            //This small timeout prevents a tooltip from appearing if a bubble is behind the cancel button
            setTimeout(() => store.commit('toggleShowAddActivity'), 10);
        }
        
        async function onActivityCreated(title) {
            await createActivity(title);
            clearBubbles();
            setTimeout(() => onMarkerClick(store.getters.userLocation), 100);
        }
        
        watch(() => store.getters.locationConfirmed, async () => {
            //leaflet doesn't play nicely with Vues dynamic class attributes
            document.getElementById('canvas').classList.toggle('blurry');
            document.getElementById('add').classList.toggle('blurry');
            store.commit('setFetching', { value: true });
            const locations = await getLocations();
            locationTree.addLocations(locations);
            
            const activities = await getActivities();
            const activityMap = {};
            for(const activity of activities) {
                addToList(activityMap, activity.location, activity);
            }
            store.commit('setActivityMap', { activityMap });
            
            getMap().addEventListener('zoomend', addMarkersForCurrentZoomLevel);
            getMap().addEventListener('zoomstart', clearBubbles);
            addMarkersForCurrentZoomLevel();
            
            store.commit('setFetching', { value: false });
            
            centerMapToUserLocation();
        });
        
        return {
            toggleAddActivity,
            createActivity,
            centerMapToUserLocation,
            formatLocation,
            onCloseClick,
            onActivityCreated,
            yesSVG: require('../svg/yes.svg'),
            okaySVG: require('../svg/okay.svg'),
            noSVG: require('../svg/no.svg')
        }
    }
}
</script>

