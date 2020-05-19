import {AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {BranchModel}                                                     from './branch.model';
import {ConfigurationModel}                                   from './configuration.model';

@Table({tableName: 'versions'})
export class VersionModel extends Model<VersionModel> {
	@AllowNull(false)
	@Column
	label: string;

	@AllowNull(false)
	@ForeignKey(() => ConfigurationModel)
	@Column
	configurationRootId: number;

	@HasMany(() => BranchModel)
	branches: BranchModel[];

	@BelongsTo(() => ConfigurationModel)
	configurationRoot: ConfigurationModel;
}