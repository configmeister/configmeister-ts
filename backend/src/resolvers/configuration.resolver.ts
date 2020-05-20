import {ConfigurationModel} from '../models/configuration.model';
import {VersionModel}       from '../models/version.model';
import {BranchModel}        from '../models/branch.model';
import {logger}             from '../index';
import {ERROR}              from '../../../common/errors';

export class ConfigurationResolver {
	public static async DoConfigExists(id: number): Promise<boolean> {
		try {
			return !!(await ConfigurationModel.findOne({
				where: {
					id,
				},
			}));
		} catch (e) {
			return false;
		}
	}

	public static async CreateNew(config: { name: string, version: string, branches: string[] }): Promise<{ id: number } | { error: boolean, message: string, code?: ERROR }> {
		try {
			const createdConfiguration = await ConfigurationModel.create({
				name: config.name,
			});
			const createdVersion = await VersionModel.create({
				label:               config.version,
				configurationRootId: createdConfiguration.id,
			});

			await BranchModel.bulkCreate(config.branches.map(branch => {
				return {
					name:      branch,
					versionId: createdVersion.id,
				};
			}));

			return {
				id: createdConfiguration.id,
			};
		} catch (e) {
			if (e.fields) {
				return {
					error:   true,
					message: `Field {name} must be unique`,
					code:    ERROR.CONFIGURATION_NAME_NOT_UNIQUE,
				};
			}
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}
}