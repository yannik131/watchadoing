import axios from '../services/axios';
import store from './store';

export async function getActivities() {
    const response = await axios.get('api/activities/'); 
    
    return response.data.activities;
}

export async function createActivity(title) {
    const data = {
        title,
        latitude: store.getters.userLatitude.toFixed(6),
        longitude: store.getters.userLongitude.toFixed(6),
        location: store.getters.userLocation.id
    };
    const response = await axios.post('api/activities/create/', data);
    
    return response.data;
}

export async function updateActivity(id, change) {
    if(change === 1) {
        await axios.post('api/activities/like/', { id })
    }
    else {
        await axios.post('api/activities/dislike/', { id });
    }
}