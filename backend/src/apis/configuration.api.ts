import {app}                                                 from '../server';
import {API_ENDPOINT, API_VERSION, CONFIGURATION_API_PREFIX} from '../../../common/endpoints';
import {ConfigurationResolver}                               from '../resolvers/configuration.resolver';
import {ConfigCard}                                          from '../../../common/data-types';

export async function InitConfigurationApi() {
	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/create-new`, async (req, res) => {
		const result = await ConfigurationResolver.CreateNew(req.body);
		res.json(result);
	});

	app.get(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/fetch-all`, async (req, res) => {
		const result: { recent?: ConfigCard[] | { error: boolean, message: string }, list: ConfigCard[] | { error: boolean, message: string } } = {
			list: [],
		};
		if (req.session.user?.recentConfigurations) {
			result.recent = await ConfigurationResolver.GetByIds(req.session.user.recentConfigurations);
		}
		result.list = await ConfigurationResolver.GetAll();
		res.json(result);
	});

	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/delete-configuration`, async (req, res) => {
		const result = await ConfigurationResolver.Destroy(req.body.id);
		return res.json(result);
	});

	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/get-full`, async (req, res) => {
		const result = await ConfigurationResolver.GetFull(req.body.id);
		return res.json(result);
	});
}