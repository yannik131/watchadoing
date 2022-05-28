<template>
    <div :id="`${bubbleId}-tooltip`" class="flex flex-col hidden bg-white rounded border border-gray-400 p-1 gap-1 z-30 tooltip text-left" role="tooltip">
        <div class="flex flex-row">
            <div class="p-2 hover:bg-gray-100 text-green-500 font-bold text-xl flex items-center"><img :src="yesSVG"/> <span class="ml-2">Yes!</span></div>
            <div class="p-2 hover:bg-gray-100 text-red-500 font-bold text-xl flex items-center" style="border-left: 1px solid lightgray"><img :src="noSVG"/> <span class="ml-2">No!</span></div>
        </div>
        <hr>
        <div class="p-2 hover:bg-gray-100 text-gray-500 font-bold text-xl flex items-center justify-center"><img :src="okaySVG"/> <span class="ml-2">Okay.</span></div>
        <div class="arrow" data-popper-arrow></div>
    </div>
</template>

<style>
    .arrow,
    .arrow::before {
        position: absolute;
        width: 8px;
        height: 8px;
        background: inherit;
    }

    .arrow {
        visibility: hidden;
    }

    .arrow::before {
        visibility: visible;
        content: '';
        transform: rotate(45deg);
    }

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
import { getRandomFloat } from '../helpers/utils';
import { getMap } from '../services/map';

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
        const position = PositionFactory.get().getRandomPosition();
        const map = getMap();
            
        const lowerLeftCornerLatLng = map.layerPointToLatLng([position[0]-props.mapRectSvgEdgeLength/2, position[1]-props.mapRectSvgEdgeLength/2]);
        const upperRightCornerLatLng = map.layerPointToLatLng([position[0]+props.mapRectSvgEdgeLength/2, position[1]+props.mapRectSvgEdgeLength/2]);
        
        const size = props.activity.likeCount / store.getters.maxLikeCount;
        
        //viewBox parameters
        const width = 1/size * props.bubbleSvgEdgeLength;
        const xmin = props.bubbleSvgEdgeLength/2*(-1/size + 1);
        
        const maxXmin = 0;
        const minXmin = 2*xmin;
        const minYmin = xmin;
        const maxYmin = -xmin;
        
        const namespace = 'http://www.w3.org/2000/svg';
        const svgElement = document.createElementNS(namespace, 'svg');
        svgElement.setAttribute('xmlns', namespace);
        svgElement.setAttribute(
            'viewBox', `${getRandomFloat(minXmin, maxXmin)} ${getRandomFloat(minYmin, maxYmin)} ${width} ${props.bubbleSvgEdgeLength}`);
            
        const bubbleId = `bubble-${props.activity.title}`;
        const bubbleSvg = require('../svg/bubble.svg');
        svgElement.innerHTML = bubbleSvg.replace('BUBBLE_ID_PLACEHOLDER', bubbleId);
        
        L.svgOverlay(svgElement, [lowerLeftCornerLatLng, upperRightCornerLatLng], {
            interactive: true
        }).addTo(map);
        
        return {
            bubbleId
        }
    }
}
</script>