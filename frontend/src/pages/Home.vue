<template>
  <div>
    <div class="row pb-3">
      <div class="col-6">
        <Input v-model="q" @input="getAllProducts" placeholder="Ürün arayın" />
      </div>
      <div class="col-6">
        <Select :options="categories" @onChange="updateCategory" />
      </div>
    </div>
    <Card class="mb-4 bg-warning" v-if="warnings.length !== 0">
      <ul>
        <li v-for="(warning, index) in warnings" :key="index">
          {{ warning }}
        </li>
      </ul>
    </Card>
    <Table :headers="headers" :rows="products" />
  </div>
</template>

<script>
import axios from "axios";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import Table from "@/components/Table.vue";
import Card from "@/components/Card.vue";

export default {
  components: { Input, Select, Table, Card },
  name: "Home",
  data() {
    return {
      categories: [],
      selectedCategory: "",
      headers: [],
      products: [],
      q: "",
      warnings: [],
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
          this.categories = ["Hepsi", ...response.data];
          this.selectedCategory = "Hepsi";
          this.getAllProducts();
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    getAllProducts() {
      axios
        .post("/api/getAllProducts", {
          q: this.q,
        })
        .then((response) => {
          this.products = response.data;
          if (this.headers.length === 0)
            this.headers = Object.keys(response.data[0]);
          this.checkStockStatus();
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    filterProductsByCategory() {
      if (this.selectedCategory === "Hepsi") {
        this.getAllProducts();
      } else {
        axios
          .post("/api/getAllProductsOfACategory", {
            categoryName: this.selectedCategory,
          })
          .then((response) => {
            this.products = response.data;
            if (this.headers.length === 0)
              this.headers = Object.keys(response.data[0]);
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    },
    checkStockStatus() {
      const itemsWithLeadTime = this.products.filter(
        (product) => product.tedarikSuresi !== "yok",
      );
      itemsWithLeadTime.forEach((item) => {
        const weeksToStockWillLast =
          Math.floor(item.stokMiktari / item.olmasiGereken) * 7;
        const leadTime = parseInt(item.tedarikSuresi.split(" ")[0]);
        if (leadTime > weeksToStockWillLast) {
          this.warnings.push(
            `${item.isim} için ${weeksToStockWillLast /
              7} haftalık stoğunuz kaldı, ${leadTime /
              7} haftalık zamanda geliyor, sipariş vermelisiniz`,
          );
        }
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
