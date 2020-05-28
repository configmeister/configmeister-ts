import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({tableName: 'api_keys'})
export class ApiKeysModel extends Model<ApiKeysModel> {
	@PrimaryKey
	@Column(DataType.UUID)
	id;

	@Column
	key: string;

	@Column
	expirationDate: Date;
}