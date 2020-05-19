import {app}          from '../server';
import {join}         from 'path';
import {UserResolver} from '../resolvers/user.resolver';

export interface IRoute {
	path: string;
	needAuth?: boolean;
	redirect?: string;
	customResolvers?: ((req, res, next) => void)[];
}

export let HAS_ADMIN_USER = false;

const ROUTES: IRoute[] = [{
	path:     '/',
	needAuth: true,
}, {
	path: '/login',
}, {
	path:            '/setup',
	customResolvers: [
		(req, res, next) => {
			if (HAS_ADMIN_USER) {
				res.redirect('/');
			} else {
				next();
			}
		},
	],
}];


export async function InitRoutesMiddleware() {
	HAS_ADMIN_USER = await UserResolver.HasAdminUser();

	const authCheck = async (req, res, next) => {
		if (!req.session || !req.session.user || !req.session.user.loggedIn) {
			res.redirect('/login');
		} else {
			next();
		}
	};

	const sendHtml = (req, res) => {
		res.sendFile(join(__dirname, '../../../../dist/frontend/index.html'));
	};

	ROUTES.forEach(route => {
		let resolvers = [];
		if (route.customResolvers) {
			resolvers = [...resolvers, ...route.customResolvers];
		}
		if (route.needAuth) {
			resolvers.push(authCheck);
		}
		resolvers.push(sendHtml);
		app.get(route.path, resolvers);
	});
}