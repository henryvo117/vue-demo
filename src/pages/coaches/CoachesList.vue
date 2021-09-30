<template>
	<div>
		<base-dialog :show='!!error' title='An error occurred!' @close='handleError'>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<coach-filter @change-filter='setFilters'></coach-filter>
		</section>
		<base-card>
			<section>
				<div class='controls'>
					<base-button mode='outline' @click='loadCoaches(true)'>Refresh</base-button>
					<base-button link to='/auth?redirect=register' v-if='!isLoggedIn'>Login to register as coach</base-button>
					<base-button link to='/register' v-if='!isCoach && !isLoading && isLoggedIn'>Register as a coach</base-button>
				</div>
				<div v-if='isLoading'>
					<base-spinner></base-spinner>
				</div>
				<ul v-else-if='hasCoaches'>
					<coach-item
						v-for='coach in filteredCoaches'
						:key='coach'
						:id='coach.id'
						:first-name='coach.firstName'
						:last-name='coach.lastName'
						:rate='coach.hourlyRate'
						:areas='coach.areas'
					>
					</coach-item>
				</ul>
				<h3 v-else>No coaches found.</h3>
			</section>
		</base-card>
	</div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem'
import BaseCard from '@/components/ui/BaseCard'
import BaseButton from '@/components/ui/BaseButton'
import CoachFilter from '@/components/coaches/CoachFilter'
import BaseSpinner from '@/components/ui/BaseSpinner'
import BaseDialog from '@/components/ui/BaseDialog'

export default {
	name: 'CoachesList',
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				backend: true,
				frontend: true,
				career: true
			}
		}
	},
	components: {
		BaseDialog,
		BaseSpinner,
		CoachFilter,
		BaseButton,
		BaseCard, CoachItem
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		isCoach() {
			return this.$store.getters['coaches/isCoach']
		},
		filteredCoaches() {
			const coaches = this.$store.getters['coaches/getCoaches']
			return coaches.filter(coach => {
				if (this.activeFilters.backend && coach.areas.includes('backend'))
					return true
				if (this.activeFilters.frontend && coach.areas.includes('frontend'))
					return true
				if (this.activeFilters.career && coach.areas.includes('career'))
					return true
				return false
			})
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters['coaches/hasCoaches']
		}
	},
	created() {
		this.loadCoaches()
	},
	methods: {
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters
		},
		handleError() {
			this.error = null
		},
		async loadCoaches(refresh = false) {
			this.isLoading = true
			try {
				await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh })
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
			this.isLoading = false
		}
	}
}
</script>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
}
</style>