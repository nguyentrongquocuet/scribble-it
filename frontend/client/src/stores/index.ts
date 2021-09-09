import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore } from 'vuex';
import type { State } from './state';

export const key: InjectionKey<Store<State>> = Symbol('store');

export const store = createStore<State>({
  state: {
    authenticated: false,
    clientId: '',
    user: undefined,
  },
});

export function useStore() {
  return baseUseStore(key);
}
