<template>
  <div class="form__field">
    <TextInput
      :label="label"
      :placeholder="placeholder"
      :id="id"
      :name="name"
      :type="type"
      @change="onChange"
      :hidden="hidden"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TextInput from '@/elements/TextInput.vue';

export default defineComponent({
  components: {
    TextInput,
  },
  props: {
    label: String,
    helpText: String,
    name: String,
    id: String,
    placeholder: String,
    type: String,
    disableAutoComplete: Boolean,
    hidden: Boolean,
  },
  emits: ['change'],
  setup(_, { emit }) {
    const value = ref<string>('');
    function onChange(e:Event) {
      emit('change', e);
    }
    return {
      value,
      onChange,
    };
  },
});
</script>
