<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="h-64 w-80 z-40 rounded bg-white flex flex-col relative mx-auto p-2 text-center mt-2">
            <h1 class="text-2xl font-bold mb-2">Add activity</h1>
            <p class="mb-2">Watcha doing?</p>
            <input type="text" placeholder="Description.." class="p-2 w-100 border rounded" v-model="activityTitle" v-on:keyup.enter="createActivity()"/>
            <div class="text-red-500 font-bold mt-2" v-text="errorMessage" />
            <div class="flex-1"></div>
            <div class="grid grid-cols-2 gap-5">
                <button @click="createActivity()" class="bg-green-500 rounded p-2 hover:bg-green-300">Send</button>
                <button class="bg-red-500 rounded p-2 hover:bg-red-300" @click="$emit('close')">Cancel</button>
            </div>
            
        </div>
</template>
<script>
import { ref } from 'vue';
import store from '../services/store';

export default {
    name: "AddActivity",
    emits: ['activityCreated', 'close'],
    setup(props, { emit }) {
        const activityTitle = ref('');
        const errorMessage = ref('');
        
        function createActivity() {
            let title = activityTitle.value.trim();
            if(!title) {
                errorMessage.value = "Empty descriptions are not supported.";
                return;
            }
            title = title[0].toUpperCase() + title.substring(1);
            if(title.length > 30) {
                errorMessage.value = "Maximum length of 30 characters exceeded.";
                return;
            }
            else if(store.getters.activities.filter(activity => activity.title === title).length > 0) {
                errorMessage.value = "There's a bubble with the same description in your area.";
                return;
            }
            emit('activityCreated', title);
            emit('close');
        }
        
        return {
            activityTitle,
            errorMessage,
            createActivity
        }
    }
}
</script>