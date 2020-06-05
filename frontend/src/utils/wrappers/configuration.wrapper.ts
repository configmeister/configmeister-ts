import {IConfiguration, IConfigurationFull} from '../../../../common/types/config.types';
import moment                               from 'moment';
import {CurrentLocation}                    from '@/utils/lang';
import {IVersion, IVersionFull}             from '../../../../common/types/version.types';
import {IBranchFull}                        from '../../../../common/types/branch.types';
import {EventEmitter}                       from 'events';
import {ITreeviewNode}                      from '../../../../common/types/common.types';

export enum ConfigurationWrapperEvents {
	CURRENT_VALUE_CHANGED = 'current-value-changed',
}

export class ConfigurationWrapper extends EventEmitter {

	public raw: IConfigurationFull | undefined;
	public currentVersion: IVersionFull | undefined;
	public currentBranch: IBranchFull | undefined;
	public _currentValue: any;

	constructor() {
		super();
	}

	updateRaw(data: IConfigurationFull) {
		this.raw = data;
		this.currentVersion = this.raw.versions[0];
		this.currentBranch = this.currentVersion.branches[0];
		this._currentValue = null;
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

	get currenValue() {
		return this._currentValue;
	}

	set currentValue(value: ITreeviewNode) {
		this._currentValue = value;
		this.emit(ConfigurationWrapperEvents.CURRENT_VALUE_CHANGED);
	}
}