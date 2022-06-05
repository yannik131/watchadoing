/* global L */
import store from './store';
let map;
export let layerGroup;

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
        zoom: 10,
        center: L.latLng(55, 23),
        minZoom: 4,
        maxZoom: 10,
        zoomDelta: 2,
        zoomSnap: 2
    });
    
    layerGroup = L.layerGroup();
    map.addLayer(layerGroup);
    
    const tileLayerUrl = 'https://api.mapbox.com/styles/v1/yannik131/cl3zzesxs002c15mq6izy3hd9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFubmlrMTMxIiwiYSI6ImNrb2Jxd2cydTE0NjEycHFtcjhzeWxhcWEifQ.MLJRNjUUkyI65DSSEulrjA';
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

export function clearLayers() {
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
