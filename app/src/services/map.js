/* global L */
let map;

export function getMap(id = 'canvas') {
    if(!map) {
        map = L.map(id, {
            zoomControl: false
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);
    }
    return map;
}