import { onMounted, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { SIGNUP_MUTATION } from '../mutations/auth';
import {
  SignUpVariable, SignUpSuccessResult, SignUpFailResult, SignUpQueryResult,
} from '../types/auth';
import { uploadFile } from '../upload';
import { GET_DEFAULT_AVATAR } from '../queries/user';

export default function useSignUp() {
  const failResult = ref<SignUpFailResult>();
  const successResult = ref<SignUpSuccessResult>();
  const loading = ref(false);
  const defaultAvatar = ref('');
  const {
    mutate,
  } = useMutation<SignUpQueryResult, SignUpVariable>(SIGNUP_MUTATION);

  const { mutate: getDefaultAvatar } = useMutation<{ DefaultAvatar : string }>(GET_DEFAULT_AVATAR);

  onMounted(() => {
    getDefaultAvatar().then((response) => {
      console.log('xxxx', response);
      if (!response) return;
      const { data } = response;
      if (!data) return;
      const { DefaultAvatar } = data;
      defaultAvatar.value = DefaultAvatar;
      console.log(defaultAvatar);
    });
  });

  async function signup(username: string, password: string, repassword: string, avatar?: File) {
    loading.value = true;
    failResult.value = undefined;
    console.log(username, password, repassword, avatar);
    const actualAvatar = avatar?.size ? avatar : undefined;
    let avatarUrl;
    if (actualAvatar) {
      const uploadedUrl = await uploadFile(actualAvatar, 'signup', 'avatar');
      if (typeof uploadedUrl === 'string') {
        console.log(uploadedUrl);
        loading.value = false;
        return;
      }
      avatarUrl = uploadedUrl.fileUrl;
    }
    const response = await mutate({
      username,
      password,
      repassword,
      avatar: avatarUrl,
    });
    if (response) {
      const { data } = response;
      if (data) {
        const { SignUp } = data;
        if (SignUp.status === 'ERROR') {
          failResult.value = SignUp.node;
        } else {
          successResult.value = SignUp.node;
        }
      }
    }
    loading.value = false;
  }

  return {
    loading,
    failResult,
    successResult,
    signup,
    defaultAvatar,
  };
}
