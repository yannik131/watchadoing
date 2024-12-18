import { createApp } from 'vue'
import App from './App.vue'
import store from './services/store';
import './main.css'
import Vue3TouchEvents from 'vue3-touch-events';
import messages from './translations';
import { createI18n } from 'vue-i18n';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

const app = createApp(App);

app.use(store);
app.use(Vue3TouchEvents);

const i18n = createI18n({
  locale: store.getters.selectedLocale,
  messages
});

app.use(i18n);

app.mount('#app')