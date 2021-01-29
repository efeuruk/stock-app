const state = {
	loading: false
}

const getters = {

}

const actions = {
	show({commit}) {
		commit("show");  
	}
}

const mutations = {
	show(state) {
		state.loading = true;
	},
	hide(state) {
		state.loading = false;
	}
}

export default { state, getters, actions, mutations }