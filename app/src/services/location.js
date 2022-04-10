import store from './store';

export function getUserLocation(successCallback, failureCallback) {
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            store.commit('setLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            if(successCallback) {
                await successCallback();
            }
        },
        function(error) {
            alert("You denied access to your location. This app won't work without your location!");
            console.log(error);
            if(failureCallback) {
                failureCallback();
            }
        },
        {
            enableHighAccuracy: true
        }
    );
}