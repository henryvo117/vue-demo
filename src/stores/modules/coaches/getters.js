export default {
	getCoaches(state) {
		return state.coaches
	},
	hasCoaches(state) {
		return state.coaches && state.coaches.length > 0
	},
	isCoach(state, getters, _2, rootGetters) {
		const userId = rootGetters.userId
		return state.coaches.some(coach => coach.id === userId)
	}
}
