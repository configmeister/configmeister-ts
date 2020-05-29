import session      from 'express-session';
import {app}        from '../server';
import config       from '../../../config.backend.json';
import ConnectMongo from 'connect-mongo';
import mongoose     from 'mongoose';

export async function InitSessionMiddleware() {
	const MongoStore = ConnectMongo(session);

	app.use(session({
		secret:            config.session.secret,
		store:             new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
		saveUninitialized: false,
		resave:            true,
		cookie:            {
			maxAge: 100 * 60 * 60 * 24 * 7,
		},
	}));
}