import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    plugins: [createPersistedState({
        paths: ['likedActivities', 'dislikedActivities', /*'locationConfirmed'*/]
    })],
    state: () => ({
        activityMap: [], //city-id -> [activity]
        maxLikeCount: null,
        minLikeCount: null,
        //actual current coordinates (if 'Use current location was used')
        userLatitude: null,
        userLongitude: null,
        //(nearest) city corresponding to above coordinates
        userLocation: null,
        isFetching: false,
        likedActivities: {},
        dislikedActivities: {},
        locationConfirmed: false,
        displayedActivities: [],
        selectedLocation: null
    }),
    
    mutations: {
        setActivityMap(state, { activityMap }) {
            state.maxLikeCount = 0;
            state.activityMap = activityMap;
        },
        setDisplayedActivities(state, { displayedActivities }) {
            state.displayedActivities = displayedActivities;
        },
        setLikeCountMinMax(state, { minLikeCount, maxLikeCount }) {
            state.minLikeCount = minLikeCount;
            state.maxLikeCount = maxLikeCount;
        },
        setSelectedLocation(state, { location }) {
            state.selectedLocation = location;
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
        setUserLatLng(state, { latitude, longitude }) {
            state.userLatitude = latitude;
            state.userLongitude = longitude;
        },
        setUserLocation(state, { location }) {
            state.userLocation = location;
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
        minLikeCount: state => state.minLikeCount,
        locationConfirmed: state => state.locationConfirmed,
        userLatitude: state => state.userLatitude,
        userLongitude: state => state.userLongitude,
        userLocation: state => state.userLocation,
        isFetching: state => state.isFetching,
        likedActivities: state => state.likedActivities,
        dislikedActivities: state => state.dislikedActivities,
        displayedActivities: state => state.displayedActivities,
        selectedLocation: state => state.selectedLocation
    }
});
