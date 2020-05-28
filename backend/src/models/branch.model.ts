import {AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {ScalarValueModel}                                                                                     from './scalar-value.model';
import {ComplexValueModel}                                                                                    from './complex-value.model';
import {VersionModel}                                                                                         from './version.model';
import {MixinModel}                                                                                           from './mixin.model';
import {MixinRootsModel}                                                                                      from './mixin-roots.model';

@Table({tableName: 'branches'})
export class BranchModel extends Model<BranchModel> {
	@PrimaryKey
	@Column(DataType.UUID)
	id;

	@AllowNull(false)
	@Column
	name: string;

	@AllowNull(false)
	@ForeignKey(() => VersionModel)
	@Column(DataType.UUID)
	versionId;

	@HasMany(() => ScalarValueModel)
	scalarValues: ScalarValueModel[];

	@HasMany(() => ComplexValueModel)
	complexValues: ComplexValueModel[];

	@BelongsTo(() => VersionModel)
	versionRoot: VersionModel;

	@BelongsToMany(() => MixinModel, () => MixinRootsModel)
	mixins: MixinModel[];
}