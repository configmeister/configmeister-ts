import {ICreateUser}                                                          from '../../../common/data-types';
import axios                                                                  from 'axios';
import {API_ENDPOINT, API_VERSION, CONFIGURATION_API_PREFIX, USER_API_PREFIX} from '../../../common/endpoints';
import {logger}                                                               from '@/utils/logger';
import {INode}                                                                from '@/utils/store/config.store';

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

	async fetchUserData(): ApiAnswer {
		try {
			const res = await axios.get(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/fetch-data`);
			return res.data;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	},

	async fetchConfigurations(): ApiAnswer {
		try {
			const res = await axios.get(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/fetch-all`);
			return res.data;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	},

	async deleteConfiguration(id: number): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/delete-configuration`, {
				id,
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

	async createConfiguration({name, version, branches}: { name: string, version: string, branches: string[] }): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/create-new`, {
				name,
				version,
				branches,
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

	async getFullConfiguration(id: number): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/get-full`, {id});
			return res.data;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	},

	async validateValueToBeAdded(target: INode | undefined, nodeToAdd: { nodeType: string, nodeKey: string, itemType: string, itemValue?: string }): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/validate-value-to-be-added`, {
				target,
				node: {
					...nodeToAdd,
				},
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

	async addValue(target: INode | undefined, nodeToAdd: { nodeType: string, nodeKey: string, itemType: string, itemValue?: string }): ApiAnswer {
		try {
			const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${CONFIGURATION_API_PREFIX}/add-value`, {
				target,
				node: {
					...nodeToAdd,
				},
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