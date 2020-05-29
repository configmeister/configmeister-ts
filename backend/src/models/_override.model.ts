// import {AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
// import {ComplexValueModel}                                                            from './complex-value.model';
//
// @Table({tableName: 'overrides'})
// export class OverrideModel extends Model<OverrideModel> {
// 	@PrimaryKey
// 	@Column(DataType.UUID)
// 	id;
//
// 	@AllowNull(false)
// 	@Column
// 	name: string;
//
// 	@AllowNull(false)
// 	@ForeignKey(() => ComplexValueModel)
// 	@Column(DataType.UUID)
// 	complexValueId;
//
// 	@BelongsTo(() => ComplexValueModel)
// 	complexValue: ComplexValueModel;
// }