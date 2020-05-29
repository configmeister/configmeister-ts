// import {VersionModel}                    from '../models/version.model';
// import {Branch, ICreateVersion, Version} from '../../../common/data-types';
// import {BranchResolver}                  from './branch.resolver';
// import {BranchModel}                     from '../models/branch.model';
// import {v1 as uuid}                      from 'uuid';
//
// export class VersionResolver {
// 	public static async GetBranchesFull(id: string): Promise<Branch[]> {
// 		const branches = (await VersionModel.findOne({
// 			attributes: [],
// 			where:      {
// 				id,
// 			},
// 			include:    [{
// 				attributes: ['id'],
// 				model:      BranchModel,
// 			}],
// 		})).branches;
// 		const promises = branches.map(el => BranchResolver.GetFullSelf(el.id));
// 		return Promise.all(promises);
// 	}
//
// 	public static async GetFullSelf(id: string): Promise<Version> {
// 		const self = await VersionModel.findOne({
// 			where: {
// 				id,
// 			},
// 		});
//
// 		return {
// 			id:       self.id,
// 			label:    self.label,
// 			branches: await VersionResolver.GetBranchesFull(self.id),
// 		};
// 	}
//
// 	public static async CreateNew(props: ICreateVersion) {
// 		return VersionModel.create({
// 			id:                  uuid(),
// 			label:               props.label,
// 			configurationRootId: props.configurationRootId,
// 		});
// 	}
//
// 	public static async AddBranches(versionId: string, branches: string[]) {
// 		const promises = branches.map(br => {
// 			return BranchResolver.CreateNew({
// 				name: br,
// 				versionId,
// 			});
// 		});
// 		await Promise.all(promises);
// 	}
//
//
// 	public static async Destroy(id: string) {
// 		const branchIds = (await VersionModel.findOne({
// 			where:   {
// 				id,
// 			},
// 			include: [{model: BranchModel, attributes: ['id']}],
// 		})).branches.map(el => el.id);
// 		const promises = branchIds.map(id => BranchResolver.Destroy(id));
// 		await Promise.all(promises);
// 		await VersionModel.destroy({
// 			where: {
// 				id,
// 			},
// 		});
// 	}
// }