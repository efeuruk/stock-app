<template>
  <div id="app">
    <div v-if="isLoginRequired"><router-view /></div>
    <div v-else><router-view /></div>
  </div>
</template>
<script>
export default {
  name: "App",
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isLoginRequired() {
      return this.$route.meta.requiresAuth;
    },
  },
};
</script>
