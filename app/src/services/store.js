import { createStore } from 'vuex';
import { addToList } from '../helpers/utils';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    plugins: [createPersistedState({
        paths: ['likedActivities', 'dislikedActivities', 'selectedLanguage', 'tutorialShown', /*'locationConfirmed'*/]
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
        selectedLocation: null,
        showAddActivity: false,
        selectedLanguage: 'English',
        availableLanguages: ['English', 'Deutsch'],
        tutorialShown: false,
        //if the state is null, received websocket data can be discarded because it will be downloaded shortly anyways
        //if the state is 'markers' and a location was created, there are 2 cases:
        //1. if the location is on the current zoom level, the location and a marker have to be added
        //2. if not, adding the location is enough
        //if the state is 'bubbles' and an activity was created:
        //1. if the currently selected location contains the activity and the number of bubbles does not yet exceed the limit, the activity and bubble have to be added
        //2. if not, adding the activity is enough
        //if the state is 'bubbles' and an activity was updated:
        //if the selected location contains the activity, update the like count of the bubble corresponding to its name
        appState: null,
        cityRanking: [],
        rankedActivityTitle: null
    }),
    
    mutations: {
        setActivityMap(state, { activityMap }) {
            state.maxLikeCount = 0;
            state.activityMap = activityMap;
        },
        setDisplayedActivities(state, { displayedActivities }) {
            state.displayedActivities = displayedActivities;
        },
        addToDisplayedActivities(state, { activity }) {
            for(const displayedActivity of state.displayedActivities) {
                if(displayedActivity.title === activity.title) {
                    displayedActivity.ids.push(activity.id);
                    return;
                }
            }
            state.displayedActivities.push(activity);
        },
        updateLikeCountMinMax(state, { activity }) {
            state.minLikeCount = Math.min(activity.likeCount, state.minLikeCount);
            state.maxLikeCount = Math.max(activity.likeCount, state.maxLikeCount);
        },
        setLikeCountMinMax(state, { minLikeCount, maxLikeCount }) {
            state.minLikeCount = minLikeCount;
            state.maxLikeCount = maxLikeCount;
        },
        setSelectedLocation(state, { location }) {
            state.selectedLocation = location;
        },
        addActivity(state, { locationId, activity }) {
            addToList(state.activityMap, locationId, activity);
        },
        updateActivity(state, { updatedActivity }) {
            let change;
            let object1;
            let object2;
            
            for(const activity of state.activityMap[updatedActivity.location]) {
                if(activity.id === updatedActivity.id) {
                    change = updatedActivity.likeCount - activity.likeCount;
                    object1 = activity;
                    break;
                }
            }
            
            let maxLikeCount = -1e6;
            let minLikeCount = 1e6;
            for(const activity of state.displayedActivities) {
                if(activity.ids.indexOf(updatedActivity.id) > -1) {
                    object2 = activity;
                    minLikeCount = Math.min(minLikeCount, activity.likeCount + change);
                    maxLikeCount = Math.max(maxLikeCount, activity.likeCount + change);
                }
                else {
                    minLikeCount = Math.min(minLikeCount, activity.likeCount);
                    maxLikeCount = Math.max(maxLikeCount, activity.likeCount);
                }
            }
            if(maxLikeCount !== -1e6) {
                state.maxLikeCount = maxLikeCount;
            }
            if(minLikeCount !== 1e6) {
                state.minLikeCount = minLikeCount;
            }
            
            if(object1 === object2) {
                object1.likeCount += change;
            }
            else {
                object1.likeCount += change;
                if(object2) {
                    object2.likeCount += change;
                }
            }
        },
        likeActivity(state, { activity }) {
            if(state.likedActivities[activity.id]) {
                return;
            }
            state.likedActivities[activity.id] = true;
        },
        dislikeActivity(state, { activity }) {
            if(state.dislikedActivities[activity.id]) {
                return;
            }
            state.dislikedActivities[activity.id] = true;
        },
        resetActivity(state, { activity }) {
            if(state.likedActivities[activity.id]) {
                delete state.likedActivities[activity.id];
            }
            else if(state.dislikedActivities[activity.id]) {
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
        },
        toggleShowAddActivity(state) {
            state.showAddActivity = !state.showAddActivity;
        },
        setAppState(state, { value }) {
            state.appState = value;
        },
        setSelectedLanguage(state, { language }) {
            state.selectedLanguage = language;
        },
        setTutorialShown(state) {
            state.tutorialShown = true;
        },
        setCityRanking(state, { ranking }) {
            state.cityRanking = ranking;
        },
        setRankedActivityTitle(state, { title }) {
            state.rankedActivityTitle = title;
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
        selectedLocation: state => state.selectedLocation,
        showAddActivity: state => state.showAddActivity,
        isUserLocation: state => (state.selectedLocation && state.userLocation) && (state.selectedLocation.id === state.userLocation.id),
        appState: state => state.appState,
        selectedLanguage: state => state.selectedLanguage,
        availableLanguages: state => state.availableLanguages.filter(item => item !== state.selectedLanguage),
        selectedLocale: state => { return {'English': 'en', 'Deutsch': 'de'}[state.selectedLanguage]; },
        tutorialShown: state => state.tutorialShown,
        cityRanking: state => state.cityRanking,
        rankedActivityTitle: state => state.rankedActivityTitle
    }
});
