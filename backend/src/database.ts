import {Sequelize} from 'sequelize-typescript';
import config      from '../../config.backend.json';

export const sequelize = new Sequelize({
	database: config.db.dbName,
	dialect:  'postgres',
	username: config.db.dbUser,
	password: config.db.dbPassword,
	host:     config.db.dbHost,
	port:     config.db.dbPort,
});