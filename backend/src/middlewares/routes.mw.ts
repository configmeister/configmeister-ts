import {app}                   from '../server';
import {join}                  from 'path';
import {UserResolver}          from '../resolvers/user.resolver';
import {ConfigurationResolver} from '../resolvers/configuration.resolver';

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
}, {
	path:            '/logout',
	customResolvers: [
		async (req, res) => {
			delete req.session.user;
			await req.session.save();
			res.redirect('/login');
		},
	],
}, {
	path:     '/create-configuration',
	needAuth: true,
}, {
	path:            '/configuration/:id',
	needAuth:        true,
	customResolvers: [
		async (req, res, next) => {
			const isConfigValid = await ConfigurationResolver.DoConfigExists(parseInt(req.params.id));
			if (isConfigValid) {
				return next();
			}
			res.status(404);
			next();
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