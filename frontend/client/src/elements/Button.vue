<template>
  <button
    class="btn"
    :class="className"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

const btnVariant = {
  default: '',
  outlined: 'btn--outlined',
  contained: 'btn--contained',
};

export type ButtonVariant = keyof typeof btnVariant;

const btnState = {
  loading: 'btn--loading',
  disabled: 'btn--disabled',
};

export type ButtonState = keyof typeof btnState;

const btnSize = {
  S: 'btn--small',
  M: 'btn--medium',
  L: 'btn--large',
};

export type ButtonSize = keyof typeof btnSize;

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<ButtonVariant>,
      required: true,
      default: () => 'default' as ButtonVariant,
    },
    size: {
      type: String as PropType<ButtonSize>,
      required: false,
      default: () => 'M' as ButtonSize,
    },
  },
  setup(props, { attrs }) {
    const className = computed(() => {
      const cls = ['btn'];
      const { disabled, loading } = attrs;
      if (disabled) cls.push(btnState.disabled);
      if (loading) cls.push(btnState.loading);
      cls.push(btnVariant[props.variant]);
      cls.push(btnSize[props.size]);
      return cls;
    });

    return {
      className,
    };
  },
});
</script>
