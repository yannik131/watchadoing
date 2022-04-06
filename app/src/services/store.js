import { createStore } from 'vuex';

const store = createStore({
    state: () => ({
        activities: [],
        maxLikeCount: null
    }),
    
    mutations: {
        setActivities(state, { activities }) {
            activities.sort((a, b) => { return b.likeCount - a.likeCount; });
            state.maxLikeCount = activities[0].likeCount;
            state.activities = activities;
        }
    },
    
    getters: {
        activities: state => state.activities,
        maxLikeCount: state => state.maxLikeCount
    }
});

export default store;