<template>
  <div>
    <h1>Home</h1>
    <button class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style></style>
