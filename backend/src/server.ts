import express           from 'express';
import config            from '../../config.backend.json';
import {InitMiddlewares} from './middlewares';

export const app = express();

export const InitServer = async () => {

	await InitMiddlewares();

	return new Promise(resolve => {
		app.listen(config.server.port, config.server.host, resolve);
	});
};