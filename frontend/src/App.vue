<template>
  <div id="app">
    <Loader />
    <router-view />
  </div>
</template>
<script>
import Loader from "@/components/Loader.vue";
export default {
  components: { Loader },
  name: "App",
};
</script>
