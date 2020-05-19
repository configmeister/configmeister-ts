import {app}   from '../server';
import Express from 'express';
import {join}  from 'path';

export async function InitStaticMiddleware() {
	app.use(Express.static(join(__dirname, '../../../../dist/frontend')));
}