import Vuex from 'vuex';
import Vue from 'vue';

import auth from './modules/auth';
import loader from './modules/loader'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, loader }
});