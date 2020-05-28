export interface ICommonError {
	error: boolean,
	message: string,
	code?: ERROR
}

export type Errorable<T> = T | ICommonError;

export enum ERROR {
	CONFIGURATION_NAME_NOT_UNIQUE,
	UNKNOWN_NODE_TYPE
}