import {InitSessionMiddleware}      from './session.mw';
import {InitRoutesMiddleware}       from './routes.mw';
import {InitStaticMiddleware}       from './static.mw';
import {InitCookieParserMiddleware} from './cookie-parser.mw';
import {InitBodyParserMiddleware}   from './body-parser.mw';
import {InitCorsMiddleware}         from './cors.mw';

export async function InitMiddlewares() {
	await InitCorsMiddleware();
	await InitBodyParserMiddleware();
	await InitCookieParserMiddleware();
	await InitSessionMiddleware();
	await InitRoutesMiddleware();
	await InitStaticMiddleware();
}