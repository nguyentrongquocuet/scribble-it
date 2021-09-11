import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore } from 'vuex';
import type { AppState } from './state';

export const key: InjectionKey<Store<AppState>> = Symbol('store');

export const store = createStore<AppState>({
  state: () => ({
    isAuthenticated: false,
    clientId: '',
  }),
});

export function useStore() {
  return baseUseStore(key);
}
