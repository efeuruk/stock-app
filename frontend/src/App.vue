<template>
  <div id="app">
    <Loader :isVisible="isLoading" />
    <div v-if="isLoggedIn">
      <Header />
      <div class="container">
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
import Loader from "@/components/Loader.vue";
import Header from "./components/Header.vue";
export default {
  components: { Loader, Header },
  name: "App",
  computed: {
    ...mapGetters(["isLoggedIn", "isLoading", "getRefCount"]),
  },
  created() {
    this.axios.interceptors.request.use(
      (config) => {
        this.$store.commit("loading", true);
        return config;
      },
      (error) => {
        this.$store.commit("loading", false);
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response) => {
        this.$store.commit("loading", false);
        return response;
      },
      (error) => {
        this.$store.commit("loading", false);
        return Promise.reject(error);
      }
    );
  },
};
</script>
