<template>
  <form @submit="onFormSubmit" class="form">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormDataMap } from '@/types/utils';

export default defineComponent({
  emits: ['data'],
  setup(_, { emit }) {
    function onFormSubmit(e: Event) {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const els = form.elements;
      const data = new FormData(form);
      const dataMap = {} as FormDataMap;
      data.forEach((value, key) => {
        dataMap[key] = value;
      });
      emit('data', dataMap);
    }

    return {
      onFormSubmit,
    }
  },
})
</script>

