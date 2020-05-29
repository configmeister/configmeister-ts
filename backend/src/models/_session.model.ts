// import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
//
// @Table({tableName: 'sessions', timestamps: false})
// export class Session extends Model<Session> {
//
// 	@AllowNull(false)
// 	@PrimaryKey
// 	@Column
// 	sid: string;
//
// 	@AllowNull(false)
// 	@Column(DataType.JSON)
// 	sess;
//
// 	@AllowNull(false)
// 	@Column('TIMESTAMP')
// 	expire;
// }