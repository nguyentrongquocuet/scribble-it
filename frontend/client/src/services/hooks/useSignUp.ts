import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { SIGNUP_MUTATION } from '../mutations/auth';
import {
  SignUpVariable, SignUpSuccessResult, SignUpFailResult, SignUpQueryResult,
} from '../types/auth';

export default function useSignUp() {
  const failResult = ref<SignUpFailResult>();
  const successResult = ref<SignUpSuccessResult>();
  const {
    mutate, loading,
  } = useMutation<SignUpQueryResult, SignUpVariable>(SIGNUP_MUTATION);

  function signup(username: string, password: string, repassword: string, avatar?: File) {
    loading.value = true;
    failResult.value = undefined;
    console.log(username, password, repassword, avatar);
    const actualAvatar = avatar?.size ? avatar : undefined;
    mutate({
      username,
      password,
      repassword,
    }).then((response) => {
      if (response) {
        const { data } = response;
        if (data) {
          const { SignUp } = data;
          if (SignUp) {
            const { __typename } = SignUp;
            switch (__typename) {
              case 'AlreadyRegisted':
              case 'InvalidInput':
                failResult.value = SignUp;
                break;
              case 'AuthToken':
              default:
                successResult.value = SignUp;
                break;
            }
          }
        }
      }
    });
  }

  return {
    loading,
    failResult,
    successResult,
    signup,
  };
}
