import {IConfiguration, IConfigurationFull} from '../../../../common/types/config.types';
import moment                               from 'moment';
import {CurrentLocation}                    from '@/utils/lang';
import {IVersion, IVersionFull}             from '../../../../common/types/version.types';

export class ConfigurationWrapper {
	private raw: IConfigurationFull | undefined;
	public currentVersion: IVersionFull | undefined;

	constructor() {
	}

	updateRaw(data: IConfigurationFull) {
		this.raw = data;
		this.currentVersion = this.raw.versions[0];
	}

	get id() {
		return this.raw?._id;
	}

	get name() {
		return this.raw?.name;
	}

	get lastUpdate() {
		return moment(this.raw?.updatedAt);
	}

	get lastUpdateHuminized() {
		return this.lastUpdate.format(CurrentLocation().timeFormat);
	}

}