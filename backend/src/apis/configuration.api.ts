// import {app}                                                 from '../server';
// import {API_ENDPOINT, API_VERSION, CONFIGURATION_API_PREFIX} from '../../../common/endpoints';
// import {ConfigurationResolver} from '../resolvers/configuration.resolver';
// import {ConfigCard, NODE_TYPE} from '../../../common/data-types';
// import {BranchResolver}        from '../resolvers/branch.resolver';
//
// export async function InitConfigurationApi() {
// 	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/create-new`, async (req, res) => {
// 		const result = await ConfigurationResolver.CreateNew(req.body);
// 		res.json(result);
// 	});
//
// 	app.get(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/fetch-all`, async (req, res) => {
// 		const result: { recent?: ConfigCard[] | { error: boolean, message: string }, list: ConfigCard[] | { error: boolean, message: string } } = {
// 			list: [],
// 		};
// 		if (req.session.user?.recentConfigurations) {
// 			result.recent = await ConfigurationResolver.GetByIds(req.session.user.recentConfigurations);
// 		}
// 		result.list = await ConfigurationResolver.GetAll();
// 		res.json(result);
// 	});
//
// 	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/delete-configuration`, async (req, res) => {
// 		const result = await ConfigurationResolver.Destroy(req.body.id);
// 		return res.json(result);
// 	});
//
// 	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/get-full`, async (req, res) => {
// 		const result = await ConfigurationResolver.GetFull(req.body.id);
// 		return res.json(result);
// 	});
//
// 	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/validate-value-to-be-added`, async (req, res) => {
// 		let target = req.body.target;
// 		let result;
// 		switch (target.nodeType) {
// 			case NODE_TYPE.ROOT:
// 				result = await BranchResolver.ValidateValue(target, req.body.node);
// 				break;
// 			default:
// 				result = {
// 					error:   true,
// 					message: 'Unknown target',
// 				};
// 		}
// 		res.json(result);
// 	});
//
// 	app.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/add-value`, async (req, res) => {
// 		let target = req.body.target;
// 		let result;
// 		switch (target.nodeType) {
// 			case NODE_TYPE.ROOT:
// 				result = await BranchResolver.AddValue(target, req.body.node);
// 				break;
// 			default:
// 				result = {
// 					error:   true,
// 					message: 'Unknown target',
// 				};
// 		}
// 		res.json(result);
// 	});
// }