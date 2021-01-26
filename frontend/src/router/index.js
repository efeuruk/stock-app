import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

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

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      ...doesntRequiresAuth,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      ...requiresAuth,
    },
  ],
});
