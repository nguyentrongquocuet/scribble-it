<template>
  <div class="signup__container form__wrapper">
  {{f}}
    <Form @data="onFormSubmit" class="form signup__form">
      <div class="list list--vertical signup__list">
        <div class="list__item">
          <div class="signup__avatar">
            <Image
              class="avatar avatar--medium border border--sketchy"
              :class="{'avatar--placeholder': !avatarSrc}"
              :src="avatarSrc"
            />
          </div>
        </div>
        <div class="list__item border border--sketchy">
          <FormInput
            :placeholder="t('username.placeholder')"
            :label="t('username.label')"
            :helpText="t('username.help_text')"
            disableAutoComplete
            name="username"
          />
        </div>
        <div class="list__item border border--sketchy">
          <FormInput
            :placeholder="t('password.placeholder')"
            :label="t('password.label')"
            :helpText="t('password.help_text')"
            type="password"
            name="password"
          />
        </div>
        <div class="list__item border border--sketchy">
          <FormInput
            :placeholder="t('confirm_password.placeholder')"
            :label="t('confirm_password.label')"
            :helpText="t('confirm_password.help_text')"
            type="password"
            name="repassword"
          />
        </div>
        <div class="list__item signup__avatarpicker">
          <Button
            size="S"
            variant="outlined"
            @click="toggleSelectAvatar"
          >
            {{ t('avatar.label')}}
          </Button>
          <Input
            ref="avatarPickerRef"
            :helpText="t('avatar.help_text')"
            @change="onAvatarChange"
            type="file"
            name="avatar"
            hidden
          />
        </div>
        <div class="form__field list__item signup__cta signup__submit">
          <Button :disabled="l" size="L" variant="outlined" class="text text--l">
            {{ t('cta_signup.label') }}
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { MAX_AVATAR_SIZE } from '@/constant';
import FormInput from '@/elements/FormInput.vue';
import Input from '@/elements/TextInput.vue';
import Button from '@/elements/Button.vue';
import Image from '@/elements/Image.vue';
import Form from '@/components/Form.vue';

import SignUpI18n from '@/locales/signup.json';
import { SignUpFormDataMap } from '@/types/utils';
import useSignUp from '@/services/hooks/useSignUp';
import { getFileFromEvent, readDataUrl } from '@/utils/form.utils';

export default defineComponent({
  components: {
    Button,
    FormInput,
    Form,
    Image,
    Input,
  },
  setup() {
    const { t } = useI18n({
      messages: SignUpI18n,
    });

    const {
      loading, failResult, successResult, signup,
    } = useSignUp();

    const avatarPickerRef = ref<InstanceType<typeof Input>>();

    const avatarSrc = ref('');

    function onAvatarChange(e: Event) {
      const file = getFileFromEvent(e);
      if (!file) {
        avatarSrc.value = '';
        return;
      }
      if (file.size > MAX_AVATAR_SIZE) {
        avatarSrc.value = '';
        return;
      }
      readDataUrl(file).then((url) => {
        avatarSrc.value = url;
      });
    }

    function toggleSelectAvatar() {
      const avatarPicker = avatarPickerRef.value;
      if (!avatarPicker) return;
      avatarPicker.$el.click();
    }

    function onFormSubmit(data: SignUpFormDataMap): void {
      const {
        username, password, repassword, avatar,
      } = data;
      signup(username, password, repassword, avatar);
    }

    return {
      t,
      l: loading,
      f: failResult,
      onFormSubmit,
      avatarPickerRef,
      toggleSelectAvatar,
      onAvatarChange,
      avatarSrc,
    };
  },
});
</script>
