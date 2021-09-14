import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { LOGIN_MUTATION } from '../mutations/auth';
import {
  LoginFailResult, LoginQueryResult, LoginSuccessResult, LoginVariable,
} from '../types/auth';

export default function useLogin() {
  const failResult = ref<LoginFailResult>();
  const successResult = ref<LoginSuccessResult>();
  const {
    mutate, loading,
  } = useMutation<LoginQueryResult, LoginVariable>(LOGIN_MUTATION);

  function login(username: string, password: string) {
    loading.value = true;
    failResult.value = undefined;
    mutate({
      username,
      password,
    }).then((response) => {
      if (response) {
        const { data } = response;
        if (data) {
          const { Login } = data;
          if (Login.status === 'SUCCESS') {
            successResult.value = Login.node;
          } else {
            failResult.value = Login.node.message;
          }
        }
      }
    });
  }

  return {
    loading,
    failResult,
    successResult,
    login,
  };
}
