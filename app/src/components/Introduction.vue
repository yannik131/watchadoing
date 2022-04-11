<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="z-40 px-5 py-2 rounded bg-white flex flex-col fixed text-center mt-2 popup">
            <h1 class="text-2xl font-bold mb-2">👋 Welcome! 👋</h1>
            <p class="mb-2 italic">Wanna know what people around you like to do? 🤔</p>
            <ul class="list-disc">
                <li>After granting access to your 📍 location, stuff that's popular around you will be shown as bubbles.</li>
                <li>The bigger the bubble, the more ⭐ popular the stuff!</li>
                <li>If you don't want to or can't use your current location, you can type in a city here:</li>
            </ul>
            <input type="text" placeholder="City or address" class="p-2 w-100 border rounded mt-2" v-model="addressInput" v-on:keyup.enter="requestUserLocation()" v-on:input="updateButtonText"/>
            <div class="flex-1"></div>
            <button @click="requestUserLocation()" class="bg-green-500 rounded p-2 hover:bg-green-300" v-text="buttonText" :disabled="buttonDisabled"></button>
        </div>
</template>

<script>
import { getUserLocation, getUserLocationByAddress, formatLocation } from '../services/location';
import { getActivities } from '../services/activity';
import store from '../services/store';
import { ref } from 'vue';

export default {
    name: "Introduction",
    emits: ['done'],
    setup() {
        const buttonText = ref("Let's go!");
        const buttonDisabled = ref(false);
        const addressInput = ref('');
        let locationByAddressSuccess = false;
        
        const buttonTexts = {
            'ready': "Let's go!",
            'addressNotSent': 'Send address',
            'gettingLocation': 'Getting location..'
        };
        
        async function requestUserLocation() {
            if(buttonDisabled.value) {
                return;
            }
            if(locationByAddressSuccess) {
                store.commit('setIntroductionShown', { value: true });
                await getActivities();
                return;
            }
            buttonText.value = buttonTexts['gettingLocation'];
            buttonDisabled.value = true;
            
            if(addressInput.value.trim().length === 0) {
                getUserLocation(async function() {
                    store.commit('setIntroductionShown', { value: true });
                    await getActivities();
                }, function() {
                    buttonDisabled.value = false;
                    buttonText.value = buttonTexts['ready'];
                });
            }
            else {
                const { error, location } = await getUserLocationByAddress(addressInput.value);
                if(error) {
                    addressInput.value = '';
                    alert(error);
                    updateButtonText();
                }
                else {
                    alert(`Determined location: ${formatLocation(location)}. Proceed if this is correct :)`);
                    addressInput.value = formatLocation(location);
                    buttonText.value = buttonTexts['ready'];
                    locationByAddressSuccess = true;
                }
                buttonDisabled.value = false;
            }
        }
        
        function updateButtonText() {
            locationByAddressSuccess = false;
            
            if(addressInput.value.trim().length > 0) {
                buttonText.value = buttonTexts['addressNotSent'];
            }
            else {
                buttonText.value = buttonTexts['ready'];
            }
        }
        
        return {
            requestUserLocation,
            buttonDisabled,
            buttonText,
            addressInput,
            updateButtonText
        }
    }
}
</script>