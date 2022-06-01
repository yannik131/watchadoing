import axios from '../services/axios';
import store from './store';

export async function getActivities() {
    const response = await axios.get('api/activities'); 
    
    return response.data;
}

export async function createActivity(title) {
    const data = {
        title,
        latitude: store.getters.userLatitude.toFixed(6),
        longitude: store.getters.userLongitude.toFixed(6),
        likeCount: 0,
        location: store.getters.userLocation.id
    };
    const response = await axios.post('api/activities/', data);
    store.commit('addActivity', {
        locationId: store.getters.userLocation.id,
        activity: response.data
    });
}

export async function updateActivity(activity) {
    await axios.patch(`api/activities/${activity.id}/`, activity);
}