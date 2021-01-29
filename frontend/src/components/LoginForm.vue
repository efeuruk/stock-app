<template>
  <form @submit.prevent="submit()">
    <div class="mb-3 text-center">
      <img
        class="rounded"
        src="https://icon-library.com/images/inventory-icon/inventory-icon-8.jpg"
        width="200"
        alt="stock-image"
      />
    </div>
    <Alert
      v-if="error"
      text="Giriş bilgileriniz yanlış lütfen tekrar deneyiniz"
      type="alert-danger"
      @close="error = false"
    />
    <Input
      type="email"
      label="Email Address"
      id="login-email"
      v-model="email"
      :isError="$v.email.$error"
      errorText="Email alanı zorunludur"
    />
    <Input
      type="password"
      label="Password"
      id="login-password"
      v-model="password"
      :isError="$v.password.$error"
      errorText="Password alanı zorunludur"
    />
    <button type="submit" class="btn btn-block btn-dark">Submit</button>
  </form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import Input from "@/components/Input";
import Alert from "@/components/Alert";
export default {
  name: "LoginForm",
  components: {
    Input,
    Alert,
  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(["finalizeLogin"]),
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.login();
    },
    login() {
      axios
        .post("/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.finalizeLogin(response.data);
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style scoped>
form {
  padding: 0 20px;
  width: 500px;
}
</style>
