<template>
	<div>
		<section>
			<base-card>
				<h2>{{ fullName }}</h2>
				<h3>${{ rate }}/hour</h3>
			</base-card>
		</section>
		<section>
			<base-card>
				<header>
					<h2>Interested? Reach out now!</h2>
					<base-button link :to='contactLink'>Contact</base-button>
				</header>
			</base-card>
		</section>
		<base-card>
			<base-badge v-for='area in areas' :type='area' :key='area' :title='area'></base-badge>
			<p>{{ description }}</p>
		</base-card>
		<router-view></router-view>
	</div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BaseCard from '@/components/ui/BaseCard'
import BaseBadge from '@/components/ui/BaseBadge'

export default {
	name: 'CoachDetail',
	components: { BaseCard, BaseButton, BaseBadge },
	props: ['id'],
	data() {
		return {
			selectedCoach: null
		}
	},
	computed: {
		fullName() {
			return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
		},
		contactLink() {
			return this.$route.path + '/contact'
		},
		rate() {
			return this.selectedCoach.hourlyRate
		},
		areas() {
			return this.selectedCoach.areas
		},
		description() {
			return this.selectedCoach.description
		}

	},
	created() {
		this.selectedCoach =
			this.$store.getters['coaches/getCoaches'].find(coach => coach.id === this.id)
	}
}
</script>

<style scoped>

</style>