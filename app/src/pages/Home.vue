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
    
    <AddActivity v-if="showAddActivity" @activity-created="createActivity" @close="toggleAddActivity()"></AddActivity>
    
    <div v-for="i in count" :key="i" :id="`bubble-${i-1}-tooltip`" class="flex flex-col hidden bg-white rounded border border-gray-400 p-1 gap-1 z-30 tooltip text-left" role="tooltip">
        <div class="flex flex-row">
            <div class="p-2 hover:bg-gray-100 text-green-500 font-bold text-xl flex items-center"><img :src="yesSVG"/> <span class="ml-2">Yes!</span></div>
            <div class="p-2 hover:bg-gray-100 text-red-500 font-bold text-xl flex items-center" style="border-left: 1px solid lightgray"><img :src="noSVG"/> <span class="ml-2">No!</span></div>
        </div>
        <hr>
        <div class="p-2 hover:bg-gray-100 text-gray-500 font-bold text-xl flex items-center justify-center"><img :src="okaySVG"/> <span class="ml-2">Okay.</span></div>
        <div class="arrow" data-popper-arrow></div>
    </div>
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

.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
  left: -4px;
}

</style>

<script>
import AddActivity from '../components/AddActivity';
import Introduction from '../components/Introduction';
import { createActivity, getActivities } from '../services/activity';
import { ref, watch } from 'vue';
import { centerMapToUserLocation, getMap, addMarker, clearMarkers, drawBubbles } from '../services/map';
import store from '../services/store';
import { getLocations, locationTree } from '../services/location';
import { addToList } from '../helpers/utils.js';

export default {
    name: 'Home',
    components: {
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
        //addMarkersForCurrentZoomLevel();
        
        const activities = await getActivities();
        const activityMap = {};
        for(const activity of activities) {
            addToList(activityMap, activity.location, activity);
        }
        store.commit('setActivities', { activities: activityMap });
        
        drawBubbles(51.083420, 10.423447, 10);
        
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

