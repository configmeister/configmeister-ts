import {AllowNull, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {UserModel}                                   from './user.model';
import {PermissionModel}                             from './permission.model';

@Table({tableName: 'user_roles'})
export class UserPermissionsModel extends Model<UserPermissionsModel> {
	@AllowNull(false)
	@ForeignKey(() => UserModel)
	@Column
	userId: number;

	@AllowNull(false)
	@ForeignKey(() => PermissionModel)
	@Column
	permissionId: number;
}