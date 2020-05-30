// @ts-ignore
import {Document}                 from 'mongoose';
import {ICreateVersion, IVersion} from './version.types';

export interface IConfiguration extends Document {
	_id: string;
	name: string;
	updatedAt: Date;
	versions?: IVersion['_id'][];
}

export interface ICreateConfiguration {
	name: IConfiguration['name'];
	version: ICreateVersion
}

export interface IConfigurationsState {
	recent: IConfiguration[];
	list: IConfiguration[];
	current: IConfiguration | null;
}