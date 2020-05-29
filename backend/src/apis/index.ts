import {InitUserApi}          from './user.api';
import {InitConfigurationApi} from './configuration.api';

export async function InitAPI() {
	await InitUserApi();
	await InitConfigurationApi();
}