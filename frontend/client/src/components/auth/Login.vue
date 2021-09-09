<template>
  <div class="container login__container">
    <Form  class="form login__form">
      <div class="list list--vertical">
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
            :placeholder="t('password.placeholder')"
            :label="t('password.label')"
            :helpText="t('password.help_text')"
            type="file"
            name="avatar"
          />
        </div>
        <div class="form__field list__item logn__cta login__submit">
          <Button size="L" variant="outlined" class="text text--l border border--sketchy">
            {{ t('cta_login.label') }}
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import FormInput from '@/elements/FormInput.vue';
import Button from '@/elements/Button.vue';
import Form from '@/components/Form.vue';

import LoginI18n from '@/locales/login.json';

export default defineComponent({
  components: {
    Button,
    FormInput,
    Form,
  },
  setup() {
    const { t } = useI18n({
      messages: LoginI18n,
    });

    return {
      t,
    };
  },
});
</script>
