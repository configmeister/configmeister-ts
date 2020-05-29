import {IConfiguration, ICreateConfiguration} from '../../../common/types/config.types';
import {Errorable, IError}                    from '../../../common/types/common.types';
import {ConfigurationModel}                   from '../models/configuration.model';
import {VersionController}                    from './version.controller';
import {IVersion}                             from '../../../common/types/version.types';

export class ConfigurationController {
	public static async CreateNew(configuration: ICreateConfiguration): Promise<Errorable<IConfiguration>> {
		try {
			const version = await VersionController.CreateNew(configuration.version);
			if ((version as IError).error) {
				return version as IError;
			}
			return await ConfigurationModel.create({
				name:     configuration.name,
				versions: [(version as IVersion)._id],
			});
		} catch (e) {
			return {
				error:   true,
				message: e.message,
			};
		}
	}
}