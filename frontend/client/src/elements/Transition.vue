<template>
  <transition appear class="transition">
    <slot class="transition"/>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

  },
});
</script>
