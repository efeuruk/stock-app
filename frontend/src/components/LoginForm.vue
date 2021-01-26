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
import { required, email } from "vuelidate/lib/validators";
import Input from "@/components/Input";
export default {
  name: "LoginForm",
  components: {
    Input,
  },
  data() {
    return {
      email: "",
      password: "",
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
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.login();
    },
    async login() {
      axios
        .post("/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/home");
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
