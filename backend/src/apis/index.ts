import {InitUserAPI}          from './user.api';
import {InitConfigurationApi} from './configuration.api';

export async function InitAPI() {
	await InitUserAPI();
	await InitConfigurationApi();
}