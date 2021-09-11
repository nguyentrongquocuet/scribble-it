<template>
<div class="container welcome__wrapper">
  <div class="welcome row">
    <div class="col-12 col-md-6 welcome__column flex-center">
      <div class="welcome__logo-wrapper">
        <div class="welcome__logo">
          <Image :src="LOGO_URL" class="welcome__logo"/>
        </div>
      </div>
      <div class="welcome__menu">
          <HomeMenu />
      </div>
    </div>
    <div class="col-12 col-md-6 welcome__column flex-center welcome__column--right">
        <router-view v-slot="{ Component, route }" name="right">
          <!-- Use any custom transition and fallback to `fade` -->
          <transition v-bind="route.meta?.transition">
            <keep-alive  >
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Image from '@/elements/Image.vue';
import HomeMenu from '@/components/HomeMenu.vue';

import { LOGO_URL } from '@/constant/index';

export default defineComponent({
  components: {
    Image,
    HomeMenu,
  },
  setup() {
    return {
      LOGO_URL,
    };
  },
});
</script>
