<template>
	<form @submit.prevent='submitForm'>
		<div class='form-control'>
			<label for='email'>Your Email</label>
			<input type='email' id='email' v-model.trim='email.value'>
			<p v-if='!email.isValid'>Email needs to be valid.</p>
		</div>
		<div class='form-control'>
			<label for='message'>Message</label>
			<textarea rows='5' id='message' v-model.trim='message.value'></textarea>
			<p v-if='!message.isValid'>Message cannot be empty.</p>
		</div>
		<div class='actions'>
			<base-button>Send Message</base-button>
		</div>
		<p class='errors' v-if='!formIsValid'>Please validate the above fields.</p>
	</form>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'

export default {
	name: 'ContactCoach',
	components: { BaseButton },
	data() {
		return {
			email: {
				value: '',
				isValid: true
			},
			message: {
				value: '',
				isValid: true
			},
			formIsValid: true
		}
	},
	methods: {
		validateForm() {
			if (this.email.value === '' || !this.email.value.includes('@')) {
				this.email.isValid = false
				this.formIsValid = false
			}
			if (this.message.value === '') {
				this.message.isValid = false
				this.formIsValid = false
			}
		},
		submitForm() {
			this.formIsValid = true
			this.validateForm()
			if (!this.formIsValid)
				return
			this.$store.dispatch('requests/contactCoach', {
				email: this.email.value,
				message: this.message.value,
				coachId: this.$route.params.id
			})
			this.$router.replace('/coaches')
		}
	}
}
</script>

<style scoped>
form {
	margin: 1rem;
	border: 1px solid #ccc;
	border-radius: 12px;
	padding: 1rem;
}

.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}

input,
textarea {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;
}

input:focus,
textarea:focus {
	border-color: #3d008d;
	background-color: #faf6ff;
	outline: none;
}

.errors {
	font-weight: bold;
	color: red;
}

.actions {
	text-align: center;
}
</style>