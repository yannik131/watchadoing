<template>
    <div class="fixed inset-0 z-30 flex justify-center items-center">
    <div class="z-40 px-5 py-2 rounded-3xl backdrop-blur-sm bg-white/80 flex flex-col fixed text-center mt-2 popup" style="height: 250px;">
            <h1 class="text-2xl font-bold mb-2">{{ $t('addActivity.title') }}</h1>
            <p class="mb-2">{{ $t('addActivity.subtitle', { location: formatLocation($store.getters.userLocation) }) }}</p>
            <input type="text" :placeholder="$t('addActivity.inputPlaceholder')" class="p-2 w-100 border rounded-3xl" v-model="activityTitle" v-on:keyup.enter="createActivity()"/>
            <div class="text-red-500 font-bold mt-2" v-text="errorMessage" />
            <div class="flex-1"></div>
            <div class="grid grid-cols-2 gap-5">
                <button @click="createActivity()" class="bg-green-500 rounded-3xl p-2 hover:bg-green-300">{{ $t('addActivity.add') }}</button>
                <button class="rounded-3xl border border-gray-600 p-2 hover:bg-gray-500" @click="$emit('close')">{{ $t('addActivity.cancel') }}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import store from '../services/store';
import { formatLocation } from '../services/location';
import { useI18n } from 'vue-i18n';

export default {
    name: "AddActivity",
    emits: ['activityCreated', 'close'],
    setup(props, { emit }) {
        const { t } = useI18n({ useScope: 'global' });
        const activityTitle = ref('');
        const errorMessage = ref('');
        
        function createActivity() {
            let title = activityTitle.value.trim();
            if(!title) {
                errorMessage.value = t('addActivity.error.emptyDescription');
                return;
            }
            title = title[0].toUpperCase() + title.substring(1);
            const maxLength = 12;
            if(title.length > maxLength) {
                errorMessage.value = t('addActivity.error.lengthExceeded', { maxLength });
                return;
            }
            
            const activities = store.getters.activityMap[store.getters.userLocation.id];
            if(activities && activities.filter(activity => activity.title === title).length > 0) {
                errorMessage.value = t('addActivity.error.duplicate');
                return;
            }
            emit('activityCreated', title);
            emit('close');
        }
        
        return {
            activityTitle,
            errorMessage,
            createActivity,
            formatLocation
        }
    }
}
</script>