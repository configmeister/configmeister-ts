import {ICreateUser, IUser}                         from '../../../../common/types/user.types';
import {Errorable}                                  from '../../../../common/types/common.types';
import axios                                        from 'axios';
import {API_ENDPOINT, API_VERSION, USER_API_PREFIX} from '../../../../common/endpoints';

async function post<T>(url: string, body: {}): Promise<Errorable<T>> {
	try {
		const res = await axios.post(`${API_ENDPOINT}${API_VERSION}${USER_API_PREFIX}/${url}`, body);
		return res.data;
	} catch (e) {
		return {
			error:   true,
			message: e.message,
		};
	}
}

export class UserApi {
	public static async CreateNew(user: ICreateUser): Promise<Errorable<IUser>> {
		return post<IUser>('create-user', user);
	}
}