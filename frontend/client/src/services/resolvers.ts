import { ref } from 'vue';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { apolloClient } from '.';
import {
  LoginFailResult, LoginQueryResult, LoginResolverResult, LoginSuccessResult, LoginVariable,
} from './types/auth';
import { LOGIN_MUTATION } from './mutations/auth';

export async function RLogin(username: string, password: string):Promise<LoginResolverResult> {
  const {
    mutate, loading,
  } = useMutation<LoginQueryResult, LoginVariable>(LOGIN_MUTATION);
  let successResult;
  let failResult;
  const response = await mutate({
    username,
    password,
  });
  if (response) {
    const { data } = response;
    if (data) {
      const { Login } = data;
      if (Login) {
        const { __typename } = Login;
        switch (__typename) {
          case 'LoginFailed':
            failResult = Login.message;
            break;
          case 'AuthToken':
          default:
            successResult = Login;
            break;
        }
      }
    }
  }
  return { successResult, failResult, loading: true };
}

export const d = 1;
