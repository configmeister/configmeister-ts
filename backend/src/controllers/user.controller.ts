import {ICreateUser, IUser} from '../../../common/types/user.types';
import {ERoles, Errorable}  from '../../../common/types/common.types';
import {logger}             from '../index';
import {UserModel}          from '../models/user.model';

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