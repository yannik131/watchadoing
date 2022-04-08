<template>
    <div id="canvas" class="absolute text-center cursor-pointer">
        <Bubble 
            v-for="activity in $store.getters.activities" 
            :key="activity.title" 
            :activity="activity">
        </Bubble>
    </div>
    
    <div v-if="$store.getters.isFetching" class="text-center">
        <div class="font-bold text-2xl">Fetching data..</div>
        <i class="fa fa-spinner fa-spin mt-10 text-6xl"></i>
    </div>
    
    <div 
        v-else-if="$store.getters.activities.length === 0"
        class="text-2xl font-bold text-center">
        Nothing here yet :(
    </div>
    
    <div 
        v-else
        class="text-2xl font-bold text-center relative z-20 rounded flex justify-center">
        <div class="inline-block bg-white p-3">
            This is popular around you
        </div>
        <div class="plus my-2" @click="toggleAddActivity()"><i class="fas fa-plus mr-3"></i>Add new...</div>
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
        )
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

