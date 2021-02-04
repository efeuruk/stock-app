<template>
  <div>Edit Product</div>
</template>

<script>
export default {
  name: "EditProduct",
  methods: {
    getProduct() {
      const productId = +this.$route.params.id;
      console.log(productId);
    },
  },
};
</script>

<style></style>
