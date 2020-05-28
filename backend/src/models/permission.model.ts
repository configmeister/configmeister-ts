import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {UserModel}                                                            from './user.model';
import {UserPermissionsModel}                                                 from './user-permissions.model';

@Table({tableName: 'permissions'})
export class PermissionModel extends Model<PermissionModel> {
	@PrimaryKey
	@Column(DataType.UUID)
	id;

	@AllowNull(false)
	@Column
	label: string;

	@BelongsToMany(() => UserModel, () => UserPermissionsModel)
	users: UserModel[];
}