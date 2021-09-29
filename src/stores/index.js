import { createStore } from 'vuex'
import coachesModule from '@/stores/modules/coaches'
import requestsModule from '@/stores/modules/requests'

const store = createStore({
	modules: {
		coaches: coachesModule,
		requests: requestsModule
	},
	state() {
		return {
			userId: 'c3'
		}
	},
	getters: {
		userId(state) {
			return state.userId
		}
	}
})

export default store