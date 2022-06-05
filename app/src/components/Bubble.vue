<template>
    <svg :id="`${bubbleId}-svg`" width="601" height="601" viewBox="0 0 601 601" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text :id="`${bubbleId}-top`" :x="title.x.value" :y="title.y.value" font-size="100" :fill="fillColor">{{ title.text.value }}</text>
        <text :id="`${bubbleId}-bottom`" :x="likeCount.x.value" :y="likeCount.y.value" font-size="100" :fill="fillColor">{{ likeCount.text.value }}</text>
        <path style="mix-blend-mode:screen" d="M557.342 377.032C517.153 418.996 507.819 277.616 414.707 188.435C321.596 99.2539 179.984 96.0469 220.133 54.0833C260.281 12.1198 411.582 5.35103 504.707 94.5458C597.832 183.741 597.532 335.123 557.342 377.032Z" fill="url(#paint0_radial_119_329)"/>
        <path :id="bubbleId" style="mix-blend-mode:screen" d="M0.434832 300.065C0.434825 466.026 134.973 600.565 300.935 600.565C466.896 600.565 601.435 466.026 601.435 300.065C601.435 134.103 466.896 -0.435064 300.935 -0.435072C134.973 -0.435079 0.434839 134.103 0.434832 300.065Z" fill="url(#paint1_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M551.802 288.52C551.802 288.52 524.235 185.747 443.611 119.478C362.986 53.2101 259.804 48.5157 259.804 48.5157C259.804 48.5157 387.932 25.8895 468.598 92.1851C549.263 158.481 551.802 288.52 551.802 288.52Z" fill="url(#paint2_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M316.083 581.61C316.083 581.61 223.626 557.673 143.125 491.255C62.6227 424.836 24.5484 341.059 24.5484 341.059C24.5484 341.059 48.7713 444.651 129.273 511.083C209.775 577.516 316.083 581.61 316.083 581.61Z" fill="url(#paint3_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M465.913 168.155C479.796 192.201 502.992 204.799 517.724 196.294C532.456 187.788 533.144 161.4 519.261 137.355C505.378 113.309 482.181 100.711 467.45 109.216C452.718 117.721 452.03 144.109 465.913 168.155Z" fill="url(#paint4_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M409.679 132.861C447.341 149.519 485.523 145.724 494.962 124.384C504.401 103.044 481.521 72.2404 443.859 55.5824C406.197 38.9244 368.015 42.7198 358.576 64.0597C349.137 85.3995 372.017 116.203 409.679 132.861Z" fill="url(#paint5_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M169.467 566.615C207.129 583.273 244.745 580.757 253.486 560.996C262.227 541.234 238.781 511.711 201.119 495.053C163.457 478.395 125.841 480.91 117.1 500.672C108.36 520.433 131.805 549.957 169.467 566.615Z" fill="url(#paint6_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M456.456 505.42C475.129 517.238 511.181 493.771 536.981 453.007C562.782 412.242 568.56 369.615 549.887 357.797C531.215 345.979 495.163 369.445 469.362 410.21C443.562 450.975 437.784 493.602 456.456 505.42Z" fill="url(#paint7_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M57.4677 237.824C71.5157 247.734 102.253 228.338 126.122 194.502C149.99 160.666 157.952 125.203 143.904 115.293C129.856 105.384 99.1181 124.78 75.2494 158.616C51.3808 192.451 43.4197 227.914 57.4677 237.824Z" fill="url(#paint8_radial_119_329)"/>
        <path style="mix-blend-mode:screen" d="M382.397 545.937C396.984 562.535 438.187 550.174 474.425 518.327C510.663 486.48 528.214 447.207 513.626 430.608C499.039 414.009 457.836 426.37 421.598 458.217C385.36 490.064 367.809 529.338 382.397 545.937Z" fill="url(#paint9_radial_119_329)"/>
        <defs>
            <radialGradient id="paint0_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(467.818 129.651) rotate(43.575) scale(299.758 134.211)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint1_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300.79 299.996) rotate(45) scale(343.95)">
            <stop offset="0.33771" stop-color="white" stop-opacity="0"/>
            <stop offset="1" stop-color="white" stop-opacity="0.2"/>
            </radialGradient>
            <radialGradient id="paint2_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(455.513 133.131) rotate(39.7323) scale(207.566 85.4695)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint3_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(139.055 532.085) rotate(35.5458) scale(148.645 31.3644)">
            <stop stop-color="white"/>
            <stop offset="0.01" stop-color="#FBFBFB"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint4_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(497.923 149.775) rotate(-34.6052) scale(24.3514 36.2402)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint5_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(426.28 95.2581) rotate(122.005) scale(56.1664 56.8429)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0.2"/>
            </radialGradient>
            <radialGradient id="paint6_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(188.552 523.787) rotate(-71.5128) scale(30.969 53.6876)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint7_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512.5 417) rotate(-58.9649) scale(68.8567 28.9287)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint8_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(109.305 164.434) rotate(-55.9737) scale(59.0972 22.5066)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint9_radial_119_329" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(461.077 476.883) rotate(-42.6049) scale(68.8567 28.9287)">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </radialGradient>
        </defs>
        </svg>
    <div v-if="$store.getters.isUserLocation" :id="`${bubbleId}-tooltip`" class="flex flex-col hidden bg-white rounded border border-gray-400 p-1 gap-1 z-30 tooltip text-left" role="tooltip">
        <div v-if="!hasAlreadyReacted()" class="flex flex-row">
            <div v-touch="onTapReaction('likeActivity')" class="p-2 cursor-pointer hover:bg-gray-100 text-green-500 font-bold text-xl flex items-center"><img :src="yesSVG"/> <span class="ml-2">{{ $t('bubble.like') }}</span></div>
            <div v-touch="onTapReaction('dislikeActivity')" class="p-2 cursor-pointer  hover:bg-gray-100 text-red-500 font-bold text-xl flex items-center" style="border-left: 1px solid lightgray"><img :src="noSVG"/> <span class="ml-2">{{ $t('bubble.dislike') }}</span></div>
        </div>
        <hr v-if="!hasAlreadyReacted()">
        <div v-touch="onTapReaction('resetActivity')" class="p-2 cursor-pointer  hover:bg-gray-100 text-gray-500 font-bold text-xl flex items-center justify-center"><img :src="okaySVG"/> <span class="ml-2">{{ $t('bubble.reset') }}</span></div>
        <div class="arrow" data-popper-arrow></div>
    </div>
