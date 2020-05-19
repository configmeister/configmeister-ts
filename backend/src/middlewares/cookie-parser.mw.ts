import {app}        from '../server';
import cookieParser from 'cookie-parser';
import config       from '../../../config.backend.json';

export async function InitCookieParserMiddleware() {
	app.use(cookieParser(config.session.secret));
}