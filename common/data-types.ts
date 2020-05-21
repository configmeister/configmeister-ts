import {Roles} from './roles';

export interface ICreateUser {
	username: string;
	password: string;
	roles: Roles[];
	salt: string;
}

export interface ConfigCard {
	id: number;
	name: string;
	updatedAt: Date;
}

export interface ICreateConfiguration {
	name: string;
	version: string;
	branches: string[];
}

export interface ICreateVersion {
	label: string;
	configurationRootId: number;
}

export interface ICreateBranch {
	name: string,
	versionId: number
}