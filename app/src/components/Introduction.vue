<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="absolute top-0 left-0 bg-white z-40 p-2 rounded  cursor-pointer" style="min-width: 94px">
        <div v-touch="toggleLanguageChanging">
            {{ $store.getters.selectedLanguage }}
            <div class="inline" v-if="languageChanging"><i class="fas fa-angle-up"></i></div>
            <div class="inline" v-else><i class="fas fa-angle-down"></i></div>
        </div>
        <div :class="{hidden: !languageChanging}">
            <div v-for="language in $store.getters.availableLanguages" :key="language" v-touch="() => changeLocale(language)">
                <hr class="my-1"/>
                {{ language }}
            </div>
        </div>
    </div>
    <div class="z-40 px-5 py-2 rounded flex flex-col fixed text-center mt-2 popup text-white">
            <h1 class="text-2xl font-bold mb-2">👋 {{ $t('introduction.title') }} 👋</h1>
            <p class="mb-2 italic">{{ $t('introduction.subtitle') }}</p>
            <div class="flex items-center">
                <div class="flex flex-none justify-center items-center" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 50%">📍</div>
                <div class="ml-2">{{ $t('introduction.explanation') }}</div>
            </div>
            <div class="flex items-center mt-2">
                <div class="flex flex-none justify-center items-center" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 50%"><i class="fas fa-star" style="color: rgb(247	165	61	)"></i></div>
                <div class="ml-2">{{ $t('introduction.popular') }}</div>
            </div>
            <div class="flex items-center mt-2">
                <div class="flex flex-none justify-center items-center" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 50%"><img :src="earthSVG" style="height: 21px; width: 21px"/></div>
                <div class="ml-2">{{ $t('introduction.grantLocation') }}</div>
            </div>
            <input type="text" :placeholder="$t('introduction.addressPlaceholder')" class="p-2 w-100 border rounded-3xl mt-5 text-black mb-3" v-model="addressInput" v-on:keyup.enter="onButtonClick()" v-on:input="updateButtonText"/>
            <button @click="onButtonClick()" class="bg-green-500 rounded-3xl p-2 hover:bg-green-300" v-text="$t(buttonText)" :disabled="buttonDisabled"></button>
        </div>
</template>

<script>
import { getUserLocation, getUserLocationByAddress, formatLocation } from '../services/location';
import store from '../services/store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
    name: "Introduction",
    emits: ['done'],
    setup() {
        const { t, locale } = useI18n({ useScope: 'global' });
        
        const buttonText = ref('introduction.button.go');
        const buttonDisabled = ref(false);
        const addressInput = ref('');
        let locationByAddressSuccess = false;
        
        async function onButtonClick() {
            if(locationByAddressSuccess) {
                store.commit('setLocationConfirmed', { value: true });
                return;
            }
            
            buttonText.value = 'introduction.button.gettingLocation';
            
            buttonDisabled.value = true;
            
            if(addressInput.value.trim().length === 0) {
                getUserLocation(async function() {
                    store.commit('setLocationConfirmed', { value: true });
                }, function(errorCode) {
                    buttonDisabled.value = false;
                    buttonText.value = 'introduction.button.go';
                    if(errorCode) {
                        alert(t(errorCode));
                    }
                    else {
                        alert(t('introduction.error.locationDenied'));
                    }
                });
            }
            else {
                const { error, location } = await getUserLocationByAddress(addressInput.value);
                if(error) {
                    addressInput.value = '';
                    alert(t(error));
                    locationByAddressSuccess = false;
                    updateButtonText();
                }
                else {
                    alert(t('location.determined', { location: formatLocation(location, true) }));
                    addressInput.value = formatLocation(location);
                    buttonText.value = 'introduction.button.go';
                    locationByAddressSuccess = true;
                }
                buttonDisabled.value = false;
            }
        }
        
        function updateButtonText() {
            locationByAddressSuccess = false;
            if(addressInput.value.trim().length > 0) {
                buttonText.value = 'introduction.button.sendAddress';
            }
            else {
                buttonText.value = 'introduction.button.go';
            }
        }
        
        const languageChanging = ref(false);
        
        function toggleLanguageChanging() {
            languageChanging.value = !languageChanging.value;
        }
        
        function changeLocale(language) {
            store.commit('setSelectedLanguage', { language });
            locale.value = store.getters.selectedLocale;
            toggleLanguageChanging();
        }
        
        return {
            onButtonClick,
            buttonDisabled,
            buttonText,
            addressInput,
            updateButtonText,
            earthSVG: require('../svg/earth.svg'),
            languageChanging,
            toggleLanguageChanging,
            changeLocale
        }
    }
}
</script>