import { createStore } from 'vuex';

const store = createStore({
    state: () => ({
        activities: [],
        maxLikeCount: null,
        userLatitude: null,
        userLongitude: null,
        isFetching: false
    }),
    
    mutations: {
        setActivities(state, { activities }) {
            activities.sort((a, b) => { return b.likeCount - a.likeCount; });
            state.maxLikeCount = activities[0].likeCount;
            state.activities = activities;
        },
        addActivity(state, { activity }) {
            state.activities.push(activity);
            state.activities.sort((a, b) => { return b.likeCount - a.likeCount; });
            state.maxLikeCount = state.activities[0].likeCount;
        },
        setLocation(state, { latitude, longitude }) {
            state.userLatitude = latitude;
            state.userLongitude = longitude;
        },
        setFetching(state, { value }) {
            state.isFetching = value;
        }
    },
    
    getters: {
        activities: state => state.activities,
        maxLikeCount: state => state.maxLikeCount,
        userLatitude: state => state.userLatitude,
        userLongitude: state => state.userLongitude,
        isFetching: state => state.isFetching
    }
});

export default store;