import axios from './axios';
import store from './store';
import { addToList } from '../helpers/utils';

export function getUserLocation(successCallback, failureCallback) {
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            store.commit('setUserLatLng', {
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
            store.commit('setUserLatLng', {
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
    if(!location) {
        return '';
    }
    
    for(const component of ['city', 'county', 'state', 'country']) {
        if(location[component]) {
            return location[component];
        }
    }
    
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
    
    collectCitiesIn(location) {
        if(location.city) {
            return [location];
        }
        if(location.county) {
            return this.cities[location.id];
        }
        if(location.state) {
            const cities = [];
            for(const county of this.counties[location.id]) {
                cities.push.apply(cities, this.cities[county.id]);
            }
            return cities;
        }
        if(location.country) {
            const cities = [];
            for(const state of this.states[location.id]) {
                cities.push.apply(cities, this.collectCitiesIn(state));
            }
            return cities;
        }
    }
}

export const locationTree = new LocationTree();