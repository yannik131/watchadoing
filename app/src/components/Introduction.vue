<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="z-40 px-5 py-2 rounded flex flex-col fixed text-center mt-2 popup text-white">
            <h1 class="text-2xl font-bold mb-2">👋 Welcome! 👋</h1>
            <p class="mb-2 italic">Wanna know what people around you like to do?</p>
            <div class="flex items-center">
                <div class="flex flex-none justify-center items-center" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 50%">📍</div>
                <div class="ml-2">After granting access to your  location, stuff that's popular around you will be shown as bubbles.</div>
            </div>
            <div class="flex items-center mt-2">
                <div class="flex flex-none justify-center items-center" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 50%"><i class="fas fa-star" style="color: rgb(247	165	61	)"></i></div>
                <div class="ml-2">The bigger the bubble, the more  popular the stuff!</div>
            </div>
            <div class="flex items-center mt-2">
                <div class="flex flex-none justify-center items-center" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 50%"><img :src="earthSVG" style="height: 21px; width: 21px"/></div>
                <div class="ml-2">If you don't want to or can't use your current location, you can type in a city here:</div>
            </div>
            <input type="text" placeholder="City or address" class="p-2 w-100 border rounded-3xl mt-5 text-black" v-model="addressInput" v-on:keyup.enter="onButtonClick()" v-on:input="updateButtonText"/>
            <div class="flex-1"></div>
            <button @click="onButtonClick()" class="bg-green-500 rounded-3xl p-2 hover:bg-green-300" v-text="buttonText" :disabled="buttonDisabled"></button>
        </div>
</template>

<script>
import { getUserLocation, getUserLocationByAddress, formatLocation } from '../services/location';
import store from '../services/store';
import { ref } from 'vue';

export default {
    name: "Introduction",
    emits: ['done'],
    setup() {
        const buttonTexts = {
            'ready': "Let's go!",
            'addressNotSent': 'Send address',
            'gettingLocation': 'Getting location..'
        };
        
        const buttonText = ref(buttonTexts['ready']);
        const buttonDisabled = ref(false);
        const addressInput = ref('');
        let locationByAddressSuccess = false;
        
        async function onButtonClick() {
            if(locationByAddressSuccess) {
                store.commit('setLocationConfirmed', { value: true });
                return;
            }
            
            buttonText.value = buttonTexts['gettingLocation'];
            buttonDisabled.value = true;
            
            if(addressInput.value.trim().length === 0) {
                getUserLocation(async function() {
                    store.commit('setLocationConfirmed', { value: true });
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
                    locationByAddressSuccess = false;
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
            if(addressInput.value.trim().length > 0) {
                buttonText.value = buttonTexts['addressNotSent'];
            }
            else {
                buttonText.value = buttonTexts['ready'];
            }
        }
        
        return {
            onButtonClick,
            buttonDisabled,
            buttonText,
            addressInput,
            updateButtonText,
            earthSVG: require('../svg/earth.svg')
        }
    }
}
</script>