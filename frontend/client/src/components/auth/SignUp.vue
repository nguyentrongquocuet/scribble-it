<template>
  <div class="signup__container form__wrapper">
    <ToolTip
      v-if="f && !l"
      class="signup__tooltip border border--error border--sketchy text text--error signup__error"
      position="top"
    >
      {{ errorToDisplay }}
    </ToolTip>
    <Form @data="onFormSubmit" class="form signup__form">
      <div class="list list--vertical signup__list">
        <div class="list__item">
          <div class="signup__avatar">
            <Image
              class="avatar avatar--medium border border--sketchy"
              :class="{'avatar--placeholder': !avatarSrcToShow}"
              :src="avatarSrcToShow"
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
            type="button"
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
          <Button :disabled="l" size="L" variant="outlined" class="text text--l" type="submit">
            {{ t('cta_signup.label') + (l ? '...' : '') }}
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { MAX_AVATAR_SIZE } from '@/constant';
import FormInput from '@/elements/FormInput.vue';
import Input from '@/elements/TextInput.vue';
import ToolTip from '@/elements/CSSToolTip.vue';
import Button from '@/elements/Button.vue';
import Image from '@/elements/Image.vue';
import Form from '@/components/Form.vue';

import SignUpI18n from '@/locales/signup.json';

import { getFileFromEvent, readDataUrl } from '@/utils/form.utils';
import { SignUpFormDataMap } from '@/types/utils';
import useSignUp from '@/services/hooks/useSignUp';

export default defineComponent({
  components: {
    Button,
    FormInput,
    Form,
    Image,
    Input,
    ToolTip,
  },
  setup() {
    const { t } = useI18n({
      messages: SignUpI18n,
    });

    const {
      loading, failResult, successResult, signup, defaultAvatar,
    } = useSignUp();

    const avatarPickerRef = ref<InstanceType<typeof Input>>();

    const pickedAvatarSrc = ref('');

    function onAvatarChange(e: Event) {
      const file = getFileFromEvent(e);
      if (!file) {
        pickedAvatarSrc.value = '';
        return;
      }
      if (file.size > MAX_AVATAR_SIZE) {
        pickedAvatarSrc.value = '';
        return;
      }
      readDataUrl(file).then((url) => {
        pickedAvatarSrc.value = url;
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

    const errorToDisplay = computed(() => {
      const failue = failResult.value;
      if (!failue) return '';
      switch (failue.__typename) {
        case 'AlreadyRegisted':
          return failue.message;
        case 'InvalidInput':
          return failue.errors.map((error) => error.error).join('\n');
        default:
          return '';
      }
    });

    const avatarSrcToShow = computed(() => {
      if (!pickedAvatarSrc.value) return defaultAvatar.value;
      return pickedAvatarSrc.value;
    });

    return {
      t,
      l: loading,
      f: failResult,
      errorToDisplay,
      onFormSubmit,
      avatarPickerRef,
      toggleSelectAvatar,
      onAvatarChange,
      avatarSrcToShow,
    };
  },
});
</script>
