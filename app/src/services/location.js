import axios from './axios';
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
        function() {
            alert("You denied access to your location. This app won't work without your location! You can type it in manually, though.");
            if(failureCallback) {
                failureCallback();
            }
        },
        {
            enableHighAccuracy: true
        }
    );
}

export async function getUserLocationByAddress(address) {
    try {
        const response = await axios.post('api/locations/', { address });
        if(response.data.location) {
            store.commit('setLocation', {
                latitude: response.data.location.latitude,
                longitude: response.data.location.longitude
            });
        }
        return {
            location: response.data.location,
            error: response.data.error
        };
    }
    catch(error) {
        let errorMessage = 'Service unavailable :(';
        if(error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error
        }
        return {
            error: errorMessage
        }
    }
}

export function formatLocation(location) {
    return `${location.city}, ${location.state}`;
}