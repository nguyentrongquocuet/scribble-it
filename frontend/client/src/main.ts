import { createApp } from 'vue';
import App from './App.vue';
import i18n from './locales';
import './styles/_index.scss';
import { key, store } from './stores';
import { router } from './routes';

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(i18n);
app.mount('#app');
