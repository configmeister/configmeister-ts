import {API_ENDPOINT, API_VERSION, CONFIGURATION_API_PREFIX} from '../../../common/endpoints';
import {app}                                                 from '../server';
import {ApiKeysModel}                                        from '../models/api_keys';

export async function InitAuthOrKeyMiddleware() {
	app.use(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}`, async (req, res, next) => {
		const user = req.session?.user?.loggedIn;
		if (user) {
			return next();
		}

		const key = req.body.apiKey;
		if (!key) {
			res.status(403).json({error: true, message: 'You do not have rights to access this API'});
			return;
		}

		// @todo encript/decrypt api key
		const isKeyValid = !!(await ApiKeysModel.findOne({
			where: {
				key,
			},
		}));
		if (isKeyValid) {
			return next();
		}

		res.status(403).json({error: true, message: 'You do not have rights to access this API'});
	});
}