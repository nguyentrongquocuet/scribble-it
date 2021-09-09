<template>
  <a v-if="native" :href="href" class="link link-native">
    <slot />
  </a>
  <router-link v-else class="link" :to="href">
    <slot/>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    native: {
      type: Boolean,
      default: () => false,
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
  },
  setup() {
  },
});
</script>
