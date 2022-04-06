import axios from 'axios';
import store from './store';
import { randomInteger } from '../helpers/randomInteger';

export async function getActivities() {
    try {
        const response = await axios.get('/api/activities');
        const activities = response.data.activities;
        if(activities.length === 0) {
            return;
        }
        
        store.commit('setActivities', {
            activities: response.data.activities
        });
    }
    catch(error) {
        const titles = ['Jogging', 'Netflix', 'Sleeping', 'Board games', 'Eating', 'McDonalds', 'Walking my dog'];
        let activities = [];
        for(const title of titles) {
            for(const letter of ['a', 'b', 'c', 'd', 'e']) {
                activities.push({
                    title: title + letter,
                    likeCount: randomInteger(0, 50)
                });
            }
            
        }
        store.commit('setActivities', {
            activities
        });
    }
}