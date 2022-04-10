<template>
    <div 
        :id="`${activity.id}-bubble`"
        v-touch="bubbleClicked"
        class="p-3 text-center absolute flex justify-center items-center flex-col text-xl rounded-full"
        :class="backgroundStyle"
        :style="{
            'left': `${bubble.x}px`,
            'top': `${bubble.y}px`,
            'width': `${bubble.size}px`,
            'height': `${bubble.size}px`
        }">
        <h1>{{ activity.title }}</h1>
        <p>{{ activity.likeCount }}</p>
    </div>
    
    <div :id="`${activity.id}-tooltip`" class="flex flex-col hidden bg-white rounded border border-gray-400 p-1 gap-1 z-30 tooltip text-left">
        <div v-if="!hasAlreadyReacted()">
            <div v-touch="onTapReaction('likeActivity')" class="p-2 hover:bg-gray-100 text-green-500 font-bold text-xl">😬👌👍 <span class="ml-1">Yes!</span></div>
            <hr>
            <div v-touch="onTapReaction('dislikeActivity')" class="p-2 hover:bg-gray-100 text-red-500 font-bold text-xl">🤮😡💩 <span class="ml-1">No!</span></div>
            <hr>
        </div>
        <div v-touch="onTapReaction('resetActivity')" class="p-2 hover:bg-gray-100 text-gray-500 font-bold text-xl">🤷‍♂️🤷‍♂️🤷‍♂️ <span class="ml-1">Okay.</span></div>
    </div>
</template>

<script>
import { bubbleFactory } from '../helpers/bubbleFactory';
import store from '../services/store';
import { createPopper } from '@popperjs/core';
import { ref } from 'vue';
import { updateActivity } from '../services/activity';

export default {
    name: "Bubble",
    props: {
        activity: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const backgroundStyle = ref('');
        
        function updatebackgroundStyle() {
            if(store.getters.likedActivities[props.activity.id]) {
                backgroundStyle.value = 'bg-green-100 hover:bg-green-200';
            }
            else if(store.getters.dislikedActivities[props.activity.id]) {
                backgroundStyle.value = 'bg-red-100 hover:bg-red-200'
            }
            else {
                backgroundStyle.value = 'bg-gray-100 hover:bg-gray-200';
            }
        }
        
        updatebackgroundStyle();
        
        let relativeSize = 0;
        if(store.getters.maxLikeCount > 0) {
            relativeSize = props.activity.likeCount / store.getters.maxLikeCount;
        }
        const bubble = bubbleFactory.createBubble(relativeSize);
        let loaded = false;
        
        let popper; 
            
        
        async function bubbleClicked() {
            if(!loaded) {
                setTimeout(() => { loaded = false; }, 300);
                loaded = true;
                return;
            }
            
            const tooltip = document.getElementById(props.activity.id + '-tooltip');
            
            if(!popper) {
                popper = createPopper(
                    document.getElementById(props.activity.id + '-bubble'), 
                    tooltip, 
                    {
                        placement: 'bottom',
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 8]
                                }
                            }
                        ]
                    }
                );
            }
            
            for(const div of document.getElementsByClassName('tooltip')) {
                if(div === tooltip) {
                    continue;
                }
                div.classList.add('hidden');
            }
            
            tooltip.classList.toggle('hidden');
            popper.update();
            
            loaded = false;
        }
        
        async function react(reaction) {
            store.commit('resetActivity', { activity: props.activity });
            store.commit(reaction, { activity: props.activity });
            updatebackgroundStyle();
            const tooltip = document.getElementById(props.activity.id + '-tooltip');
            tooltip.classList.add('hidden');
            await updateActivity(props.activity);
        }
        
        function onTapReaction(reaction) {
            return async function() {
                await react(reaction);
            }
        }
        
        function hasAlreadyReacted() {
            return store.getters.likedActivities[props.activity.id] || store.getters.dislikedActivities[props.activity.id];
        }
        
        return {
            bubble,
            bubbleClicked,
            backgroundStyle,
            react,
            hasAlreadyReacted,
            onTapReaction
        };
    }
}
</script>