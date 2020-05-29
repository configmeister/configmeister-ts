import {ERoles}   from './common.types';
import {Document} from 'mongoose';

export interface IUser extends Document {
	username: string;
	password: string;
	salt: string;
	roles: ERoles[]
}

export interface ICreateUser {
	username: IUser['username'];
	password: IUser['password'];
	salt: IUser['salt'];
	roles?: IUser['roles'];
}