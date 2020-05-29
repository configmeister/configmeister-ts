// import {AllowNull, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
// import {MixinModel}                                                        from './mixin.model';
// import {BranchModel}                                                       from './branch.model';
// import {ComplexValueModel}                                                 from './complex-value.model';
//
// @Table({tableName: 'mixin_roots'})
// export class MixinRootsModel extends Model<MixinRootsModel> {
// 	@PrimaryKey
// 	@Column(DataType.UUID)
// 	id;
//
// 	@AllowNull(false)
// 	@ForeignKey(() => MixinModel)
// 	@Column(DataType.UUID)
// 	mixinId;
//
// 	@ForeignKey(() => BranchModel)
// 	@Column(DataType.UUID)
// 	branchId;
//
// 	@ForeignKey(() => ComplexValueModel)
// 	@Column(DataType.UUID)
// 	complexValueId;
// }