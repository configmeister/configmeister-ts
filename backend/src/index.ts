import {program}             from 'commander';
// import {InitModels}          from './models';
import {InitServer}          from './server';
import {ELoggerMode, Logger} from './utils/logger';
import config                from '../../config.backend.json';
import {InitAPI}             from './apis';
import {ConnectMongo}        from './database';
import {UserController}      from './controllers/user.controller';
import {ERoles}              from '../../common/types/common.types';

program.option('--prod', 'Production mode');
program.option('--dev', 'Development mode');
program.parse(process.argv);

export const DEVELOPMENT = program.dev || false;
export const PRODUCTION = program.prod || false;

export const logger = new Logger({mode: DEVELOPMENT ? ELoggerMode.DEVELOPMENT : ELoggerMode.PRODUCTION});

(async () => {
	await ConnectMongo(config.db.connectionString);
	await InitServer();
	await InitAPI();
	logger.log(`Server listening on http://localhost:${config.server.port} or ${config.server.host}:${config.server.port}`);
})();