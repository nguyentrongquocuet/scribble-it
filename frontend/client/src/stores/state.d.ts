import { User } from '@/types';

export interface BaseState {
  isAuthenticated: boolean;
  clientId: string;
}

export interface UnAuthenticatedState extends BaseState {
  isAuthenticated: false;
}

export interface AuthenticatedState extends BaseState {
  user: User;
  isAuthenticated: true;
}

export type AppState = UnAuthenticatedState | AuthenticatedState;
