<template>
  <div>
    <h1>{{ $route.params.id }} Ürünü'nü Düzenle</h1>
    <form @submit.prevent="submit()">
      <Input
        label="Birimi"
        v-model="birim"
        :isError="$v.birim.$error"
        errorText="Birim alanı zorunludur"
      />
      <Select
        label="Kategoriler"
        :options="categories"
        :selectedValue="selectedCategory"
        @onChange="updateCategory"
      />
      <Input
        label="Olması Gereken"
        type="number"
        step="0.5"
        v-model="olmasiGereken"
        :isError="$v.olmasiGereken.$error"
        errorText="Olması gereken alanı zorunludur"
      />
      <Input
        label="Stok Miktarı"
        type="number"
        step="0.5"
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
      <button type="submit" class="btn btn-dark btn-block">Güncelle</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { required, alphaNum, decimal } from "vuelidate/lib/validators";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
export default {
  components: { Input, Select },
  name: "EditProduct",
  data() {
    return {
      categories: [],
      selectedCategory: "",
      birim: "",
      olmasiGereken: null,
      stokMiktari: null,
      tedarikSuresi: "",
    };
  },
  validations: {
    birim: {
      required,
      alphaNum,
    },
    olmasiGereken: {
      required,
      decimal,
    },
    stokMiktari: {
      required,
      decimal,
    },
    tedarikSuresi: {
      required,
    },
  },
  mounted() {
    this.getAllCategories();
    this.getProduct();
  },
  methods: {
    getProduct() {
      const productId = this.$route.params.id;
      axios
        .post("/api/data/getProduct", {
          productName: productId,
        })
        .then(({ data }) => {
          this.birim = data.birim;
          this.updateCategory(data.kategori);
          // this.selectedCategory = data.kategori;
          this.stokMiktari = data.stokMiktari;
          this.tedarikSuresi = data.tedarikSuresi;
          this.olmasiGereken = data.olmasiGereken;
        });
    },
    updateCategory(value) {
      this.selectedCategory = value;
    },
    getAllCategories() {
      axios
        .get("/api/data/getAllCategories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.updateProduct();
    },
    updateProduct() {
      axios
        .post("/api/data/updateProduct", {
          isim: this.$route.params.id,
          birim: this.birim,
          kategori: this.selectedCategory,
          olmasiGereken: parseFloat(this.olmasiGereken),
          stokMiktari: parseFloat(this.stokMiktari),
          tedarikSuresi: this.tedarikSuresi,
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
