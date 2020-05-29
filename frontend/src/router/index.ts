import Vue                      from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Main                     from '../views/Main/Main.vue';
import {ROOTS}                  from '@/utils/roots';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [{
	path:      ROOTS.MAIN,
	name:      'main',
	component: Main,
}, {
	path:      ROOTS.LOGIN,
	name:      'login',
	component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login.vue'),
}, {
	path:      ROOTS.SETUP,
	name:      'setup',
	component: () => import(/* webpackChunkName: "setup" */ '../views/Setup/Setup.vue'),
}, {
	path:      ROOTS.CREATE_CONFIGURATION,
	name:      'create-configuration',
	component: () => import(/* webpackChunkName: "createConfiguration" */ '../views/CreateConfiguration/CreateConfiguration.vue'),
},
// {
// 	path:      `${ROOTS.CONFIGURATION}:id`,
// 	name:      'configuration',
// 	component: () => import(/* webpackChunkName: "configuration" */ '../views/Configuration/Configuration.vue'),
// }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
