<template>
  <div>
    <h1>Kategori Ekle</h1>
    <form @submit.prevent="submit()">
      <Input
        label="İsim"
        v-model="kategori"
        :isError="$v.kategori.$error"
        errorText="Kategori alanı zorunludur"
      />
      <button type="submit" class="btn btn-dark btn-block">Kaydet</button>
    </form>
  </div>
</template>

<script>
import Input from "@/components/Input";
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AddCategory",
  components: {
    Input,
  },
  data() {
    return {
      kategori: "",
    };
  },
  validations: {
    kategori: {
      required,
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.addCategory();
    },
    addCategory() {
      axios
        .post("/api/data/createCategory", {
          name: this.kategori,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
};
</script>

<style></style>
