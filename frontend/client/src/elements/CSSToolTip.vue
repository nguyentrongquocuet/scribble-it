<template>
  <div :class="className">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export type ToolTipPosition = 'top' | 'bottom' | 'left' | 'right';

export default defineComponent({
  props: {
    position: String as PropType<ToolTipPosition>,
  },
  setup(props) {
    const className = computed(() => ['tooltip', `tooltip--${props.position || 'top'}`]);

    return {
      className,
    };
  },
});
</script>
