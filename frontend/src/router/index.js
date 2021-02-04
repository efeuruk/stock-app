import Vue from "vue";
import Router from "vue-router";

import store from '../store';

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import AddCategory from "@/pages/AddCategory";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";

Vue.use(Router);

const doesntRequiresAuth = {
  meta: {
    requiresAuth: false,
  },
};

const requiresAuth = {
  meta: {
    requiresAuth: true,
  },
};

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      ...doesntRequiresAuth
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      ...requiresAuth
    },
    {
      path: "/add-category",
      name: "AddCategory",
      component: AddCategory,
      ...requiresAuth
    },
    {
      path: "/add-product",
      name: "AddProduct",
      component: AddProduct,
      ...requiresAuth
    },
    {
      path: "/edit-product/:id",
      name: "EditProduct",
      component: EditProduct,
      ...requiresAuth
    }
  ],
});

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !store.getters.isLoggedIn) next({name: 'Login'})
  else next();
})

export default router;