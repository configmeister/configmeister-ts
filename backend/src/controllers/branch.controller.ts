import {BranchModel}            from '../models/branch.model';
import {IBranch, ICreateBranch} from '../../../common/types/branch.types';
import {Errorable}              from '../../../common/types/common.types';
import {logger}                 from '../index';

export class BranchController {
	public static async CreateNew() {

	}

	public static async CreateMany(branches: ICreateBranch[]): Promise<Errorable<IBranch[]>> {
		try {
			return BranchModel.create(branches);
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}
}