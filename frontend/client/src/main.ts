import { createApp } from 'vue';
import { createWebHistory , createRouter } from 'vue-router';
import App from './App.vue';
import i18n from './locales';
import { NotAuthenticatedRoute } from './routes';
import './styles/_index.scss';
import { gql } from 'graphql-tag';

console.log(gql`
            query Login($username: String!, $password: String!) {
                Login(username: $username, password: $password) {
                  User
                }
              }
            `);
const router = createRouter({
  routes: NotAuthenticatedRoute,
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
