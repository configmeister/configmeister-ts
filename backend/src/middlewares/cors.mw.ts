import {app} from '../server';
import cors  from 'cors';

export async function InitCorsMiddleware() {
	app.use(cors());
}