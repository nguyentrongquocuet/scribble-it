import { UserAuthToken } from '@/types';
import { ResolverResult } from './base';

export interface LoginVariable {
  username: string;
  password: string;
}

export interface QueryResult <T extends string> {
  __typename: T;
}

export type QueryResultOf<T extends string, U> = QueryResult<T> & U;

export interface LoginFailed {
  message: string;
}

export type LoginQueryResult = {
  Login: (QueryResultOf<'AuthToken', UserAuthToken>) | (QueryResultOf<'LoginFailed', LoginFailed>);
}

export type LoginSuccessResult = UserAuthToken;

export type LoginFailResult = string;

export type LoginResolverResult = ResolverResult<LoginSuccessResult, LoginFailResult>;
