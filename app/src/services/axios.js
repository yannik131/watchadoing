import axios from 'axios';

const getClient = function() {
    const instance = axios.create();
    if(process.env.VUE_APP_MODE === 'production') {
        instance.defaults.baseURL = 'https://watchadoing.net:8000/';
    }
    else {
        instance.defaults.baseURL = 'http://localhost:8000/';
        instance.interceptors.request.use(function(config) {
            instance.stamp = new Date().getTime();
            return config;
        });
        
        instance.interceptors.response.use(function(response) {
                console.log(`${response.request.responseURL}: ${new Date().getTime() - instance.stamp} ms`);
                console.log(response.data);
                return response;
            },
            function(error) {
                console.log(`${error.response.request.responseURL}: ${new Date().getTime() - instance.stamp} ms`);
                console.log(`Request error: ${JSON.stringify(error.response.data)}`);
                throw error;
            }
        );
    }
    
    return instance;
}

export default getClient();