import {Document}               from 'mongoose';
import {IBranch, ICreateBranch} from './branch.types';

export interface IVersion extends Document {
	_id: string;
	name: string;
	branches?: IBranch['_id'][],
}

export interface ICreateVersion extends Document {
	name: IVersion['name'];
	branches?: ICreateBranch[]
}