</template>

<style>
.tooltip[data-popper-placement^='top'] > .arrow {
    bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
    top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
    right: -4px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
    left: -4px;
}
</style>

<script>
/* global L */
import store from '../services/store';
import PositionFactory from '../helpers/positionFactory';
import { updateActivity } from '../services/activity';
import { getRandomFloat, linearFunction } from '../helpers/utils';
import { getMap, layerGroup } from '../services/map';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { createPopper } from '@popperjs/core';

export default {
    name: "Bubble",
    props: {
        activity: {
            type: Object,
            required: true
        },
        bubbleSvgEdgeLength: {
            type: Number,
            required: true
        },
        mapRectSvgEdgeLength: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const bubbleId = `bubble-${props.activity.title}`;
        const title = {
            text: ref(props.activity.title),
            x: ref(0),
            y: ref(0)
        };
        
        const likeCount = {
            text: ref(props.activity.likeCount),
            x: ref(0),
            y: ref(0)
        };
        
        const fillColor = ref('white');
        let size;
        
        function updateViewbox() {
            if(store.getters.minLikeCount === store.getters.maxLikeCount) {
                size = 1;
            }
            else {
                size = linearFunction(
                    store.getters.minLikeCount, 0.45,
                    store.getters.maxLikeCount, 1.0,
                    likeCount.text.value
                );
            }
            
            const width = Math.round(1/size * props.bubbleSvgEdgeLength * 100) / 100;
            const pathElement = document.getElementById(`bubble-${props.activity.title}` + '-svg');
            if(pathElement) {
                //In some instances, pathElement was null, even though it shouldn't be, because this function is always called after mounting. Maybe it takes some time sometimes?
                const oldWidth = parseFloat(pathElement.getAttribute('viewBox').match(/\S+\s+\S+\s+(\S+)/)[1]);
            
                if(oldWidth === width) {
                    return;
                }
            }
            
            
            const xmin = props.bubbleSvgEdgeLength/2*(-1/size + 1);
            
            const maxXmin = 0;
            const minXmin = 2*xmin;
            const minYmin = xmin;
            const maxYmin = -xmin;
            
            pathElement.setAttribute(
                'viewBox', `${getRandomFloat(minXmin, maxXmin)} ${getRandomFloat(minYmin, maxYmin)} ${width} ${props.bubbleSvgEdgeLength}`);
        }
        
        function updateTextPosition(textObject, position) {
            const bubbleEdgeLength = size * props.mapRectSvgEdgeLength;
            const textElement = document.getElementById(bubbleId + '-' + position);
            const textRect = textElement.getBoundingClientRect();
            textObject.x.value = props.bubbleSvgEdgeLength/2*(1-textRect.width/bubbleEdgeLength);
            if(position === 'top') {
                textObject.y.value = props.bubbleSvgEdgeLength/2*(1-textRect.height/bubbleEdgeLength);
            }
            else {
                textObject.y.value = props.bubbleSvgEdgeLength/2*(1+textRect.height/bubbleEdgeLength);
            }
        }
        
        onMounted(() => {
            const map = getMap();
            
            const position = PositionFactory.get().getRandomPosition();
            const lowerLeftCornerLatLng = map.layerPointToLatLng([position[0]-props.mapRectSvgEdgeLength/2, position[1]-props.mapRectSvgEdgeLength/2]);
            const upperRightCornerLatLng = map.layerPointToLatLng([position[0]+props.mapRectSvgEdgeLength/2, position[1]+props.mapRectSvgEdgeLength/2]);
            
            updateViewbox();
            const pathElement = document.getElementById(`bubble-${props.activity.title}` + '-svg');
                
            L.svgOverlay(pathElement, [lowerLeftCornerLatLng, upperRightCornerLatLng], {
                interactive: true
            }).addTo(layerGroup);
            
            updateTextPosition(title, 'top');
            updateTextPosition(likeCount, 'bottom');
        });
        
        var handler = function onBubbleClick(event) {
            if(store.getters.showAddActivity) {
                return;
            }
            const rect = document.getElementById(bubbleId).getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            
            if (x < rect.left || 
                x >= rect.right || 
                y < rect.top || 
                y >= rect.bottom) {
                return;
            }
            
            const tooltip = document.getElementById(bubbleId + '-tooltip');
                
            const popper = createPopper(
                document.getElementById(bubbleId), 
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
            
            for(const div of document.getElementsByClassName('tooltip')) {
                if(div === tooltip) {
                    continue;
                }
                div.classList.add('hidden');
            }
            
            //If the tooltip overlays another bubble, stop the click event from reaching that bubble
            tooltip.addEventListener('click', (event) => event.stopPropagation());
            
            tooltip.classList.toggle('hidden');
            popper.update();
            
            getMap().addEventListener('move', () => {
                popper.update();
            });
        }
        
        onUnmounted(() => {
            document.removeEventListener('click', handler);
        });
        
        const isUserLocation = store.getters.selectedLocation.id === store.getters.userLocation.id;
        let activity;
        
        if(isUserLocation) {
            //Prevent the click on a marker to open a popper by setting a small timeout until attaching the event listener
            setTimeout(() => document.addEventListener('click', handler), 10);
            for(const activityInCity of store.getters.activityMap[store.getters.userLocation.id]) {
                if(activityInCity.title === props.activity.title) {
                    activity = activityInCity;
                    break;
                }
            }
        }
        
        async function react(reaction) {
            let change;
            if(reaction === 'likeActivity') {
                change = 1;
            }
            else if(reaction === 'dislikeActivity') {
                change = -1;
            }
            else {
                if(store.getters.likedActivities[activity.id]) {
                    change = -1;
                }
                else if(store.getters.dislikedActivities[activity.id]) {
                    change = 1;
                }
                else {
                    document.getElementById(bubbleId + '-tooltip').classList.add('hidden');
                    return;
                }
            }
            const updatedActivity = {
                id: activity.id,
                likeCount: activity.likeCount + change,
                location: activity.location
            }
            store.commit('updateActivity', { updatedActivity });
            store.commit('resetActivity', { activity });
            store.commit(reaction, { activity });
            
            updateFillColor();
            document.getElementById(bubbleId + '-tooltip').classList.add('hidden');
            await updateActivity(activity.id, change);
        }
        
        function onTapReaction(reaction) {
            return async function() {
                await react(reaction);
            }
        }
        
        function hasAlreadyReacted() {
            return store.getters.likedActivities[activity.id] || store.getters.dislikedActivities[activity.id];
        }
        
        function updateFillColor() {
            if(store.getters.likedActivities[activity.id]) {
                fillColor.value = "green";
            }
            else if(store.getters.dislikedActivities[activity.id]) {
                fillColor.value = "red";
            }
            else {
                fillColor.value = 'white';
            }
        }
        
        if(isUserLocation) {
            updateFillColor();
        }
        
        watch(() => store.getters.displayedActivities, () => {
            for(const activity of store.getters.displayedActivities) {
                if(activity.title === props.activity.title) {
                    likeCount.text.value = activity.likeCount;
                    updateViewbox();
                    break;
                }
            }
        }, { deep: true });
        
        return {
            bubbleId,
            title,
            likeCount,
            fillColor,
            onTapReaction,
            hasAlreadyReacted,
            yesSVG: require('../svg/yes.svg'),
            noSVG: require('../svg/no.svg'),
            okaySVG: require('../svg/okay.svg')
        }
    },
}
</script>