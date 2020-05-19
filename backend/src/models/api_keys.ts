import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'api_keys'})
export class ApiKeysModel extends Model<ApiKeysModel> {
	@Column
	key: string;

	@Column
	expirationDate: Date;
}