<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Anasayfa</router-link>
    <button class="navbar-toggler" @click="toggleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" :class="addClass">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/add-category"
            >Kategori Ekle</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/add-product"
            >Ürün Ekle</router-link
          >
        </li>
        <li class="nav-item">
          <button class="btn btn-danger" @click="logout">Çıkış yap</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    toggleNavbar() {
      this.show = !this.show;
    },
  },
  computed: {
    addClass() {
      return [{ "fade show": this.show }];
    },
  },
};
</script>

<style>
.router-link-exact-active.router-link-active {
  color: #fff !important;
}
</style>
