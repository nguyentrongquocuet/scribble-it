import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/components/auth/Login.vue';
import SignUp from '@/components/auth/SignUp.vue';
import NotFound from '@/views/NotFound.vue';
import Welcome from '@/views/Welcome.vue';
import { publicRouterGaurd } from './guard';

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    public?: boolean
    transition?: {
      name: string;
      duration?: number;
      class?:string;
    };
  }
}
export const NotAuthenticatedRoute: RouteRecordRaw[] = [
  {
    path: '/hello',
    component: Welcome,
    name: 'welcome',
    meta: {
      public: true,
    },
    beforeEnter: publicRouterGaurd,
    children: [
      {
        path: 'login',
        components: {
          right: Login,
        },
        meta: {
          transition: {
            name: 'bounce',
            duration: 0,
            class: 'hide-when-leave',
          },
        },
      },
      {
        path: 'signup',
        components: {
          right: SignUp,
        },
        meta: {
          transition: {
            name: 'bounce',
            duration: 0,
            class: 'hide-when-leave',
          },
        },
      },
      {
        path: ':pathMatch(.*)*',
        redirect: '/hello/login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/hello',
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFound,
    meta: {
      public: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'notfound',
    },
  },
];

export const dump = {};

export const router = createRouter({
  routes: NotAuthenticatedRoute,
  history: createWebHistory(),
});
