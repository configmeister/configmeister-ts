import {AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {ComplexValueModel}                                                            from './complex-value.model';
import {BranchModel}                                                                  from './branch.model';

@Table({tableName: 'scalar_values'})
export class ScalarValueModel extends Model<ScalarValueModel> {
	@PrimaryKey
	@Column(DataType.UUID)
	id;

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
	@Column(DataType.UUID)
	complexValueRootId;

	@ForeignKey(() => BranchModel)
	@Column(DataType.UUID)
	branchRootId;

	@BelongsTo(() => ComplexValueModel)
	complexValueRoot: ComplexValueModel;

	@BelongsTo(() => BranchModel)
	branchRoot: BranchModel;
}