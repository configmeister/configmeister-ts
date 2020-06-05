import {IBranchFull}                from './branch.types';
import {EScalarType, IScalarFull}   from './scalar.types';
import {EComplexType, IComplexFull} from './complex.types';

export enum ERoles {
	admin      = 'admin',
	maintainer = 'maintainer'
}

export interface IError {
	error: boolean;
	message: string;
	code?: number;
}

export interface IPagination {
	limit?: number;
	offset?: number;
}

export type Errorable<T> = T | IError;

export enum ITreeviewNodeType {
	BRANCH  = 'BRANCH',
	SCALAR  = 'SCALAR',
	COMPLEX = 'COMPLEX'
}

export interface ITreeviewNode {
	id: string;
	name: string;
	nodeType: ITreeviewNodeType;
	raw: IBranchFull | IScalarFull | IComplexFull;
	directParent: ITreeviewNode | null;
	children?: ITreeviewNode[];
}

export interface IAddNewValueVueModel {
	nodeName: string;
	nodeType: ITreeviewNodeType;
	valueType: EScalarType | EComplexType;
	value: string;
}
