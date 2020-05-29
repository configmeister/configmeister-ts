import {ERoles}   from './common.types';
// @ts-ignore
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

export interface IUserState {
	_id: Document['_id'],
	username: IUser['username'],
	roles: IUser['roles'],
	loggedIn: boolean
}
