// import {app}                                        from '../server';
// import {UserResolver}                               from '../resolvers/user.resolver';
// import {API_ENDPOINT, API_VERSION, USER_API_PREFIX} from '../../../common/endpoints';
// import {nop}                                        from '../utils/funcs';
//
//
// export async function InitUserAPI() {
// 	app.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/create`, async (req, res) => {
// 		const result = await UserResolver.CreateNewUser(req.body);
// 		res.json(result);
// 	});
//
// 	app.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/get-salt`, async (req, res) => {
// 		const result = await UserResolver.GetUserSalt(req.body.username);
// 		res.json(result);
// 	});
//
// 	app.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/login-user`, async (req, res) => {
// 		const user = await UserResolver.LoginUser(req.body.username, req.body.password);
// 		if (!user) {
// 			res.json(false);
// 			return;
// 		}
// 		req.session.user = {
// 			id:       user.id,
// 			username: user.username,
// 			roles:    user.roles.map(el => el.label),
// 			loggedIn: true,
// 		};
// 		await req.session.save(nop);
// 		res.json(req.session.user);
// 	});
//
// 	app.get(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/fetch-data`, async (req, res) => {
// 		if (!req.session || !req.session.user || !req.session.user.loggedIn) {
// 			res.json({
// 				error:   true,
// 				message: 'user not authed',
// 			});
// 			return;
// 		}
// 		res.json(req.session.user);
// 	});
//
// }

import {API_ENDPOINT, API_VERSION, USER_API_PREFIX} from '../../../common/endpoints';
import {app}                                        from '../server';
import {UserController}                             from '../controllers/user.controller';
import {IError}                                     from '../../../common/types/common.types';
import {IUser}                                      from '../../../common/types/user.types';

const prefix = (url: string) => {
	return `${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/${url}`;
};

export async function InitUserApi() {
	app.post(prefix('create-user'), async (req, res) => {
		const result = await UserController.CreateUser(req.body);
		res.json(result);
	});

	app.post(prefix('get-salt'), async (req, res) => {
		const result = await UserController.GetSalt(req.body.username);
		res.json(result);
	});

	app.post(prefix('login'), async (req, res) => {
		const user = await UserController.LoginUser(req.body.username, req.body.password);
		if (!user || (user as IError).error) {
			res.json({
				error:   true,
				message: 'User does not exist',
			});
		}
		if (!req.session.user) {
			req.session.user = {};
		}
		const userState = UserController.UserToUserState((user as IUser), true);
		req.session.user._id = userState._id;
		req.session.user.username = userState.username;
		req.session.user.roles = userState.roles;
		req.session.user.loggedIn = userState.loggedIn;
		req.session.save(() => {
			res.json(userState);
		});
	});

	app.get(prefix('fetch'), async (req, res) => {
		if (!req.session || !req.session.user || !req.session.user.loggedIn) {
			res.json(UserController.EmptyUserState());
			return;
		}
		const id = req.session.user._id;
		const user = await UserController.GetUser(id);
		if (!user || (user as IError).error) {
			res.json(UserController.EmptyUserState());
			return;
		}
		res.json(UserController.UserToUserState((user as IUser), true));
	});
}