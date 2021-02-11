<template>
  <div id="app">
    <Loader :isVisible="isLoading" />
    <div v-if="isLoggedIn && isLoginRequired">
      <Header />
      <div class="container content mt-5">
        <router-view />
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import createAxiosInstance from "@/helpers/create-axios-instance";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
export default {
  components: { Loader, Header },
  name: "App",
  created() {
    createAxiosInstance(this);
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isLoading"]),
    isLoginRequired() {
      return this.$route.meta.requiresAuth;
    },
  },
};
</script>
