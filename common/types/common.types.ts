export enum ERoles {
	admin      = 'admin',
	maintainer = 'maintainer'
}

export interface IError {
	error: boolean;
	message: string;
	code?: number;
}

export type Errorable<T> = T | IError;
