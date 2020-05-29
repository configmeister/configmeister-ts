import {ICreateUser, IUser, IUserState} from '../../../../common/types/user.types';
import {Errorable}                      from '../../../../common/types/common.types';
import {USER_API_PREFIX}                from '../../../../common/endpoints';
import {createMethods}                  from '@/utils/api/methods';

const {post, get} = createMethods(USER_API_PREFIX);


export class UserApi {
	public static async CreateNew(user: ICreateUser): Promise<Errorable<IUser>> {
		return post<IUser>('create-user', user);
	}

	public static async GetSalt(username: IUser['username']): Promise<Errorable<string>> {
		return post<string>('get-salt', {username});
	}

	public static async Login(username: IUser['username'], password: IUser['password']): Promise<Errorable<IUserState>> {
		return post<IUserState>('login', {
			username,
			password,
		});
	}

	public static async FetchUserData(): Promise<Errorable<IUserState>> {
		return get<IUserState>('fetch');
	}
}