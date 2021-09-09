<template>
  <router-view />
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components:{
    NavBar,
  },
  setup(){
    console.log("HELLO");
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
