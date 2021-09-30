<template>
	<div>
		<base-dialog :show='!!error' title='An error occurred' @close='handleError'>
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog fixed :show='isLoading' title='Authenticating...'>
			<base-spinner></base-spinner>
		</base-dialog>
		<base-card>
			<form @submit.prevent='submitForm'>
				<div class='form-control'>
					<label for='email'>E-Mail</label>
					<input type='email' id='email' v-model='email' />
				</div>
				<p v-if='!formIsValid'>Please enter valid email and password (at least 6 character long)</p>
				<div class='form-control'>
					<label for='password'>Password</label>
					<input type='password' id='password' v-model='password' />
				</div>
				<base-button>{{ switchButtonCaption }}</base-button>
				<base-button type='button' mode='flat' @click='switchAuthMode'>{{ switchModeButtonCaption }}
				</base-button>
			</form>
		</base-card>
	</div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BaseCard from '@/components/ui/BaseCard'
import BaseDialog from '@/components/ui/BaseDialog'
import BaseSpinner from '@/components/ui/BaseSpinner'

export default {
	name: 'UserAuth',
	components: { BaseSpinner, BaseDialog, BaseButton, BaseCard },
	data() {
		return {
			email: '',
			password: '',
			formIsValid: true,
			isLoading: false,
			error: null,
			mode: 'login'
		}
	},
	computed: {
		switchButtonCaption() {
			return this.mode === 'login' ? 'Login' : 'Signup'
		},
		switchModeButtonCaption() {
			return this.mode === 'login' ? 'Signup Instead' : 'Login Instead'
		}
	},
	methods: {
		handleError() {
			this.error = null
		},

		validateForm() {
			return !(this.email === ''
				|| !this.email.includes('@')
				|| !this.password.length > 6)
		},

		async submitForm() {
			if (!this.validateForm())
				return
			console.log(this.mode)
			const userInfo = {
				email: this.email,
				password: this.password
			}
			await this.signUpOrLogin(userInfo)
		},

		async signUpOrLogin(userInfo) {
			this.isLoading = true
			try {
				await this.$store.dispatch(this.mode, userInfo)
				const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
				await this.$router.replace(redirectUrl)
			} catch (error) {
				this.error = error.message || 'Failed to authenticate, try later.'
			}
			this.isLoading = false
		},

		switchAuthMode() {
			this.mode = this.mode === 'login' ? 'signup' : 'login'
		}
	}
}
</script>

<style scoped>
form {
	margin: 1rem;
	border: transparent;
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
</style>