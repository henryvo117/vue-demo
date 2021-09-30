import mutations from '@/stores/modules/auth/mutations'
import actions from '@/stores/modules/auth/actions'
import getters from '@/stores/modules/auth/getters'

require('dotenv').config()

const authModule = {
	state() {
		return {
			userId: null,
			token: null,
			apiKey: process.env.VUE_APP_API_KEY,
			autoLogout: false
		}
	},
	mutations: mutations,
	actions: actions,
	getters: getters
}

export default authModule