<template>
  <div>
    <h1>Ürün Ekle</h1>
    <form>
      <Input label="İsmi" />
      <Input label="Birimi" />
      <Select label="Kategoriler" :options="categories" />
      <Input label="Olması Gereken" />
      <Input label="Stok Miktarı" />
      <Input label="Tedarik Süresi" />
      <button class="btn btn-dark btn-block">Kaydet</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
export default {
  components: { Input, Select },
  name: "AddProduct",
  data() {
    return {
      categories: [],
      selectedCategory: "",
    };
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
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
  },
};
</script>

<style></style>
