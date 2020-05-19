import {AllowNull, BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ComplexValueModel}                                      from './complex-value.model';

@Table({tableName: 'overrides'})
export class OverrideModel extends Model<OverrideModel> {
	@AllowNull(false)
	@Column
	name: string;

	@AllowNull(false)
	@ForeignKey(() => ComplexValueModel)
	@Column
	complexValueId: number;

	@BelongsTo(() => ComplexValueModel)
	complexValue: ComplexValueModel;
}