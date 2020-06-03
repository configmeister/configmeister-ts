// @ts-ignore
import {Document} from 'mongoose';

export interface IBranch extends Document {
	_id: string;
	name: string;
}

export interface IBranchFull {
	_id: IBranch['_id'];
	name: IBranch['name'];
}

export interface ICreateBranch {
	name: IBranch['name'];
}