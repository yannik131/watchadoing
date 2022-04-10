<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="z-40 px-5 rounded bg-white flex flex-col relative mx-auto p-2 text-center mt-2" style="width: 368px; height: 330px">
            <h1 class="text-2xl font-bold mb-2">Welcome! 👋</h1>
            <p class="mb-2 italic">Wanna know what people around you are up to? 🤔</p>
            <ul class="list-disc">
                <li>After you click the button, your location 📍 will be requested. </li>
                <li>The bigger the bubble, the more popular the stuff!</li>
                <li>Double click bubbles to like or dislike. Click the 'Add' button to add new stuff.</li>
            </ul>
            <div class="flex-1"></div>
            <button @click="requestUserLocation()" class="bg-green-500 rounded p-2 hover:bg-green-300" v-text="buttonText" :disabled="gettingLocation"></button>
        </div>
</template>

<script>
import { getUserLocation } from '../services/location';
import { getActivities } from '../services/activity';
import store from '../services/store';
import { ref } from 'vue';

export default {
    name: "Introduction",
    emits: ['done'],
    setup() {
        const buttonText = ref("Let's go!");
        const gettingLocation = ref(false);
        
        function requestUserLocation() {
            buttonText.value = 'Getting location..';
            gettingLocation.value = true;
            getUserLocation(async function() {
                store.commit('introductionShowed');
                await getActivities();
            });
        }
        return {
            requestUserLocation,
            gettingLocation,
            buttonText
        }
    }
}
</script>