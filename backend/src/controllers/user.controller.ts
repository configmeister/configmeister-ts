import {ICreateUser, IUser, IUserState} from '../../../common/types/user.types';
import {ERoles, Errorable}              from '../../../common/types/common.types';
import {logger}                         from '../index';
import {UserModel}                      from '../models/user.model';

export class UserController {
	public static async HasAdminUser(): Promise<Errorable<boolean>> {
		try {
			const userCount = await UserModel.count({
				roles: ERoles.admin,
			});
			return userCount !== 0;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async GetUser(id: IUser['_id']): Promise<Errorable<IUser>> {
		return UserModel.findById(id);
	}

	public static EmptyUserState(): IUserState {
		return {
			_id:      '',
			loggedIn: false,
			roles:    [],
			username: '',
		};
	}

	public static async LoginUser(username: IUser['username'], password: IUser['password']): Promise<Errorable<IUser>> {
		try {
			return UserModel.findOne({
				username,
				password,
			});
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async GetSalt(username: IUser['username']): Promise<Errorable<string>> {
		try {
			const user = await UserModel.findOne({
				username,
			});
			return user.salt;
		} catch (e) {
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static UserToUserState(user: IUser, loggedIn: boolean): IUserState {
		return {
			_id:      user._id,
			username: user.username,
			loggedIn: loggedIn,
			roles:    user.roles,
		};
	}

	public static async CreateUser(user: ICreateUser): Promise<Errorable<IUser>> {
		try {
			return UserModel.create({
				username: user.username,
				password: user.password,
				salt:     user.salt,
				roles:    user.roles ? user.roles : [],
			});
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}
}