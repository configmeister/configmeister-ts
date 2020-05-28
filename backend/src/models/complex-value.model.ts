import {AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {ScalarValueModel}                                                                                             from './scalar-value.model';
import {BranchModel}                                                                                                  from './branch.model';
import {MixinModel}                                                                                                   from './mixin.model';
import {MixinRootsModel}                                                                                              from './mixin-roots.model';
import {OverrideModel}                                                                                                from './override.model';

@Table({tableName: 'complex_values'})
export class ComplexValueModel extends Model<ComplexValueModel> {
	@PrimaryKey
	@Column(DataType.UUID)
	id;

	@AllowNull(false)
	@Column
	key: string;

	@AllowNull(false)
	@Column
	type: string;

	@ForeignKey(() => ComplexValueModel)
	@Column(DataType.UUID)
	complexValueRootId;

	@ForeignKey(() => BranchModel)
	@Column(DataType.UUID)
	branchRootId;

	@HasMany(() => ScalarValueModel)
	scalarValues: ScalarValueModel[];

	@HasMany(() => ComplexValueModel)
	complexValues: ComplexValueModel[];

	@HasOne(() => OverrideModel)
	overrideRoot: OverrideModel;

	@HasOne(() => MixinModel)
	mixinRoot: MixinModel;

	@BelongsTo(() => ComplexValueModel)
	complexValueRoot: ComplexValueModel;

	@BelongsTo(() => BranchModel)
	branchRoot: BranchModel;

	@BelongsToMany(() => MixinModel, () => MixinRootsModel)
	mixins: MixinModel[];

}