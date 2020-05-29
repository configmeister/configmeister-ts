import {Document}                 from 'mongoose';
import {ICreateVersion, IVersion} from './version.types';

export interface IConfiguration extends Document {
	name: string;
	updatedAt: Date;
	versions?: IVersion['_id'][];
}

export interface ICreateConfiguration {
	name: IConfiguration['name'];
	version: ICreateVersion
}