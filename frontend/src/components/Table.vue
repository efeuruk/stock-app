<template>
  <div v-if="rows.length > 0" class="table-responsive">
    <table class="table">
      <thead>
        <tr class="bg-dark text-white">
          <th v-for="header in headers" :key="header" scope="col">
            {{ header.toUpperCase() }}
          </th>
          <th>AKSİYONLAR</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="addClassToRow(row)"
          v-for="(row, index) in rows"
          :key="index"
        >
          <td v-for="(cell, index) in row" :key="index">
            {{ cell }}
          </td>
          <td>
            <router-link :to="`/edit-product/${row.isim}`">
              <button class="btn btn-light mr-3">
                <img src="@/assets/icons/edit.svg" alt="edit" />
              </button>
            </router-link>
            <button @click="deleteProduct(row.isim)" class="btn btn-light">
              <img src="@/assets/icons/trash.svg" alt="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Card class="align-items-center p-5" v-else>
    Bu ürün maalesef mevcut değil.
  </Card>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card";
export default {
  name: "Table",
  components: {
    Card,
  },
  props: {
    headers: Array,
    rows: Array,
  },
  methods: {
    deleteProduct(name) {
      if (confirm("Ürünü silmek istiyor musunuz?")) {
        axios
          .post("/api/deleteProduct", {
            productName: name,
          })
          .then((response) => {
            console.log(response);
            this.$router.go("");
          })
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        return;
      }
    },
    addClassToRow(row) {
      return [{ "bg-danger text-light": row.stokMiktari < row.olmasiGereken }];
    },
  },
};
</script>
