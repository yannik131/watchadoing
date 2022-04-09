import axios from 'axios';

const getClient = function() {
    const instance = axios.create();
    instance.defaults.baseURL = 'https://app.myactivities.net/';
    
    return instance;
}

export default getClient();