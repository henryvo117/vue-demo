<template>
	<section>
		<coach-filter @change-filter='setFilters'></coach-filter>
	</section>
	<base-card>
		<section>
			<div class='controls'>
				<base-button mode='outline' @click='loadCoaches'>Refresh</base-button>
				<base-button link to='/register' v-if='!isCoach && !isLoading'>Register as a coach</base-button>
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
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem'
import BaseCard from '@/components/ui/BaseCard'
import BaseButton from '@/components/ui/BaseButton'
import CoachFilter from '@/components/coaches/CoachFilter'
import BaseSpinner from '@/components/ui/BaseSpinner'

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
		BaseSpinner,
		CoachFilter,
		BaseButton,
		BaseCard, CoachItem
	},
	computed: {
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
		async loadCoaches() {
			this.isLoading = true
			try {
				await this.$store.dispatch('coaches/loadCoaches')
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