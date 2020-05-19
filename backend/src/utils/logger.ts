import moment from 'moment';

export enum ELoggerMode {
	DEVELOPMENT,
	PRODUCTION
}

export interface ILoggerProps {
	mode: ELoggerMode
}

export class Logger {
	private readonly mode: number;

	constructor(props: ILoggerProps) {
		this.mode = props.mode;
	}

	log(message) {
		switch (this.mode) {
			case ELoggerMode.DEVELOPMENT:
				console.log(`${moment().format('HH:mm:ss')}# ${message}`);
		}
	}

	error(message) {
		switch (this.mode) {
			case ELoggerMode.DEVELOPMENT:
				console.error(`${moment().format('HH:mm:ss')}# ${message}`);
		}

	}
}