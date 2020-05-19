import {AllowNull, BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {UserModel}            from './user.model';
import {UserPermissionsModel} from './user-permissions.model';

@Table({tableName: 'permissions'})
export class PermissionModel extends Model<PermissionModel> {
	@AllowNull(false)
	@Column
	label: string;

	@BelongsToMany(() => UserModel, () => UserPermissionsModel)
	users: UserModel[];
}