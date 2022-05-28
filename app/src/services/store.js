import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    plugins: [createPersistedState({
        paths: ['likedActivities', 'dislikedActivities', /*'locationConfirmed'*/]
    })],
    state: () => ({
        activityMap: [], //city-id -> [activity]
        maxLikeCount: null,
        userLatitude: null,
        userLongitude: null,
        isFetching: false,
        likedActivities: {},
        dislikedActivities: {},
        locationConfirmed: false,
        displayedActivities: []
    }),
    
    mutations: {
        setActivityMap(state, { activityMap }) {
            state.maxLikeCount = 0;
            state.activityMap = activityMap;
        },
        setDisplayedActivities(state, { activities }) {
            state.displayedActivities = activities;
        },
        setMaxLikeCount(state, { maxLikeCount }) {
            state.maxLikeCount = maxLikeCount;
        },
        likeActivity(state, { activity }) {
            if(state.likedActivities[activity.id]) {
                return;
            }
            ++activity.likeCount;
            state.likedActivities[activity.id] = true;
        },
        dislikeActivity(state, { activity }) {
            if(state.dislikedActivities[activity.id]) {
                return;
            }
            --activity.likeCount;
            state.dislikedActivities[activity.id] = true;
        },
        resetActivity(state, { activity }) {
            if(state.likedActivities[activity.id]) {
                --activity.likeCount;
                delete state.likedActivities[activity.id];
            }
            else if(state.dislikedActivities[activity.id]) {
                ++activity.likeCount;
                delete state.dislikedActivities[activity.id];
            }
        },
        setLocation(state, { latitude, longitude }) {
            state.userLatitude = latitude;
            state.userLongitude = longitude;
        },
        setFetching(state, { value }) {
            state.isFetching = value;
        },
        setLocationConfirmed(state, { value }) {
            state.locationConfirmed = value;
        }
    },
    
    getters: {
        activityMap: state => state.activityMap,
        maxLikeCount: state => state.maxLikeCount,
        locationConfirmed: state => state.locationConfirmed,
        userLatitude: state => state.userLatitude,
        userLongitude: state => state.userLongitude,
        isFetching: state => state.isFetching,
        likedActivities: state => state.likedActivities,
        dislikedActivities: state => state.dislikedActivities
    }
});
