<template>
  <input class="input" :class="className" :type="type">
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export type TypeofTextInput = 'text' | 'number' | 'radio';
export default defineComponent({
  props: {
    type: {
      type: String as PropType<TypeofTextInput>,
      default: () => 'text',
    },
  },
  setup(props) {
    const className = computed(() => `input--${props.type}`);
    return {
      className,
    };
  },
});
</script>
