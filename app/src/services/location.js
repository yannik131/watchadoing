import axios from './axios';
import store from './store';
import { addToList } from '../helpers/utils';

export function getUserLocation(successCallback, failureCallback) {
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            const coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            store.commit('setUserLatLng', coordinates);
            
            try {
                const response = await axios.post('api/locations/', { coordinates });
                if(response.data.location) {
                    store.commit('setUserLocation', {
                        location: response.data.location
                    });
                }
            }
            catch(error) {
                alert(error.response.data.error);
                if(failureCallback) {
                    failureCallback();
                }
            }
            
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
            response.data.location.latitude = parseFloat(response.data.location.latitude);
            response.data.location.longitude = parseFloat(response.data.location.longitude);
            
            store.commit('setUserLatLng', {
                latitude: response.data.location.latitude,
                longitude: response.data.location.longitude
            });
            
            store.commit('setUserLocation', {
                location: response.data.location
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

export function formatLocation(location, moreInfo = false) {
    if(!location) {
        return '';
    }
    
    let result = '';
    
    
    for(const component of ['city', 'county', 'state', 'country']) {
        if(location[component]) {
            if(result.length > 0) {
                return result + ', ' + location[component];
            }
            
            result += location[component];
            
            if(!moreInfo) {
                return result;
            }
        }
    }
}

export function getComponentLevel(location) {
    for(const component of ['city', 'county', 'state', 'country']) {
        if(location[component]) {
            return component;
        }
    }
    throw `${location} has no components`;
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