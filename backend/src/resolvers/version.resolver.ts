import {VersionModel}   from '../models/version.model';
import {ICreateVersion} from '../../../common/data-types';
import {BranchResolver} from './branch.resolver';
import {BranchModel}    from '../models/branch.model';
import {v1 as uuid}     from 'uuid';

export class VersionResolver {
	public static async CreateNew(props: ICreateVersion) {
		return VersionModel.create({
			id:                  uuid(),
			label:               props.label,
			configurationRootId: props.configurationRootId,
		});
	}

	public static async AddBranches(versionId: string, branches: string[]) {
		const promises = branches.map(br => {
			return BranchResolver.CreateNew({
				name: br,
				versionId,
			});
		});
		await Promise.all(promises);
	}


	public static async Destroy(id: string) {
		const branchIds = (await VersionModel.findOne({
			where:   {
				id,
			},
			include: [{model: BranchModel, attributes: ['id']}],
		})).branches.map(el => el.id);
		const promises = branchIds.map(id => BranchResolver.Destroy(id));
		await Promise.all(promises);
		await VersionModel.destroy({
			where: {
				id,
			},
		});
	}
}