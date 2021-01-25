<template>
  <form>
    <div class="mb-3 text-center">
      <img
        class="rounded"
        src="https://icon-library.com/images/inventory-icon/inventory-icon-8.jpg"
        width="200"
        alt="stock-image"
      />
    </div>
    <div class="mb-3">
      <label for="login-email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="login-email" />
    </div>
    <div class="mb-3">
      <label for="login-password" class="form-label">Password</label>
      <input type="password" class="form-control" id="login-password" />
    </div>
    <button type="submit" class="btn btn-block btn-dark">Submit</button>
  </form>
</template>

<script>
export default {
  name: "Form",
};
</script>

<style scoped>
form {
  padding: 0 20px;
  width: 500px;
}
</style>
