<template>
  <div id="app">
    <Loader />
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
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";
import Header from "./components/Header.vue";
export default {
  components: { Loader, Header },
  name: "App",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>
