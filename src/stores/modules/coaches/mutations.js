export default {
	registerCoach(state, payload) {
		//FIXME
		console.log(state.coaches)
		state.coaches.push(payload)
	},
	setCoaches(state, payload) {
		state.coaches = payload
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime()
	}
}
