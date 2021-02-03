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
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(cell, index) in row" :key="index">
            {{ cell }}
          </td>
          <td><slot /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <Card class="align-items-center p-5" v-else>
    Bu kategoriye kayıtlı bir ürün yoktur.
  </Card>
</template>

<script>
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
};
</script>
