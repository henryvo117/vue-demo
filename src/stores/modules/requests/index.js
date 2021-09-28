import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const requestsModule = {
	namespaced: true,
	state() {},
	mutations: mutations,
	actions: actions,
	getters: getters

}

export default requestsModule