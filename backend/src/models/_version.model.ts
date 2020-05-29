// import {AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
// import {BranchModel}                                                                           from './branch.model';
// import {ConfigurationModel}                                                                    from './configuration.model';
//
// @Table({tableName: 'versions'})
// export class VersionModel extends Model<VersionModel> {
// 	@PrimaryKey
// 	@Column(DataType.UUID)
// 	id;
//
// 	@AllowNull(false)
// 	@Column
// 	label: string;
//
// 	@AllowNull(false)
// 	@ForeignKey(() => ConfigurationModel)
// 	@Column(DataType.UUID)
// 	configurationRootId;
//
// 	@HasMany(() => BranchModel)
// 	branches: BranchModel[];
//
// 	@BelongsTo(() => ConfigurationModel)
// 	configurationRoot: ConfigurationModel;
// }