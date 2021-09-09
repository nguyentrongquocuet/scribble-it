<template>
  <div class="pcimg__wrapper">
    <Image class="pcimg__image" :src="PENCIL_BUTTON_URL" />
    <div class="pcimg__content" :class="contentClassName">
      <slot>
        Texthere
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Image from '@/elements/Image.vue';
import { PENCIL_BUTTON_URL } from '@/constant';

export default defineComponent({
  components: {
    Image,
  },
  props: {
    contentClassName: String,
  },
  setup() {
    return {
      PENCIL_BUTTON_URL,
    }
  },
});
</script>
