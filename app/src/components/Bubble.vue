<template>
    <div 
        class="draggable bg-gray-100 p-3 text-center absolute flex justify-center items-center flex-col"
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

<style>
.draggable {
    border-radius: 50%;
    font-size: 1.5rem;
}
</style>

<script>
import { bubbleFactory } from '../helpers/bubbleFactory';
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
        const bubble = bubbleFactory.createBubble(props.activity.likeCount / store.getters.maxLikeCount);
        
        return {
            bubble
        };
    }
}
</script>