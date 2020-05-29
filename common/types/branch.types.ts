import {Document} from 'mongoose';

export interface IBranch extends Document {
	name: string;
}

export interface ICreateBranch {
	name: IBranch['name'];
}