<template>
    <Introduction v-if="!$store.getters.introductionShown"></Introduction>
    <div id="canvas" class="absolute text-center cursor-pointer">
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
</style>

<script>
import Bubble from '../components/Bubble';
import AddActivity from '../components/AddActivity';
import Introduction from '../components/Introduction';
import { createActivity, getActivities } from '../services/activity';
import { getUserLocation } from '../services/location';
import { ref } from 'vue';
import { getMap } from '../services/map';
import store from '../services/store';

export default {
    name: 'Home',
    components: {
        Bubble,
        AddActivity,
        Introduction
    },
    async mounted() {
        store.commit('setActivities', { activities: [] });

        if(store.getters.introductionShown) {
            getUserLocation(async function() {
                await getActivities();
                /*Zoom levels:
                Countries: 4
                States: 6
                Counties: 8
                Cities: 10
                */
                getMap().setView([store.getters.userLatitude, store.getters.userLongitude], 4);
            }, function() {
                store.commit('setIntroductionShown', { value: false });
            });
        }
        
        getMap().setView([51.0834196, 10.4234469], 6);
    },
    setup() {
        let showAddActivity = ref(false);
        
        function toggleAddActivity() {
            showAddActivity.value = !showAddActivity.value;
        }
        
        function centerMapToUserLocation() {
            getMap().setView([store.getters.userLatitude, store.getters.userLongitude]);
        }
        
        return {
            showAddActivity,
            toggleAddActivity,
            createActivity,
            centerMapToUserLocation
        }
    }
}
</script>

