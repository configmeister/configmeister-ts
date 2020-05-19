import {AllowNull, Column, HasMany, Model, Table} from 'sequelize-typescript';
import {VersionModel}                             from './version.model';

@Table({tableName: 'configurations'})
export class ConfigurationModel extends Model<ConfigurationModel> {
	@AllowNull(false)
	@Column
	name: string;

	@HasMany(() => VersionModel)
	versions: VersionModel[];
}