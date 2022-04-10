<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="z-40 px-5 py-2 rounded bg-white flex flex-col fixed text-center mt-2 popup">
            <h1 class="text-2xl font-bold mb-2">👋 Welcome! 👋</h1>
            <p class="mb-2 italic">Wanna know what people around you like to do? 🤔</p>
            <ul class="list-disc">
                <li>After granting access to your 📍 location, stuff that's popular around you will be shown as bubbles.</li>
                <li>The bigger the bubble, the more ⭐ popular the stuff!</li>
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
                store.commit('introductionShown');
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