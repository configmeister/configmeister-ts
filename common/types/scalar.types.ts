export enum EScalarType {
	STRING  = 'string',
	NUMBER  = 'number',
	BOOLEAN = 'boolean'
}

export interface IScalarFull {
	type: EScalarType,
}