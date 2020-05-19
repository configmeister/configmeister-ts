import {AllowNull, BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ComplexValueModel}                                                     from './complex-value.model';
import {BranchModel}                                                           from './branch.model';
import {MixinRootsModel}                                                       from './mixin-roots.model';

@Table({tableName: 'mixins'})
export class MixinModel extends Model<MixinModel> {
	@AllowNull(false)
	@Column
	name: string;

	@AllowNull(false)
	@ForeignKey(() => ComplexValueModel)
	@Column
	complexValueId: number;

	@BelongsTo(() => ComplexValueModel)
	complexValue: ComplexValueModel;

	@BelongsToMany(() => BranchModel, () => MixinRootsModel)
	rootBranches: BranchModel[];

	@BelongsToMany(() => ComplexValueModel, () => MixinRootsModel)
	rootComplexValues: ComplexValueModel[];
}