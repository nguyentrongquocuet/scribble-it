<template>
  <div class="nav container">
  <ul class="nav__list row">
  <li class="nav__item col-1">
    <Link href="/login">
      <h3 class="heading h3">
        {{ t('entries.login') }}
      </h3>
    </Link>
  </li>
  <li class="nav__item col-1">
    <Link href="/login">
      <h3 class="heading h3">
        {{ t('entries.signup') }}
      </h3>
    </Link>
  </li>
  </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import NavI18N from '@/locales/navbar.json';
import Link from '@/elements/Link.vue';

export default defineComponent({
  components: {
    Link,
  },
  setup() {
    const { t } = useI18n({
      messages: NavI18N,
    });
    return {
      t,
    };
  },
});
</script>

<style lang='scss' scoped>
  .nav__list {
    justify-content: space-between;
    align-items: center;
  }
  .nav__item {
    align-items: center;
  }
</style>
