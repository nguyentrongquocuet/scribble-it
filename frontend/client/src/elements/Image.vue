<template>
  <img class="img" :src="src" :alt="alt">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: String,
    alt: String,
  },
  setup() {

  },
})
</script>

