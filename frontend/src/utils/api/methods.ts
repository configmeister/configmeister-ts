import {Errorable}                 from '../../../../common/types/common.types';
import axios                       from 'axios';
import {API_ENDPOINT, API_VERSION} from '../../../../common/endpoints';

export function createMethods(prefix: string) {
	return {
		post: async <T>(url: string, body: {}): Promise<Errorable<T>> => {
			try {
				const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${prefix}/${url}`, body);
				return res.data;
			} catch (e) {
				return {
					error:   true,
					message: e.message,
				};
			}
		},
		get:  async <T>(url: string, queryParams: {} = {}): Promise<Errorable<T>> => {
			try {
				const res = await axios.get(`${API_ENDPOINT}${API_VERSION}${prefix}/${url}`, {
					params: queryParams,
				});
				return res.data;
			} catch (e) {
				return {
					error:   true,
					message: e.message,
				};
			}
		},
	};
}