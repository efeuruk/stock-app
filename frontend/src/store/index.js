import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import auth from './modules/auth';
import loader from './modules/loader'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  modules: { auth, loader }
});