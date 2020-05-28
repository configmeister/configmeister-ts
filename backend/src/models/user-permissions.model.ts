import {AllowNull, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {UserModel}                                                         from './user.model';
import {PermissionModel}                                                   from './permission.model';

@Table({tableName: 'user_roles'})
export class UserPermissionsModel extends Model<UserPermissionsModel> {
	@PrimaryKey
	@Column(DataType.UUID)
	id;

	@AllowNull(false)
	@ForeignKey(() => UserModel)
	@Column(DataType.UUID)
	userId;

	@AllowNull(false)
	@ForeignKey(() => PermissionModel)
	@Column(DataType.UUID)
	permissionId;
}