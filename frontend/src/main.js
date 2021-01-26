import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import Vuelidate from "vuelidate";

import "bootstrap/dist/css/bootstrap.css";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
