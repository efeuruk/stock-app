<template>
  <div class="table-responsive">
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
</template>

<script>
export default {
  name: "Table",
  props: {
    headers: Array,
    rows: Array,
  },
};
</script>
