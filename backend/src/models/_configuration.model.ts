// import {AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique} from 'sequelize-typescript';
// import {VersionModel}                                                           from './version.model';
//
// @Table({tableName: 'configurations'})
// export class ConfigurationModel extends Model<ConfigurationModel> {
// 	@PrimaryKey
// 	@Column(DataType.UUID)
// 	id;
//
// 	@AllowNull(false)
// 	@Unique
// 	@Column
// 	name: string;
//
// 	@HasMany(() => VersionModel)
// 	versions: VersionModel[];
// }