import axios from '../services/axios';
import store from './store';
import { distance } from '../helpers/distance';

export async function getActivities() {
    store.commit('setFetching', {
        value: true
    });
    
    const response = await axios.get('api/activities');
    let activities = response.data;
    for(const activity of activities) {
        activity.distance = distance(
            store.getters.userLatitude,
            store.getters.userLongitude,
            activity.latitude,
            activity.longitude
        );
    }
    activities.sort((a, b) => { return a.distance - b.distance; });
    
    const limit = 100;
    const duplicateCheck = {};
    const filteredActivities = [];
    
    for(const activity of activities) {
        if(duplicateCheck[activity.title]) {
            continue;
        }
        duplicateCheck[activity.title] = true;
        filteredActivities.push(activity);
        if(filteredActivities.length === limit) {
            break;
        }
    }
    
    store.commit('setActivities', {
        activities: filteredActivities
    });
    
    store.commit('setFetching', {
        value: false
    });
    
}

export async function createActivity(title) {
    try {
        const data = {
            title,
            latitude: store.getters.userLatitude.toFixed(6),
            longitude: store.getters.userLongitude.toFixed(6),
            likeCount: 0
        };
        const response = await axios.post('api/activities/', data);
        store.commit('addActivity', {
            activity: response.data
        });
    }
    catch(error) {
        return;
    }
}

export async function updateActivity(activity) {
    await axios.patch(`api/activities/${activity.id}/`, activity);
}