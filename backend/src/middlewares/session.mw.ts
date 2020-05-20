import session              from 'express-session';
import {app}                from '../server';
import config               from '../../../config.backend.json';
import ConnectPgSimpleConst from 'connect-pg-simple';

export async function InitSessionMiddleware() {
	const ConnectPgSimple = ConnectPgSimpleConst(session);

	app.use(session({
		secret:            config.session.secret,
		store:             new ConnectPgSimple({
			tableName: 'sessions',
			conObject: {
				user:     config.db.dbUser,
				host:     config.db.dbHost,
				port:     config.db.dbPort,
				database: config.db.dbName,
				password: config.db.dbPassword,
			},
		}),
		saveUninitialized: false,
		resave:            true,
		cookie:            {
			maxAge: 100 * 60 * 60 * 24 * 7,
		},
	}));
}