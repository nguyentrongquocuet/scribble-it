import { UserAuthToken } from '@/types';
import { QueryResult, ResolverResult, RootQueryResult } from './base';

export type QueryResultOf<T extends string, U> = QueryResult<T> & U;

/** Login */
export interface LoginVariable {
  username: string;
  password: string;
}

export interface LoginFailed {
  message: string;
}

export type LoginQueryResult = {
  Login: RootQueryResult<'LoginQueryResult', (QueryResultOf<'AuthToken', UserAuthToken>), (QueryResultOf<'LoginFailed', LoginFailed>)>;
}

export type LoginSuccessResult = UserAuthToken;

export type LoginFailResult = string;

export type LoginResolverResult = ResolverResult<LoginSuccessResult, LoginFailResult>;

/** SignUp */

export interface SignUpVariable {
  username: string;
  password: string;
  repassword: string;
  avatar?: string;
}

interface AlreadyRegisted {
  message: string;
}

interface InputError {
  error: string;
  field: string
}

interface InvalidInput {
  errors: InputError[];
}

export type SignUpSuccessResult = UserAuthToken;

type SignUpSuccessQueryResult = QueryResultOf<'AuthToken', UserAuthToken>;

export type SignUpFailResult = QueryResultOf<'AlreadyRegisted', AlreadyRegisted> | QueryResultOf<'InvalidInput', InvalidInput>;

export type SignUpFailQueryResult = SignUpFailResult;

export type SignUpQueryResult = {
  SignUp: RootQueryResult<'SignUpQueryResult', SignUpSuccessQueryResult, SignUpFailQueryResult>;
}

export type SignUpResolverResult = ResolverResult<SignUpSuccessResult, SignUpFailResult>;
