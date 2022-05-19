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
        <span v-else class="mr-2">
            Double click the bubbles!
        </span>
        <div class="plus my-2" @click="toggleAddActivity()">
            <i class="fas fa-plus mr-1"></i>
            Add
        </div>
        <div class="plus my-2 flex items-center" @click="centerMapToUserLocation()">
            <i class="fas fa-location-arrow mr-1"></i>
            Center
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
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
}
</style>

<script>
import Bubble from '../components/Bubble';
import AddActivity from '../components/AddActivity';
import Introduction from '../components/Introduction';
import { createActivity, getActivities } from '../services/activity';
import { ref, watch } from 'vue';
import { centerMapToUserLocation, getMap, addMarker } from '../services/map';
import store from '../services/store';
import { getLocations, locationTree } from '../services/location';
import { addToList } from '../helpers/utils.js';

export default {
    name: 'Home',
    components: {
        Bubble,
        AddActivity,
        Introduction
    },
    async mounted() {
        getMap();
        
        const activities = await getActivities();
        const activityMap = {};
        for(const activity of activities) {
            addToList(activityMap, activity.location, activity);
        }
        store.commit('setActivities', { activities: activityMap });
        
        const locations = await getLocations();
        locationTree.addLocations(locations);
        
        for(const country of locationTree.countries) {
            addMarker(country.latitude, country.longitude);
        }
        
        //TODO: Get all activities from selected location by getting all counties inside the selected location and then retrieving them from activityMap[county]
        //TODO: Delete old code related to sorting activities and created bubbles
        
        centerMapToUserLocation();
    },
    setup() {
        let showAddActivity = ref(false);
        
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
            centerMapToUserLocation
        }
    }
}
</script>

