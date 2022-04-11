import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    plugins: [createPersistedState({
        paths: ['likedActivities', 'dislikedActivities', 'introductionShown']
    })],
    state: () => ({
        activities: [],
        maxLikeCount: null,
        userLatitude: null,
        userLongitude: null,
        isFetching: false,
        likedActivities: {},
        dislikedActivities: {},
        introductionShown: false
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
        setIntroductionShown(state, { value }) {
            state.introductionShown = value;
        }
    },
    
    getters: {
        activities: state => state.activities,
        maxLikeCount: state => state.maxLikeCount,
        userLatitude: state => state.userLatitude,
        userLongitude: state => state.userLongitude,
        isFetching: state => state.isFetching,
        likedActivities: state => state.likedActivities,
        dislikedActivities: state => state.dislikedActivities,
        introductionShown: state => state.introductionShown
    }
});

export default store;