<template>
    <div class="fixed inset-0 bg-black opacity-50 z-30 flex justify-center items-center">
    </div>
    <div class="h-52 w-80 z-40 rounded bg-white flex flex-col relative mx-auto p-2 text-center">
            <h1 class="text-2xl font-bold mb-2">Add activity</h1>
            <p class="mb-2">Watcha doing?</p>
            <input type="text" placeholder="Description.." class="p-2 w-100 border rounded" v-model="activityTitle" />
            <div class="flex-1"></div>
            <div class="grid grid-cols-2 gap-5">
                <button @click="createActivity()" class="bg-green-500 rounded p-2 hover:bg-green-300">Send</button>
                <button class="bg-red-500 rounded p-2 hover:bg-red-300" @click="$emit('close')">Cancel</button>
            </div>
            
        </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name: "AddActivity",
    emits: ['activityCreated', 'close'],
    setup(props, { emit }) {
        const activityTitle = ref('');
        
        function createActivity() {
            const title = activityTitle.value.trim();
            if(!title) {
                return;
            }
            emit('activityCreated', activityTitle.value);
            emit('close');
        }
        
        return {
            activityTitle,
            createActivity
        }
    }
}
</script>