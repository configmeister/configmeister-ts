import {UserModel}            from '../models/user.model';
import {PermissionModel}      from '../models/permission.model';
import {Roles}                from '../../../common/roles';
import {ICreateUser}          from '../../../common/data-types';
import {logger}               from '../index';
import {UserPermissionsModel} from '../models/user-permissions.model';
import {PermissionResolver}   from './permission.resolver';

export class UserResolver {

	public static async HasAdminUser() {
		const res = await UserModel.count({
			include: [
				{
					model: PermissionModel,
					where: {
						label: Roles.admin,
					},
				},
			],
		});
		return res !== 0;
	}

	public static async CreateNewUser(data: ICreateUser): Promise<boolean> {
		try {
			const user = await UserModel.create({
				username: data.username,
				password: data.password,
				salt:     data.salt,
			});

			for (let i = 0; i < data.roles.length; i++) {
				await UserPermissionsModel.create({
					userId:       user.id,
					permissionId: PermissionResolver.permissionsMap[data.roles[i]],
				});
			}
			return true;
		} catch (e) {
			logger.error(e.message);
			return false;
		}
	}


	public static async GetUserSalt(username: string) {
		try {
			const user = await UserModel.findOne({
				where: {
					username,
				},
			});
			return user.salt;
		} catch (e) {
			logger.error(e.message);
			return false;
		}
	}

	public static async LoginUser(username: string, password: string) {
		try {
			const user = await UserModel.findOne({
				include: [{
					model: PermissionModel,
				}],
				where:   {
					username,
					password,
				},
			});
			return user;
		} catch (e) {
			logger.error(e.message);
			return false;
		}
	}
}