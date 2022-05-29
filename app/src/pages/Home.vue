<template>
    <div id="canvas" class="absolute text-center cursor-pointer blurry">
    </div>
    
    <div v-if="$store.getters.selectedLocation" class="text-3xl font-bold fixed left-0 right-0 text-center z-20 flex justify-center items-center text-white">
        {{ formatLocation($store.getters.selectedLocation) }}
        <div v-touch="onCloseClick">
            <i class="ml-2 fas fa-window-close cursor-pointer"></i>
        </div>
    </div>
    
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
    /*-webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);*/
}

</style>

<script>
import Bubble from '../components/Bubble';
import { createActivity, getActivities } from '../services/activity';
import { ref, watch, onMounted } from 'vue';
import { centerMapToUserLocation, getMap, addMarker, clearLayers } from '../services/map';
import store from '../services/store';
import { getLocations, locationTree, formatLocation } from '../services/location';
import { addToList } from '../helpers/utils.js';
import PositionFactory from '../helpers/positionFactory';

export default {
    name: 'Home',
    components: {
        Bubble
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
            if(displayedActivities.length === 0) {
                addMarkersForCurrentZoomLevel();
                return; //TODO: Issue info
            }
            
            displayedActivities.sort((a, b) => {
                return b.likeCount - a.likeCount;
            });
            displayedActivities = displayedActivities.slice(0, 10);
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
            const map = getMap();
            
            const locations = await getLocations();
            locationTree.addLocations(locations);
            
            const activities = await getActivities();
            const activityMap = {};
            for(const activity of activities) {
                addToList(activityMap, activity.location, activity);
            }
            store.commit('setActivityMap', { activityMap });
            
            map.addEventListener('zoomend', addMarkersForCurrentZoomLevel);
            map.addEventListener('zoomstart', clearBubbles);
            addMarkersForCurrentZoomLevel();
            
            centerMapToUserLocation();
        });
        
        let showAddActivity = ref(false);
        const count = ref(10);
        
        function toggleAddActivity() {
            showAddActivity.value = !showAddActivity.value;
        }
        
        watch(() => store.getters.locationConfirmed, () => {
            //leaflet doesn't play nicely with Vues dynamic class attributes
            document.getElementById('canvas').classList.toggle('blurry');
        });
        
        return {
            showAddActivity,
            toggleAddActivity,
            createActivity,
            centerMapToUserLocation,
            formatLocation,
            onCloseClick,
            count,
            yesSVG: require('../svg/yes.svg'),
            okaySVG: require('../svg/okay.svg'),
            noSVG: require('../svg/no.svg')
        }
    }
}
</script>

