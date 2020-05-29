// import {ConfigurationModel}                                                                             from '../models/configuration.model';
// import {VersionModel}                                                                                   from '../models/version.model';
// import {BranchModel}                                                                                    from '../models/branch.model';
// import {logger}                                                                                         from '../index';
// import {ERROR}                                                                                          from '../../../common/errors';
// import {ConfigCard, Configuration, EComplexType, EScalarType, ICreateConfiguration, NODE_TYPE, Version} from '../../../common/data-types';
// import {Op}                                                                                             from 'sequelize';
// import {VersionResolver}                                                                                from './version.resolver';
// import {ScalarValueModel}                                                                               from '../models/scalar-value.model';
// import {v1 as uuid}                                                                                     from 'uuid';
// import {ComplexValueModel}                                                                              from '../models/complex-value.model';
//
// export class ConfigurationResolver {
// 	public static async GetVersionsFull(id: string): Promise<Version[]> {
// 		const versions = (await ConfigurationModel.findOne({
// 			attributes: [],
// 			where:      {
// 				id,
// 			},
// 			include:    [{
// 				model:      VersionModel,
// 				attributes: ['id'],
// 			}],
// 		})).versions;
// 		const promises = versions.map(el => VersionResolver.GetFullSelf(el.id));
// 		return Promise.all(promises);
// 	}
//
// 	public static async GetFull(id: string): Promise<Configuration> {
// 		const res = await ConfigurationModel.findOne({
// 			where: {
// 				id,
// 			},
// 		});
// 		const config: Configuration = {
// 			id:        res.id,
// 			name:      res.name,
// 			updatedAt: res.updatedAt,
// 			versions:  await ConfigurationResolver.GetVersionsFull(res.id),
// 		};
// 		return config;
// 		return {
// 			id:        res.id,
// 			name:      res.name,
// 			updatedAt: res.updatedAt,
// 			versions:  res.versions.map(version => {
// 				return {
// 					id:       version.id,
// 					label:    version.label,
// 					branches: version.branches.map(branch => {
// 						return {
// 							id:            branch.id,
// 							name:          branch.name,
// 							scalarValues:  branch.scalarValues.map(scalar => {
// 								return {
// 									id:       scalar.id,
// 									key:      scalar.key,
// 									type:     scalar.type as EScalarType,
// 									value:    JSON.parse(scalar.value),
// 									nodeType: NODE_TYPE.SCALAR,
// 								};
// 							}),
// 							complexValues: branch.complexValues.map(complex => {
// 								return {
// 									id:            complex.id,
// 									key:           complex.key,
// 									type:          complex.type as EComplexType,
// 									nodeType:      NODE_TYPE.COMPLEX,
// 									scalarValues:  complex.scalarValues.map(scalar => {
// 										return {
// 											id:       scalar.id,
// 											key:      scalar.key,
// 											type:     scalar.type as EScalarType,
// 											value:    JSON.parse(scalar.value),
// 											nodeType: NODE_TYPE.SCALAR,
// 										};
// 									}),
// 									complexValues: await complex.getComplexValues,
// 								};
// 							}),
// 						};
// 					}),
// 				};
// 			}),
// 		};
// 	}
//
// 	public static async Destroy(id: string): Promise<boolean> {
// 		const versionIds = (await ConfigurationModel.findOne({
// 			where:   {
// 				id,
// 			},
// 			include: [{model: VersionModel, attributes: ['id']}],
// 		})).versions.map(el => el.id);
// 		const promises = versionIds.map(id => VersionResolver.Destroy(id));
// 		await Promise.all(promises);
// 		await ConfigurationModel.destroy({
// 			where: {
// 				id,
// 			},
// 		});
// 		return true;
// 	}
//
// 	public static async DoConfigExists(id: number): Promise<boolean> {
// 		try {
// 			return !!(await ConfigurationModel.findOne({
// 				where: {
// 					id,
// 				},
// 			}));
// 		} catch (e) {
// 			return false;
// 		}
// 	}
//
// 	public static async GetByIds(ids): Promise<ConfigCard[] | { error: boolean, message: string }> {
// 		try {
// 			const res = await ConfigurationModel.findAll({
// 				attributes: ['id', 'name', 'updatedAt'],
// 				where:      {
// 					id: {
// 						[Op.in]: ids,
// 					},
// 				},
// 			});
// 			return res.map(el => {
// 				return {
// 					id:        el.id,
// 					name:      el.name,
// 					updatedAt: el.updatedAt,
// 				};
// 			});
//
// 		} catch (e) {
// 			logger.error(e.message);
// 			return {
// 				error:   true,
// 				message: e.message,
// 			};
// 		}
// 	}
//
// 	public static async GetAll(): Promise<ConfigCard[] | { error: boolean, message: string }> {
// 		try {
// 			const res = await ConfigurationModel.findAll({
// 				attributes: ['id', 'name', 'updatedAt'],
// 			});
// 			return res.map(el => {
// 				return {
// 					id:        el.id,
// 					name:      el.name,
// 					updatedAt: el.updatedAt,
// 				};
// 			});
//
// 		} catch (e) {
// 			logger.error(e.message);
// 			return {
// 				error:   true,
// 				message: e.message,
// 			};
// 		}
// 	}
//
// 	public static async CreateNew(config: ICreateConfiguration): Promise<{ id: string } | { error: boolean, message: string, code?: ERROR }> {
// 		try {
// 			const createdConfiguration = await ConfigurationModel.create({
// 				id:   uuid(),
// 				name: config.name,
// 			});
// 			const createdVersion = await VersionResolver.CreateNew({
// 				label:               config.version,
// 				configurationRootId: createdConfiguration.id,
// 			});
//
// 			await VersionResolver.AddBranches(createdVersion.id, config.branches);
//
// 			return {
// 				id: createdConfiguration.id,
// 			};
// 		} catch (e) {
// 			if (e.fields) {
// 				return {
// 					error:   true,
// 					message: `Field {name} must be unique`,
// 					code:    ERROR.CONFIGURATION_NAME_NOT_UNIQUE,
// 				};
// 			}
// 			logger.error(e.message);
// 			return {
// 				error:   true,
// 				message: e.message,
// 			};
// 		}
// 	}
// }