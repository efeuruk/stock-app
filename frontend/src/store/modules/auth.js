import router from '../../router';
import axios from 'axios';

const state = {
	accessToken: window.localStorage.getItem('access_token'),
}

const getters = {
	isLoggedIn: state => !!state.accessToken
}

const actions = {
	finalizeLogin({ commit }, uid) {
		commit('setToken', uid);
		window.localStorage.setItem('access_token', uid);
		router.push('/');
	},
	async logout ({ commit }) {
    commit('setToken', null);
		window.localStorage.removeItem('access_token');
		await axios.post("/api/auth/signout");
		router.push('/login');
  }
}

const mutations = {
	setToken(state, accessToken) {
		state.accessToken = accessToken;
	}
}

export default { state, getters, actions, mutations }