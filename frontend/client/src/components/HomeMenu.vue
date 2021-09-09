<template>
  <div class="home-menu">
   <div class="home-menu__menu list list--vertical">
    <div
      class="home-menu__entry list__item"
      v-for="entry in entries"
      :key="entry.path"
    >
      <Link :href="entry.path">
        <ButtonWithImage
          contentClassName="text text--xl text--bold"
        >
            {{ t(entry.label) }}
        </ButtonWithImage>
      </Link>
    </div>
   </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import Link from '@/elements/Link.vue';
import ButtonWithImage from '@/elements/PencilImageWrapper.vue';
import HomeMenuText from '@/locales/homemenu.json';

const entries = [
  {
    path: 'login',
    label: 'login',
  },
  {
    path: 'signup',
    label: 'signup',
  },
];

export default defineComponent({
  components: {
    Link,
    ButtonWithImage,
  },
  setup() {
    const { t } = useI18n({
      messages: HomeMenuText,
    });
    return {
      t,
      entries,
    };
  },
});
</script>
