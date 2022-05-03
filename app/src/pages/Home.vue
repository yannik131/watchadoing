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
        <div class="font-bold text-2xl">Getting location..</div>
        <i class="fa fa-spinner fa-spin mt-10 text-6xl"></i>
    </div>
    
    <div v-else-if="$store.getters.isFetching" class="text-2xl font-bold fixed left-0 right-0 text-center z-20 bg-white flex flex-col justify-center items-center">
        <div class="font-bold text-2xl">Fetching data..</div>
        <i class="fa fa-spinner fa-spin mt-10 text-6xl"></i>
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
        
    </div>
    
    <AddActivity v-if="showAddActivity" @activity-created="createActivity" @close="toggleAddActivity()"></AddActivity>
    
</template>

<style>
#canvas {
    width: 10000px;
    height: 10000px;
    left: -5000px;
    top: -5000px;
    overflow: hidden;
    z-index: -1;
}
</style>

<script>
/* global L */
import Bubble from '../components/Bubble';
import AddActivity from '../components/AddActivity';
import Introduction from '../components/Introduction';
//import makeDraggable from '../helpers/makeDraggable';
import { createActivity, getActivities } from '../services/activity';
import { getUserLocation } from '../services/location';
import { ref } from 'vue';
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
        //makeDraggable('canvas');

        if(store.getters.introductionShown) {
            getUserLocation(async function() {
                await getActivities();
            }, function() {
                store.commit('setIntroductionShown', { value: false });
            });
        }
        
        const map = L.map('canvas').setView([51.0834196, 10.4234469], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    },
    setup() {
        let showAddActivity = ref(false);
        
        function toggleAddActivity() {
            showAddActivity.value = !showAddActivity.value;
        }
        
        return {
            showAddActivity,
            toggleAddActivity,
            createActivity
        }
    }
}
</script>

