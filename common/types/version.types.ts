import {Document}               from 'mongoose';
import {IBranch, ICreateBranch} from './branch.types';

export interface IVersion extends Document {
	name: string;
	branches?: IBranch['_id'][],
}

export interface ICreateVersion extends Document {
	name: IVersion['name'];
	branches?: ICreateBranch[]
}
