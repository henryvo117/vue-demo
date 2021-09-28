import { createStore } from 'vuex'
import coachesModule from '@/stores/modules/coaches'
import requestsModule from '@/stores/modules/requests'

const store = createStore({
	modules: {
		coaches: coachesModule,
		requests: requestsModule
	}
})

export default store