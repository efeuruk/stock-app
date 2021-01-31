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
import createAxiosInstance from "./helpers/create-axios-instance";
import Loader from "@/components/Loader.vue";
import Header from "./components/Header.vue";
export default {
  components: { Loader, Header },
  name: "App",
  computed: {
    ...mapGetters(["isLoggedIn", "isLoading"]),
  },
  created() {
    createAxiosInstance(this);
  },
};
</script>
