import {AllowNull, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {MixinModel}                                  from './mixin.model';
import {BranchModel}                                 from './branch.model';
import {ComplexValueModel}                           from './complex-value.model';

@Table({tableName: 'mixin_roots'})
export class MixinRootsModel extends Model<MixinRootsModel> {
	@AllowNull(false)
	@ForeignKey(() => MixinModel)
	@Column
	mixinId: number;

	@ForeignKey(() => BranchModel)
	@Column
	branchId: number;

	@ForeignKey(() => ComplexValueModel)
	@Column
	complexValueId: number;
}