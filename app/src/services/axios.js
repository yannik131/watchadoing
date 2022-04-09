import axios from 'axios';

const getClient = function() {
    const instance = axios.create();
    instance.defaults.baseURL = 'http://localhost:8000/';
    
    return instance;
}

export default getClient();