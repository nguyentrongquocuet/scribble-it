import { RouteRecordRaw } from 'vue-router';
import Login from '@/components/auth/Login.vue';
import SignUp from '@/components/auth/SignUp.vue';
import HomeMenu from '@/components/HomeMenu.vue';
import NotFound from '@/views/NotFound.vue';
import Welcome from '@/views/Welcome.vue';

export const NotAuthenticatedRoute: RouteRecordRaw[] = [
  {
    path: '/hello',
    component: Welcome,
    children: [
      {
        path: 'login',
        components: {
          left: HomeMenu,
          right: Login,
        },
      },
      {
        path: 'signup',
        components: {
          left: HomeMenu,
          right: SignUp,
        },
      },
      {
        path: ':pathMatch(.*)*',
        components: {
          left: HomeMenu,
        },
      },
    ],
  },
  {
    path: '/not-found',
    component: NotFound,
  },
  {
    path: '/',
    redirect: '/hello',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
];

export const dump = {};
