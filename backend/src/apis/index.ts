import {InitUserAPI} from './user.api';

export async function InitAPI() {
	await InitUserAPI();
}