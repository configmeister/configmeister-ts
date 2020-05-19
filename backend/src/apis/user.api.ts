import {app}                                        from '../server';
import {UserResolver}                               from '../resolvers/user.resolver';
import {API_ENDPOINT, API_VERSION, USER_API_PREFIX} from '../../../common/endpoints';
import {nop}                                        from '../utils/funcs';


export async function InitUserAPI() {
	app.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/create`, async (req, res) => {
		const result = await UserResolver.CreateNewUser(req.body);
		res.json(result);
	});

	app.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/get-salt`, async (req, res) => {
		const result = await UserResolver.GetUserSalt(req.body.username);
		res.json(result);
	});

	app.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/login-user`, async (req, res) => {
		const user = await UserResolver.LoginUser(req.body.username, req.body.password);
		if (!user) {
			res.json(false);
			return;
		}
		req.session.user = {
			id:       user.id,
			username: user.username,
			roles:    user.roles.map(el => el.label),
			loggedIn: true,
		};
		await req.session.save(nop);
		res.json(req.session.user);
	});
}