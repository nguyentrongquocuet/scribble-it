<template>
  <div class="login__container form__wrapper">

    <Transition name="bounce" :duration="1000" >
        <ToolTip
          v-if="f && !l"
          class="login__tooltip border border--error border--sketchy text text--error login__error"
          position="top"
        >
          {{f}}
        </ToolTip>
    </Transition>
    <Form @data="onFormSubmit" class="form login__form">
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
        <div class="form__field list__item logn__cta login__submit">
          <Button
            :disabled="l"
            size="L"
            variant="outlined"
            class="text text--l border border--sketchy"
          >
            {{ t("cta_login.label") + (l ? '...': '') }}
          </Button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import FormInput from '@/elements/FormInput.vue';
import Transition from '@/elements/Transition.vue';
import ToolTip from '@/elements/CSSToolTip.vue';
import Button from '@/elements/Button.vue';
import Form from '@/components/Form.vue';

import LoginI18n from '@/locales/login.json';
import { LoginFormDataMap } from '@/types/utils';
import useLogin from '@/services/hooks/useLogin';

export default defineComponent({
  components: {
    Button,
    FormInput,
    Form,
    Transition,
    ToolTip,
  },
  setup() {
    const { t } = useI18n({
      messages: LoginI18n,
    });
    const {
      loading, failResult, successResult, login,
    } = useLogin();

    function onFormSubmit(data: LoginFormDataMap): void {
      const { username, password } = data;
      login(username, password);
    }

    return {
      t,
      l: loading,
      s: successResult,
      f: failResult,
      onFormSubmit,
    };
  },
});
</script>
