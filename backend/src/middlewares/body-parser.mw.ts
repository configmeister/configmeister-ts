import {app}      from '../server';
import bodyParser from 'body-parser';

export async function InitBodyParserMiddleware() {
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
}