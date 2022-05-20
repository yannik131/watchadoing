import axios from './axios';
import store from './store';
import { addToList } from '../helpers/utils';

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

export async function getLocations() {
    const response = await axios.get('api/locations');
    return response.data.locations;
}

class LocationTree {
    constructor() {
        this.countries = {}; //Maybe we go to mars some day?
        this.states = {};
        this.counties = {};
        this.cities = {};
    }
    
    addLocations(locations) {
        const getScore = (location) => {
            //countries have highest score (3), cities lowest score (0)
            return 4 - +Boolean(location.city) - +Boolean(location.state) - +Boolean(location.county) - +Boolean(location.country);
        }
        
        locations.sort((a, b) => {
            return getScore(b) - getScore(a);
        });
        
        for(const location of locations) {
            if(location.state === null) {
                var dict = this.countries;
            }
            else if(location.county === null) {
                dict = this.states;
            }
            else if(location.city === null) {
                dict = this.counties;
            }
            else {
                dict = this.cities;
            }
            addToList(dict, location.parent, location);
        }
    }
    
    getCountries() {
        return [];
    }
}

export const locationTree = new LocationTree();