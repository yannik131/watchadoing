import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    plugins: [createPersistedState({
        paths: ['likedActivities']
    })],
    state: () => ({
        activities: [],
        maxLikeCount: null,
        userLatitude: null,
        userLongitude: null,
        isFetching: false,
        likedActivities: {},
        introductionShowed: false
    }),
    
    mutations: {
        setActivities(state, { activities }) {
            activities.sort((a, b) => { return b.likeCount - a.likeCount; });
            if(activities.length > 0) {
                state.maxLikeCount = activities[0].likeCount;
            }
            else {
                state.maxLikeCount = 0;
            }
            state.activities = activities;
        },
        addActivity(state, { activity }) {
            state.activities.push(activity);
            state.activities.sort((a, b) => { return b.likeCount - a.likeCount; });
            state.maxLikeCount = state.activities[0].likeCount;
        },
        likeActivity(state, { activity }) {
            ++activity.likeCount;
            state.likedActivities[activity.id] = true;
        },
        setLocation(state, { latitude, longitude }) {
            state.userLatitude = latitude;
            state.userLongitude = longitude;
        },
        setFetching(state, { value }) {
            state.isFetching = value;
        },
        introductionShowed(state) {
            state.introductionShowed = true;
        }
    },
    
    getters: {
        activities: state => state.activities,
        maxLikeCount: state => state.maxLikeCount,
        userLatitude: state => state.userLatitude,
        userLongitude: state => state.userLongitude,
        isFetching: state => state.isFetching,
        likedActivities: state => state.likedActivities,
        introductionShowed: state => state.introductionShowed
    }
});

export default store;