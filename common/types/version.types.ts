// @ts-ignore
import {Document}                            from 'mongoose';
import {IBranch, IBranchFull, ICreateBranch} from './branch.types';

export interface IVersion extends Document {
	_id: string;
	name: string;
	branches?: IBranch['_id'][],
}

export interface IVersionFull {
	_id: IVersion['_id'];
	name: IVersion['name'];
	branches: IBranchFull[];
}

export interface ICreateVersion extends Document {
	name: IVersion['name'];
	branches?: ICreateBranch[]
}
