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
