<template>
  <div>
    <h1>Ürün Ekle</h1>
    <form @submit.prevent="submit()">
      <Input
        label="İsmi"
        v-model="isim"
        :isError="$v.isim.$error"
        errorText="İsim alanı zorunludur"
      />
      <Input
        label="Birimi"
        v-model="birim"
        :isError="$v.birim.$error"
        errorText="Birim alanı zorunludur"
      />
      <Select
        label="Kategoriler"
        :options="categories"
        @onChange="updateCategory"
      />
      <Input
        label="Olması Gereken"
        type="number"
        v-model="olmasiGereken"
        :isError="$v.olmasiGereken.$error"
        errorText="Olması gereken alanı zorunludur"
      />
      <Input
        label="Stok Miktarı"
        type="number"
        v-model="stokMiktari"
        :isError="$v.stokMiktari.$error"
        errorText="Stok miktarı alanı zorunludur"
      />
      <Input
        label="Tedarik Süresi"
        v-model="tedarikSuresi"
        :isError="$v.tedarikSuresi.$error"
        errorText="Tedarik süresi alanı zorunludur"
      />
      <button type="submit" class="btn btn-dark btn-block">Kaydet</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { required, alphaNum, numeric } from "vuelidate/lib/validators";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
export default {
  components: { Input, Select },
  name: "AddProduct",
  data() {
    return {
      categories: [],
      selectedCategory: "",
      isim: "",
      birim: "",
      olmasiGereken: null,
      stokMiktari: null,
      tedarikSuresi: "",
    };
  },
  validations: {
    isim: {
      required,
      alphaNum,
    },
    birim: {
      required,
      alphaNum,
    },
    olmasiGereken: {
      required,
      numeric,
    },
    stokMiktari: {
      required,
      numeric,
    },
    tedarikSuresi: {
      required,
    },
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    updateCategory(value) {
      this.selectedCategory = value;
    },
    getAllCategories() {
      axios
        .get("/api/getAllCategories")
        .then((response) => {
          this.categories = response.data;
          this.selectedCategory = response.data[0];
        })
        .catch((error) => {
          console.error(error);
        });
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.addProduct();
    },
    addProduct() {
      axios
        .post("/api/createProduct", {
          isim: this.isim,
          birim: this.birim,
          kategori: this.selectedCategory,
          olmasiGereken: this.olmasiGereken,
          stokMiktari: this.stokMiktari,
          tedarikSuresi: this.tedarikSuresi,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
