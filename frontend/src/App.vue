<template>
  <div class="login vh-100 d-flex justify-content-center align-items-center">
    <LoginForm />
  </div>
</template>

<script>
// import axios from "axios";
import LoginForm from "./components/LoginForm.vue";
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "App",
  components: {
    LoginForm,
  },
  mounted() {
    // this.deneme();
  },
  methods: {
    // async deneme() {
    //   axios
    //     .post("/api/login", {
    //       email: "test@test.com",
    //       password: "test123",
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     });
    // },
  },
};
</script>

<style>
.login {
  background: #d4d4d4;
}
</style>
