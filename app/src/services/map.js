/* global L */
import store from './store';
import { bubble } from '../svg/elements';
import { getRandomFloat } from '../helpers/utils';
import PositionFactory from '../helpers/positionFactory';
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
    
    //Openstreetmap tiles:
    //L.tileLayer('https://api.mapbox.com/styles/v1/yannik131/cl2z0gvu7000314nv0mgxg2f1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWFubmlrMTMxIiwiYSI6ImNrb2Jxd2cydTE0NjEycHFtcjhzeWxhcWEifQ.MLJRNjUUkyI65DSSEulrjA')
    
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

export function drawBubble(size, svgElementBounds) {
    const magicalBubbleConstant = 270;
    const width = 1/size * magicalBubbleConstant;
    const xmin = magicalBubbleConstant/2*(-1/size + 1);
    
    const maxXmin = 0;
    const minXmin = 2*xmin;
    const minYmin = xmin;
    const maxYmin = -xmin;
    
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svgElement.setAttribute('viewBox', `${getRandomFloat(minXmin, maxXmin)} ${getRandomFloat(minYmin, maxYmin)} ${width} ${magicalBubbleConstant}`);
    svgElement.style.backgroundColor = 'red';
    svgElement.setAttribute('opacity', '1');
    svgElement.innerHTML = bubble;
    
    var svgNS = "http://www.w3.org/2000/svg";
    var newText = document.createElementNS(svgNS,"text");
    newText.setAttributeNS(null,"x",0);     
    newText.setAttributeNS(null,"y",0); 
    newText.setAttributeNS(null,"font-size","100");
    newText.setAttributeNS(null, "font-weight", "bold");
    newText.setAttributeNS(null, "fill", "white");
    var textNode = document.createTextNode('hihi');
    newText.appendChild(textNode);
    svgElement.appendChild(newText);
    
    L.svgOverlay(svgElement, svgElementBounds, {
        opacity: 0.5,
        interactive: true
    }).addTo(map);
    
    document.addEventListener('click', (event) => {
        const rect = document.getElementById('bubble-2').getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
        
        if (x < rect.left || 
            x >= rect.right || 
            y < rect.top || 
            y >= rect.bottom) {
            return;
        }
    });
    
    return svgElement;
}

export function drawBubbles(latitude, longitude, N) {
    const center = map.latLngToLayerPoint([latitude, longitude]);
    const edgeLengthPx = 100;
    const positionFactory = new PositionFactory(center.x, center.y, edgeLengthPx);
    
    for(let i = 0; i < N; ++i) {
        const position = positionFactory.getRandomPosition();
        const lowerLeftCornerPx = [position[0]-edgeLengthPx/2, position[1]-edgeLengthPx/2];
        const lowerLeftCornerLatLng = map.layerPointToLatLng(lowerLeftCornerPx);
        const upperRightCornerPx = [position[0]+edgeLengthPx/2, position[1]+edgeLengthPx/2];
        const upperRightCornerLatLng = map.layerPointToLatLng(upperRightCornerPx);
        drawBubble(getRandomFloat(0.3, 0.8), [lowerLeftCornerLatLng, upperRightCornerLatLng]);
    }
    
}