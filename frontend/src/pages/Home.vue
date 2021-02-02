<template>
  <div>
    <div class="row pb-3">
      <div class="col-6">
        <Input placeholder="Ürün arayın" />
      </div>
      <div class="col-6">
        <Select :options="categories" @onChange="updateCategory" />
      </div>
    </div>
    <Table :headers="headers" :rows="products">
      <button class="btn btn-primary">Düzenle</button>
    </Table>
  </div>
</template>

<script>
import axios from "axios";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import Table from "@/components/Table.vue";

export default {
  components: { Input, Select, Table },
  name: "Home",
  data() {
    return {
      categories: [],
      selectedCategory: "",
      headers: [],
      products: [],
    };
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    updateCategory(value) {
      this.selectedCategory = value;
      this.filterProductsByCategory();
    },
    getAllCategories() {
      axios
        .get("/api/getAllCategories")
        .then((response) => {
          this.categories = response.data;
          this.selectedCategory = response.data[0];
          this.filterProductsByCategory();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filterProductsByCategory() {
      axios
        .post("/api/getAllProductsOfACategory", {
          categoryName: this.selectedCategory,
        })
        .then((response) => {
          this.products = response.data;
          this.headers = Object.keys(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
</style>
