import {ICreateBranch} from '../../../common/data-types';
import {BranchModel}   from '../models/branch.model';

export class BranchResolver {
	public static async CreateNew(props: ICreateBranch) {
		return BranchModel.create({
			name:      props.name,
			versionId: props.versionId,
		});
	}

	public static async Destroy(id: number) {
		// @todo remove my scalars and complexes
		await BranchModel.destroy({
			where: {
				id,
			},
		});
	}
}