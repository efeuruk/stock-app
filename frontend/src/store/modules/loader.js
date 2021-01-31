const state = {
	refCount: 0,
	loading: false
}

const getters = {
	isLoading: (state) => state.loading,
	getRefCount: (state) => state.refCount
}

const mutations = {
	loading(state, loading) {
		console.log({loading});
		if (loading) {
			state.refCount++;
			state.loading = true;
		} else if (state.refCount > 0) {
			state.refCount--;
			state.loading = (state.refCount > 0);
		}
	}
}

export default { state, getters, mutations }