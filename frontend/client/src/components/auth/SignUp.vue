<template>
  <div class="container login__container">
    <Form class="form login__form">
      <div class="list list--vertical">
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
        <div class="list__item border border--sketchy">
          <FormInput
            :label="t('avatar.label')"
            :helpText="t('avatar.help_text')"
            type="file"
            name="avatar"
            @change="onAvatarChange"
          />
        </div>
        <div class="form__field list__item logn__cta login__submit">
          <Button size="L" variant="outlined" class="text text--l border border--sketchy">
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
import Button from '@/elements/Button.vue';
import Image from '@/elements/Image.vue';
import Form from '@/components/Form.vue';

import SignUpI18n from '@/locales/signup.json';
import { readDataUrl } from '@/utils/form.utils';

export default defineComponent({
  components: {
    Button,
    FormInput,
    Form,
    Image,
  },
  setup() {
    const { t } = useI18n({
      messages: SignUpI18n,
    });

    const avatarSrc = ref('');

    function onAvatarChange(e: Event) {
      const target = e.target as HTMLInputElement;
      if (!target) {
        avatarSrc.value = '';
        return;
      }
      const { files } = target;
      if (!files) {
        avatarSrc.value = '';
        return;
      }
      const file = files[0];
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
    return {
      t,
      onAvatarChange,
      avatarSrc,
    };
  },
});
</script>
