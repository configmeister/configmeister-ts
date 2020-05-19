import {AllowNull, BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {PermissionModel}                                from './permission.model';
import {UserPermissionsModel}                           from './user-permissions.model';

@Table({tableName: 'users'})
export class UserModel extends Model<UserModel> {
	@AllowNull(false)
	@Column
	username: string;

	@AllowNull(false)
	@Column
	password: string;

	@AllowNull(false)
	@Column
	salt: string;

	@BelongsToMany(() => PermissionModel, () => UserPermissionsModel)
	roles: PermissionModel[];
}
