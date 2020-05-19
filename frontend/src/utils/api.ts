import {ICreateUser}                                from '../../../common/data-types';
import axios                                        from 'axios';
import {API_ENDPOINT, API_VERSION, USER_API_PREFIX} from '../../../common/endpoints';
import {logger}                                     from '@/utils/logger';

export type ApiAnswer = Promise<any | { error: boolean, message: string }>

export const API = {
	async createUser(user: ICreateUser): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/create`, {
				...user,
			});
			return res.data;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	},

	async getUserSalt(username: string): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/get-salt`, {
				username,
			});
			return res.data;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	},

	async loginUser(user: { username: string, password: string }): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/login-user`, {
				...user,
			});
			return res.data;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	},
};