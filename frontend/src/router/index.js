import Vue from "vue";
import Router from "vue-router";

import store from '../store';

import Login from "@/pages/Login";
import Home from "@/pages/Home";

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
  ],
});

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !store.getters.isLoggedIn) next({name: 'Login'})
  else next();
})

export default router;