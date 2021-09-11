<template>
<div class="container notfound flex-center">
  Not found
  Go to
  <Link href="/hello">
    Login
  </Link>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Link from '@/elements/Link.vue';

export default defineComponent({
  components: {
    Link,
  },
  setup() {

  },
});
</script>
