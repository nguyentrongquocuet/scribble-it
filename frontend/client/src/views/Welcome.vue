<template>
<div class="container welcome">
  <div class="row">
    <div class="col-12 col-md-6 welcome__logo-wrapper">
      <div class="welcome__logo">
        <Image :src="LOGO_URL" class="welcome__logo"/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6">
      <router-view name="left" />
    </div>
    <div class="col-12 col-md-6">
      <router-view name="right" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Image from '@/elements/Image.vue';
import { LOGO_URL } from '@/constant/index';

export default defineComponent({
  components: {
    Image,
  },
  setup() {
    return {
      LOGO_URL,
    };
  },
});
</script>

