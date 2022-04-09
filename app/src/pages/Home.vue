<template>
    <div id="canvas" class="absolute text-center cursor-pointer">
        <Bubble 
            
            v-for="activity in $store.getters.activities" 
            :key="activity.title" 
            :activity="activity">
        </Bubble>
    </div>
    
    <div v-if="$store.getters.isFetching" class="text-2xl font-bold fixed left-0 right-0 text-center z-20 bg-white flex flex-col justify-center items-center">
        <div class="font-bold text-2xl">Fetching data..</div>
        <i class="fa fa-spinner fa-spin mt-10 text-6xl"></i>
    </div>
    
    <div 
        v-else
        class="text-2xl font-bold fixed left-0 right-0 text-center z-20 bg-white flex justify-center items-center mt-0">
        <span v-if="$store.getters.activities.length === 0" class="mr-2">
            Nothing here yet :(
        </span>
        <span v-else class="mr-2">
            Popular stuff
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
}
</style>

<script>
import Bubble from '../components/Bubble';
import AddActivity from '../components/AddActivity';
import makeDraggable from '../helpers/makeDraggable';
import { getActivities, createActivity } from '../services/activity';
import { ref } from 'vue';
import store from '../services/store';

export default {
    name: 'Home',
    components: {
        Bubble,
        AddActivity
    },
    async mounted() {
        store.commit('setFetching', {
            value: true
        });
        store.commit('setActivities', { activities: [] });
        makeDraggable('canvas');
        
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                store.commit('setLocation', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                await getActivities();
                store.commit('setFetching', {
                    value: false
                });
            },
            function() {
                alert("This app won't work without your location!");
                store.commit('setFetching', {
                    value: false
                });
            },
            {
                enableHighAccuracy: true
            }
        );
        
        alert("Drag and drop the screen to see what's happening around you. Double click a bubble to like it.");
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

