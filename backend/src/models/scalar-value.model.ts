import {AllowNull, BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ComplexValueModel}                                      from './complex-value.model';
import {BranchModel}                                            from './branch.model';

@Table({tableName: 'scalar_values'})
export class ScalarValueModel extends Model<ScalarValueModel> {
	@AllowNull(false)
	@Column
	key: string;

	@AllowNull(false)
	@Column
	type: string;

	@AllowNull(false)
	@Column
	value: string;

	@ForeignKey(() => ComplexValueModel)
	@Column
	complexValueRootId: number;

	@ForeignKey(() => BranchModel)
	@Column
	branchRootId: number;

	@BelongsTo(() => ComplexValueModel)
	complexValueRoot: ComplexValueModel;

	@BelongsTo(() => BranchModel)
	branchRoot: BranchModel;
}