import Vue from "vue";
import Router from "vue-router";

import store from '../store';

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import AddCategory from "@/pages/AddCategory";
import AddProduct from "@/pages/AddProduct";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/add-category",
      name: "AddCategory",
      component: AddCategory,
    },
    {
      path: "/add-product",
      name: "AddProduct",
      component: AddProduct,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !store.getters.isLoggedIn) next({name: 'Login'})
  else next();
})

export default router;