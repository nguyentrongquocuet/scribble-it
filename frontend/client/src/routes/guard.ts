import { RouteRecordRaw } from 'vue-router';
import { getAuthenticateState } from '../stores/utils';

export type AppRouterGaurd = Required<RouteRecordRaw>['beforeEnter'];

export const publicRouterGaurd: AppRouterGaurd = (to, from, next) => {
  const isAuthenticated = getAuthenticateState();
  if (!isAuthenticated) return next();
};
