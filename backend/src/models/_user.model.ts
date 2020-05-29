// import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
// import {PermissionModel}                                                      from './permission.model';
// import {UserPermissionsModel}                                                 from './user-permissions.model';
//
// @Table({tableName: 'users'})
// export class UserModel extends Model<UserModel> {
// 	@PrimaryKey
// 	@Column(DataType.UUID)
// 	id;
//
// 	@AllowNull(false)
// 	@Column
// 	username: string;
//
// 	@AllowNull(false)
// 	@Column
// 	password: string;
//
// 	@AllowNull(false)
// 	@Column
// 	salt: string;
//
// 	@BelongsToMany(() => PermissionModel, () => UserPermissionsModel)
// 	roles: PermissionModel[];
// }
