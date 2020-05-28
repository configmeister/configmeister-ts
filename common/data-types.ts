import {Roles} from './roles';

export interface ICreateUser {
	username: string;
	password: string;
	roles: Roles[];
	salt: string;
}

export interface ICreateScalar {
	key: string;
	type: string;
	value: string;
	complexValueRootId?: number;
	branchRootId?: number;
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

export enum EScalarType {
	BOOLEAN = 'boolean',
	STRING  = 'string',
	NUMBER  = 'number',
}

export enum EComplexType {
	ARRAY  = 'array',
	OBJECT = 'object'
}

export enum NODE_TYPE {
	ROOT    = 'root',
	SCALAR  = 'scalar',
	COMPLEX = 'complex'
}

export interface INode {
	id?: number,
	name?: string,
	type?: EScalarType | EComplexType,
	value?: any,
	nodeType: NODE_TYPE,
	children?: INode[],
}

export interface ScalarValue {
	id: number,
	key: string,
	type: EScalarType,
	nodeType: NODE_TYPE,
	value: any,
}

export interface Branch {
	id: number;
	name: string;
	scalarValues: ScalarValue[]
}

export interface Version {
	id: number;
	label: string;
	branches: Branch[];
}

export interface Configuration {
	id: number;
	name: string;
	updatedAt: Date;
	versions: Version[];
}
