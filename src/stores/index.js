import { createStore } from 'vuex'
import coachesModule from '@/stores/modules/coaches'
import requestsModule from '@/stores/modules/requests'
import authModule from '@/stores/modules/auth'

const store = createStore({
	modules: {
		coaches: coachesModule,
		requests: requestsModule,
		auth: authModule
	},

})

export default store