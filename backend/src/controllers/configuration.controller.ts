import {IConfiguration, ICreateConfiguration} from '../../../common/types/config.types';
import {Errorable, IError, IPagination}       from '../../../common/types/common.types';
import {ConfigurationModel}                   from '../models/configuration.model';
import {VersionController}                    from './version.controller';
import {IVersion}                             from '../../../common/types/version.types';
import {logger}                               from '../index';

export class ConfigurationController {
	public static async GetById(id: string): Promise<Errorable<IConfiguration>> {
		try {
			return ConfigurationModel.findById(id);
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async DeleteById(id: string): Promise<Errorable<boolean>> {
		try {
			const config = (await ConfigurationController.GetById(id)) as IConfiguration;
			if (config.versions.length) {
				const proms = config.versions.map(el => VersionController.DeleteById(el));
				await Promise.all(proms);
			}
			await ConfigurationModel.findByIdAndDelete(config._id);
			return true;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async GetAll(pagination: IPagination = {}): Promise<Errorable<IConfiguration[]>> {
		try {
			let {limit, offset} = pagination;
			if (!limit) {
				limit = 0;
			}
			if (!offset) {
				offset = 0;
			}
			return ConfigurationModel.find();
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

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