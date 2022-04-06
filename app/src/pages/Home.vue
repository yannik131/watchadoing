<template>
    <div id="canvas" class="absolute text-center cursor-pointer">
        <Bubble 
            v-for="activity in $store.getters.activities" 
            :key="activity.title" 
            :activity="activity">
        </Bubble>
    </div>
    
    <div 
        v-if="$store.getters.activities.length === 0"
        class="text-xl font-bold text-center">
        No bubbles :(
    </div>
    
    
    <div 
        v-else
        class="text-2xl font-bold text-center relative z-20 rounded flex justify-center">
        <div class="inline-block bg-white p-3">
            This is popular around you
        </div>
    </div>
    
</template>

<style>
#canvas {
    width: 10000px;
    height: 10000px;
    left: -5000px;
    top: -5000px;
}
</style>

<script>
import Bubble from '../components/Bubble';
import makeDraggable from '../helpers/makeDraggable';
import { getActivities } from '../services/activity';

export default {
    name: 'Home',
    components: {
        Bubble
    },
    async mounted() {
        makeDraggable('canvas');
        await getActivities();
    }
}
</script>

