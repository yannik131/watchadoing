<template>
    <div 
        v-touch="bubbleClicked"
        class="draggable bg-gray-100 p-3 text-center absolute flex justify-center items-center flex-col text-xl rounded-full hover:bg-gray-200"
        :style="{
            'left': `${bubble.x}px`,
            'top': `${bubble.y}px`,
            'width': `${bubble.size}px`,
            'height': `${bubble.size}px`,
        }">
        <h1>{{ activity.title }}</h1>
        <p>{{ activity.likeCount }}</p>
    </div>
</template>

<script>
import { bubbleFactory } from '../helpers/bubbleFactory';
import { updateActivity } from '../services/activity';
import store from '../services/store';

export default {
    name: "Bubble",
    props: {
        activity: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        let relativeSize = 0;
        if(store.getters.maxLikeCount > 0) {
            relativeSize = props.activity.likeCount / store.getters.maxLikeCount;
        }
        const bubble = bubbleFactory.createBubble(relativeSize);
        
        let loaded = false;
        async function bubbleClicked() {
            if(store.getters.likedActivities[props.activity.id]) {
                return;
            }
            if(!loaded) {
                setTimeout(() => { loaded = false; }, 300);
                loaded = true;
                return;
            }
            store.commit('likeActivity', { activity: props.activity });
            await updateActivity(props.activity);
            loaded = false;
        }
        
        return {
            bubble,
            bubbleClicked
        };
    }
}
</script>