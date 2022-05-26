/* global L */
import store from './store';
import { bubble } from '../svg/elements';
import { getRandomFloat } from '../helpers/utils';
import PositionFactory from '../helpers/positionFactory';
import { createPopper } from '@popperjs/core';
let map;
let layerGroup;

export function centerMapToUserLocation() {
    if(store.getters.userLongitude && store.getters.userLatitude) {
        getMap().setView([store.getters.userLatitude, store.getters.userLongitude]);
    }
}

export function getMap(id = 'canvas') {
    if(map) {
        return map;
    }
    
    map = L.map(id, {
        zoomControl: false,
        zoom: 4,
        center: L.latLng(55, 23),
        minZoom: 4,
        maxZoom: 10,
        zoomDelta: 2
    });
    
    layerGroup = L.layerGroup();
    map.addLayer(layerGroup);
    
    const tileLayerUrl = 'https://api.mapbox.com/styles/v1/yannik131/cl396p2vi00cj14nu8pk3uvvg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFubmlrMTMxIiwiYSI6ImNrb2Jxd2cydTE0NjEycHFtcjhzeWxhcWEifQ.MLJRNjUUkyI65DSSEulrjA';
    const attribution = '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    
    L.tileLayer(tileLayerUrl, {
        attribution: attribution,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
    return map;
}

export function addMarker(latitude, longitude) {
    const marker = L.marker([latitude, longitude]);
    layerGroup.addLayer(marker);
    
    return marker;
}

export function clearMarkers() {
    layerGroup.clearLayers();
}

export function countApiCalls() {
    const calls = window.performance.getEntriesByType('resource');
    let count = 0;
    for(const call of calls) {
        if(call.initiatorType === 'img' && call.name.indexOf("/tiles/") > 0) {
            ++count;
        }
    }
    return count;
}

/*
let bubbleCount = 0;

export function drawBubble(size, svgElementBounds, title, subtitle) {
    const svgEdgeLengthPx = 601;
    const width = 1/size * svgEdgeLengthPx;
    const xmin = svgEdgeLengthPx/2*(-1/size + 1);
    
    const maxXmin = 0;
    const minXmin = 2*xmin;
    const minYmin = xmin;
    const maxYmin = -xmin;
    
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svgElement.setAttribute('viewBox', `${getRandomFloat(minXmin, maxXmin)} ${getRandomFloat(minYmin, maxYmin)} ${width} ${svgEdgeLengthPx}`);
    const bubbleId = `bubble-${bubbleCount}`;
    svgElement.innerHTML = bubble.replace('bubble-N', bubbleId);
    
    L.svgOverlay(svgElement, svgElementBounds, {
        opacity: 1,
        interactive: true
    }).addTo(map);
    
    addBubbleText(title, svgElement, svgEdgeLengthPx);
    addBubbleText(subtitle, svgElement, svgEdgeLengthPx, false);
    
    document.addEventListener('click', (event) => {
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
        
        tooltip.classList.toggle('hidden');
        popper.update();
        
        map.addEventListener('move', () => {
            popper.update();
        });
    });
    
    ++bubbleCount;
    
    return svgElement;
}

function addBubbleText(text, svgElement, svgEdgeLengthPx, header=true) {
    const fontSize = svgEdgeLengthPx/10;
    const  svgNS = "http://www.w3.org/2000/svg";
    const newText = document.createElementNS(svgNS,"text");
    newText.setAttribute("font-size",fontSize);
    newText.setAttribute( "font-weight", "bold");
    newText.setAttribute( "fill", "white");
    const textNode = document.createTextNode(text);
    newText.id = `bubble-header-${bubbleCount}`;
    newText.appendChild(textNode);
    svgElement.appendChild(newText);
    
    const bubbleWidth = document.getElementById(`bubble-${bubbleCount}`).getBoundingClientRect().width;
    const bubbleHeight = document.getElementById(`bubble-${bubbleCount}`).getBoundingClientRect().height;
    
    const textWidth = newText.getBoundingClientRect().width;
    const textHeight = newText.getBoundingClientRect().height;
    
    newText.setAttribute('x', svgEdgeLengthPx/2*(1-textWidth/bubbleWidth));
    
    if(header) {
        newText.setAttribute('y', svgEdgeLengthPx/2*(1-textHeight/bubbleHeight));
    }
    else {
        newText.setAttribute('y', svgEdgeLengthPx/2*(1+textHeight/bubbleHeight));
    }
}

export function drawBubbles(latitude, longitude, activities) {
    const center = map.latLngToLayerPoint([latitude, longitude]);
    const edgeLengthPx = 150;
    const positionFactory = new PositionFactory(center.x, center.y, edgeLengthPx);
    
    for(const activity of activities) {
        const position = positionFactory.getRandomPosition();
        const lowerLeftCornerPx = [position[0]-edgeLengthPx/2, position[1]-edgeLengthPx/2];
        const lowerLeftCornerLatLng = map.layerPointToLatLng(lowerLeftCornerPx);
        const upperRightCornerPx = [position[0]+edgeLengthPx/2, position[1]+edgeLengthPx/2];
        const upperRightCornerLatLng = map.layerPointToLatLng(upperRightCornerPx);
        drawBubble(getRandomFloat(0.3, 0.8), [lowerLeftCornerLatLng, upperRightCornerLatLng], activity.name, activity.likeCount);
    }
    
}*/