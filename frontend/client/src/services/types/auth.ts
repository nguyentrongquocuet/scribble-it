import { UserAuthToken } from '@/types';
import { ResolverResult } from './base';

export interface QueryResult <T extends string> {
  __typename: T;
}

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
  Login: (QueryResultOf<'AuthToken', UserAuthToken>) | (QueryResultOf<'LoginFailed', LoginFailed>);
}

export type LoginSuccessResult = UserAuthToken;

export type LoginFailResult = string;

export type LoginResolverResult = ResolverResult<LoginSuccessResult, LoginFailResult>;

/** SignUp */

export interface SignUpVariable {
  username: string;
  password: string;
  repassword: string;
  avatar?: File;
  context: {
    hasUpload: boolean;
  }
}

interface AlreadyRegisted {
  message: string;
}

interface InputError {
  error: string;
  field: string
}

interface InvalidInput {
  errors: InputError;
}

type SignUpSuccessQueryResult = QueryResultOf<'AuthToken', UserAuthToken>;

export type SignUpSuccessResult = UserAuthToken;


export type SignUpFailResult = QueryResultOf<'AlreadyRegisted', AlreadyRegisted> | QueryResultOf<'InvalidInput', InvalidInput>;

export type SignUpQueryResult = {
  SignUp: SignUpFailResult | SignUpSuccessQueryResult;
}

export type SignUpResolverResult = ResolverResult<SignUpSuccessResult, SignUpFailResult>;
