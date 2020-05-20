import {app}                                                 from '../server';
import {API_ENDPOINT, API_VERSION, CONFIGURATION_API_PREFIX} from '../../../common/endpoints';
import {ConfigurationResolver}                               from '../resolvers/configuration.resolver';

export async function InitConfigurationApi() {
	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/create-new`, async (req, res) => {
		const result = await ConfigurationResolver.CreateNew(req.body);
		res.json(result);
	});
}