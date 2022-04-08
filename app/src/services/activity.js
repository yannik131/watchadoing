import axios from '../services/axios';
import store from './store';
import { distance } from '../helpers/distance';

export async function getActivities() {
    try {
        const response = await axios.get('api/activities');
        let activities = response.data;
        const maxDistance = 50000;
        activities = activities.filter(activity => {
            return  distance(
                store.getters.userLatitude,
                store.getters.userLongitude,
                activity.latitude,
                activity.longitude
            ) < maxDistance;
        })
        if(activities.length === 0) {
            return;
        }
        
        store.commit('setActivities', {
            activities
        });
    }
    catch(error) {
        return;
    }
}

export async function createActivity(title) {
    try {
        const data = {
            title: title[0].toUpperCase() + title.substring(1),
            latitude: store.getters.userLatitude.toFixed(6),
            longitude: store.getters.userLongitude.toFixed(6),
            likeCount: 0
        };
        await axios.post('api/activities/', data);
        store.commit('addActivity', {
            activity: data
        });
    }
    catch(error) {
        return;
    }
}