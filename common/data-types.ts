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
	id: string;
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
	versionId: string
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
	id?: string,
	name?: string,
	type?: EScalarType | EComplexType,
	value?: any,
	nodeType: NODE_TYPE,
	children?: INode[],
}

export interface ScalarValue {
	id: string,
	key: string,
	type: EScalarType,
	nodeType: NODE_TYPE,
	value: any,
}

export interface Branch {
	id: string;
	name: string;
	scalarValues: ScalarValue[]
}

export interface Version {
	id: string;
	label: string;
	branches: Branch[];
}

export interface Configuration {
	id: string;
	name: string;
	updatedAt: Date;
	versions: Version[];
}
