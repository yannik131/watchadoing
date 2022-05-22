<template>
    <Introduction v-if="!$store.getters.locationConfirmed"></Introduction>
    <div id="canvas" class="absolute text-center cursor-pointer blurry">
        <Bubble 
            v-for="activity in $store.getters.activities" 
            :key="activity.title" 
            :activity="activity">
        </Bubble>
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
        <div class="flex-col">
            <div class="grid grid-cols-2">
                <input style="width:600px" id="xmin" class="col" type="range" min="-500" max="200" v-model="xmin" />
                <label for="xmin">xmin: {{ xmin }}</label>
            </div>
            <div class="grid grid-cols-2">
                <input style="width:600px" id="xmin" class="col" type="range" min="-200" max="200" v-model="ymin" />
                <label for="xmin">ymin: {{ ymin }}</label>
            </div>
            <div class="grid grid-cols-2">
                <input style="width:600px" id="width" class="col" type="range" min="0" max="1080" v-model="width" />
                <label for="width">width: {{ width }}</label>
            </div>
            <div class="grid grid-cols-2">
                <input style="width:600px" id="height" class="col" type="range" min="0" max="740" v-model="height" />
                <label for="height">height: {{ height }}</label>
            </div>
        </div>
        
    </div>
    
    <AddActivity v-if="showAddActivity" @activity-created="createActivity" @close="toggleAddActivity()"></AddActivity>
    
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
import AddActivity from '../components/AddActivity';
import Introduction from '../components/Introduction';
import { createActivity, getActivities } from '../services/activity';
import { ref, watch } from 'vue';
import { centerMapToUserLocation, getMap, addMarker, clearMarkers, drawBubble } from '../services/map';
import store from '../services/store';
import { getLocations, locationTree } from '../services/location';
import { addToList } from '../helpers/utils.js';

let svgElement;

export default {
    name: 'Home',
    components: {
        Bubble,
        AddActivity,
        Introduction
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
        
        function collectCitiesIn(location) {
            if(location.city) {
                return [location];
            }
            if(location.county) {
                return locationTree.cities[location.id];
            }
            if(location.state) {
                const cities = [];
                for(const county of locationTree.counties[location.id]) {
                    cities.push.apply(cities, locationTree.cities[county.id]);
                }
                return cities;
            }
            if(location.country) {
                const cities = [];
                for(const state of locationTree.states[location.id]) {
                    cities.push.apply(cities, collectCitiesIn(state));
                }
                return cities;
            }
        }
        
        function onMarkerClick(location) {
            let cities = collectCitiesIn(location);
            const activities = [];
            for(const city of cities) {
                activities.push.apply(activities, store.getters.activities[city.id]);
            }
        }
        
        function addMarkersForCurrentZoomLevel() {
            clearMarkers();
            const locations = [];
            const dict = zoomMap[map.getZoom()];
            for(const key of Object.keys(dict)) {
                for(const child of dict[key]) {
                    locations.push(child);
                    addMarker(child.latitude, child.longitude).bindPopup(`${child.country}, ${child.state}, ${child.county}, ${child.city}`).addEventListener('click', () => {
                        onMarkerClick(child);
                    });
                    //Winschoten not displayed?
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
        store.commit('setActivities', { activities: activityMap });
        
        svgElement = drawBubble(51.083420, 10.423447, 0.5);
        
        //drawBubble(52.083420, 11.423447);
        //TODO: Get all activities from selected location by getting all counties inside the selected location and then retrieving them from activityMap[county]
        //TODO: Delete old code related to sorting activities and created bubbles
        
        centerMapToUserLocation();
    },
    setup() {
        let showAddActivity = ref(false);
        const xmin = ref(0);
        const ymin = ref(0);
        const width = ref(270);
        const height = ref(270);
        
        function toggleAddActivity() {
            showAddActivity.value = !showAddActivity.value;
        }
        
        watch(() => store.getters.locationConfirmed, () => {
            //leaflet doesn't play nicely with Vues dynamic class attributes
            document.getElementById('canvas').classList.toggle('blurry');
        });
        
        function updateViewBox() {
            svgElement.setAttribute(
                'viewBox', 
                `${xmin.value} ${ymin.value} ${width.value} ${height.value}`
            );
        }
        
        watch(() => xmin.value, updateViewBox);
        watch(() => ymin.value, updateViewBox);
        watch(() => width.value, updateViewBox);
        watch(() => height.value, updateViewBox);
        
        return {
            showAddActivity,
            toggleAddActivity,
            createActivity,
            centerMapToUserLocation,
            xmin,
            ymin,
            height,
            width
        }
    }
}
</script>

