<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '@/services';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  components: {
    NavBar,
  },
  setup() {
    console.log('HELLO');
    provide(DefaultApolloClient, apolloClient);
  },
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
