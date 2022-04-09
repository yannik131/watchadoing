import axios from '../services/axios';
import store from './store';
import { distance } from '../helpers/distance';

export async function getActivities() {
    try {
        const response = await axios.get('api/activities');
        let activities = response.data;
        const maxDistance = 50000;
        activities = activities.filter(activity => {
            return distance(
                store.getters.userLatitude,
                store.getters.userLongitude,
                activity.latitude,
                activity.longitude
            ) < maxDistance;
        });
        const occurenceCount = {};
        for(let i = activities.length-1; i >= 0; --i) {
            const activity = activities[i];
            if(!occurenceCount[activity.title]) {
                occurenceCount[activity.title] = 1;
            }
            else {
                activities.splice(i, 1);
            }
        }
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