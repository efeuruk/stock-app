<template>
  <div class="login vh-100 d-flex justify-content-center align-items-center">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login {
  background: #d4d4d4;
}
</style>
