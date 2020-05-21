import {ConfigurationModel}               from '../models/configuration.model';
import {VersionModel}                     from '../models/version.model';
import {BranchModel}                      from '../models/branch.model';
import {logger}                           from '../index';
import {ERROR}                            from '../../../common/errors';
import {ConfigCard, ICreateConfiguration} from '../../../common/data-types';
import {Op}                               from 'sequelize';
import {VersionResolver}                  from './version.resolver';

export class ConfigurationResolver {
	public static async Destroy(id: number): Promise<boolean> {
		const versionIds = (await ConfigurationModel.findOne({
			where:   {
				id,
			},
			include: [{model: VersionModel, attributes: ['id']}],
		})).versions.map(el => el.id);
		const promises = versionIds.map(id => VersionResolver.Destroy(id));
		await Promise.all(promises);
		await ConfigurationModel.destroy({
			where: {
				id,
			},
		});
		return true;
	}

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

	public static async GetByIds(ids): Promise<ConfigCard[] | { error: boolean, message: string }> {
		try {
			const res = await ConfigurationModel.findAll({
				attributes: ['id', 'name', 'updatedAt'],
				where:      {
					id: {
						[Op.in]: ids,
					},
				},
			});
			return res.map(el => {
				return {
					id:        el.id,
					name:      el.name,
					updatedAt: el.updatedAt,
				};
			});

		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async GetAll(): Promise<ConfigCard[] | { error: boolean, message: string }> {
		try {
			const res = await ConfigurationModel.findAll({
				attributes: ['id', 'name', 'updatedAt'],
			});
			return res.map(el => {
				return {
					id:        el.id,
					name:      el.name,
					updatedAt: el.updatedAt,
				};
			});

		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async CreateNew(config: ICreateConfiguration): Promise<{ id: number } | { error: boolean, message: string, code?: ERROR }> {
		try {
			const createdConfiguration = await ConfigurationModel.create({
				name: config.name,
			});
			const createdVersion = await VersionResolver.CreateNew({
				label:               config.version,
				configurationRootId: createdConfiguration.id,
			});

			await VersionResolver.AddBranches(createdVersion.id, config.branches);

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