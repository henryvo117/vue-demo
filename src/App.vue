<template>
	<the-header></the-header>
	<router-view v-slot='slotProps'>
		<transition name='route'>
			<component :is='slotProps.Component' mode='out-in'></component>
		</transition>
	</router-view>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader'

export default {
	name: 'App',
	components: { TheHeader },
	computed: {
		didAutoLogout() {
			return this.$store.getters.autoLogout
		}
	},
	watch: {
		didAutoLogout(current, old) {
			if (current && current !== old) {
				this.$router.replace('/coaches')
			}
		}
	},
	created() {
		this.$store.dispatch('tryLogin')
	}
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
	box-sizing: border-box;
}

html {
	font-family: "Roboto", sans-serif;
}

body {
	margin: 0;
}

.route-enter-from {
	opacity: 0;
	transform: translateY(-30px);
}

.route-leave-to {
	opacity: 0;
	transform: translateY(30px);
}

.route-enter-to,
.route-leave-from {
	opacity: 1;
	transform: translateY(0);
}

.route-enter-active {
	transition: all 0.4s ease-out;
}

.route-leave-active {
	transition: all 0.4s ease-in;
}

</style>