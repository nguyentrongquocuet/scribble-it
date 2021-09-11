import { store } from '.';

export function getAuthenticateState() {
  return store.state.isAuthenticated;
}
