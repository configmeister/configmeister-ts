import Vue                      from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Main                     from '../views/Main/Main.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [{
	path:      '/',
	name:      'main',
	component: Main,
}, {
	path:      '/login',
	name:      'login',
	component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue'),
}, {
	path:      '/setup',
	name:      'setup',
	component: () => import(/* webpackChunkName: "about" */ '../views/Setup/Setup.vue'),
}];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
