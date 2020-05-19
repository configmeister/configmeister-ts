import {program}             from 'commander';
import {InitModels}          from './models';
import {InitServer}          from './server';
import {ELoggerMode, Logger} from './utils/logger';
import config                from '../../config.backend.json';
import {InitAPI}             from './apis';

program.option('--prod', 'Production mode');
program.option('--dev', 'Development mode');
program.parse(process.argv);

export const DEVELOPMENT = program.dev || false;
export const PRODUCTION = program.prod || false;

export const logger = new Logger({mode: DEVELOPMENT ? ELoggerMode.DEVELOPMENT : ELoggerMode.PRODUCTION});

(async () => {
	await InitModels();
	await InitServer();
	await InitAPI();
	logger.log(`Server listening on http://localhost:${config.server.port} or ${config.server.host}:${config.server.port}`);
})();