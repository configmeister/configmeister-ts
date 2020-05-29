// import {AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
// import {ComplexValueModel}                                                                           from './complex-value.model';
// import {BranchModel}                                                                                 from './branch.model';
// import {MixinRootsModel}                                                                             from './mixin-roots.model';
//
// @Table({tableName: 'mixins'})
// export class MixinModel extends Model<MixinModel> {
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
//
// 	@BelongsToMany(() => BranchModel, () => MixinRootsModel)
// 	rootBranches: BranchModel[];
//
// 	@BelongsToMany(() => ComplexValueModel, () => MixinRootsModel)
// 	rootComplexValues: ComplexValueModel[];
// }