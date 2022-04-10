import store from './store';

export function getUserLocation(callback) {
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            store.commit('setLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            if(callback) {
                await callback();
            }
        },
        function() {
            alert("You denied access to your location. This app won't work without your location!");
        },
        {
            enableHighAccuracy: true
        }
    );
}