<template>
    <Introduction v-if="!$store.getters.locationConfirmed"></Introduction>
    <div id="canvas" class="absolute text-center cursor-pointer blurry">
    </div>
    
    <div v-if="!$store.getters.userLatitude" class="text-2xl font-bold fixed left-0 right-0 text-center z-20 bg-white flex flex-col justify-center items-center">
        <div class="font-bold text-2xl mr-2">Getting location.. <i class="fa fa-spinner fa-spin"></i></div>
        
    </div>
    
    <div v-else-if="$store.getters.isFetching" class="text-2xl font-bold fixed left-0 right-0 text-center z-20 bg-white flex flex-col justify-center items-center">
        <div class="font-bold text-2xl mr-2">Fetching data.. <i class="fa fa-spinner fa-spin"></i></div>
        
    </div>
    
    <div 
        v-else
        class="text-2xl font-bold fixed left-0 right-0 text-center z-20 bg-white flex justify-center items-center mt-0 px-2">
        <span v-if="$store.getters.activities.length === 0" class="mr-2">
            Nothing here yet :(
        </span>
        <!--<span v-else class="mr-2">
            Double click the bubbles!
        </span>
        <div class="plus my-2" @click="toggleAddActivity()">
            <i class="fas fa-plus mr-1"></i>
            Add
        </div>
        <div class="plus my-2 flex items-center" @click="centerMapToUserLocation()">
            <i class="fas fa-location-arrow mr-1"></i>
            Center
        </div>-->
    </div>
    
    <Bubble 
        v-for="activity in store.getters.displayedActivities" 
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
import Introduction from '../components/Introduction';
import Bubble from '../components/Bubble';
import { createActivity, getActivities } from '../services/activity';
import { ref, watch } from 'vue';
import { centerMapToUserLocation, getMap, addMarker, clearMarkers } from '../services/map';
import store from '../services/store';
import { getLocations, locationTree } from '../services/location';
import { addToList } from '../helpers/utils.js';
import PositionFactory from '../helpers/positionFactory';

export default {
    name: 'Home',
    components: {
        Introduction,
        Bubble
    },
    async mounted() {
        const map = getMap();
        
        const locations = await getLocations();
        locationTree.addLocations(locations);
        
        const zoomMap = {
            4: locationTree.countries,
            6: locationTree.states,
            8: locationTree.counties,
            10: locationTree.cities
        };
        
        function onMarkerClick(location) {
            let cities = locationTree.collectCitiesIn(location);
            const activities = {};
            
            for(const city of cities) {
                for(const activity of store.getters.activityMap[city.id]) {
                    if(!activities[activity.title]) {
                        activities[activity.title] = activity.likeCount;
                    }
                    else {
                        activities[activity.title] += activity.likeCount;
                    }
                }
            }
            
            const center = map.latLngToLayerPoint([location.latitude, location.longitude]);
            PositionFactory.set(center.x, center.y, 150);
            
            const displayedActivities = [];
            for(const [title, likeCount] of activities) {
                displayedActivities.push({
                    title, likeCount
                });
            }
            store.setDisplayedActivities(displayedActivities);
        }
        
        function addMarkersForCurrentZoomLevel() {
            clearMarkers();
            const locations = [];
            const locationMap = zoomMap[map.getZoom()];
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
        
        map.addEventListener('zoomend', addMarkersForCurrentZoomLevel);
        addMarkersForCurrentZoomLevel();
        
        const activities = await getActivities();
        const activityMap = {};
        for(const activity of activities) {
            addToList(activityMap, activity.location, activity);
        }
        store.commit('setActivityMap', { activityMap });
        
        centerMapToUserLocation();
    },
    setup() {
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
            count,
            yesSVG: require('../svg/yes.svg'),
            okaySVG: require('../svg/okay.svg'),
            noSVG: require('../svg/no.svg')
        }
    }
}
</script>

