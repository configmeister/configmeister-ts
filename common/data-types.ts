import {Roles} from './roles';

export interface ICreateUser {
	username: string;
	password: string;
	roles: Roles[];
	salt: string;
}