<template>
  <form @submit="onFormSubmit" class="form">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function onFormSubmit(e: Event) {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const els = form.elements;
      const data = new FormData(form);
      data.forEach(console.log);
    }

    return {
      onFormSubmit,
    }
  },
})
</script>

