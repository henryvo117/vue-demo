import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '@/pages/coaches/CoachesList'
import CoachDetail from '@/pages/coaches/CoachDetail'
import ContactCoach from '@/pages/requests/ContactCoach'
import CoachRegistration from '@/pages/coaches/CoachRegistration'
import RequestsReceive from '@/pages/requests/RequestsReceive'
import NotFound from '@/pages/NotFound'
import UserAuth from '@/pages/auth/UserAuth'
import store from '@/stores'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/coaches' },
		{ path: '/coaches', component: CoachesList },
		{
			path: '/coaches/:id',
			component: CoachDetail,
			props: true,
			children: [
				{ path: 'contact', component: ContactCoach }
			]
		},
		{ path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
		{ path: '/requests', component: RequestsReceive, meta: { requiresAuth: true } },
		{ path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
		{ path: '/:notFound(.*)', component: NotFound }
	]
})

router.beforeEach((to, _, next) => {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/auth')
	} else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
		console.log('arrive here')
		next('/coaches')
	} else
		next()
})
export default router