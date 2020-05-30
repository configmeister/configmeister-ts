import {BranchModel}            from '../models/branch.model';
import {IBranch, ICreateBranch} from '../../../common/types/branch.types';
import {Errorable}              from '../../../common/types/common.types';
import {logger}                 from '../index';

export class BranchController {
	public static async GetById(id: string): Promise<Errorable<IBranch>> {
		try {
			return BranchModel.findById(id);
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
			// @todo add deletion of its values
			const branch = (await BranchController.GetById(id)) as IBranch;
			await BranchModel.findByIdAndDelete(branch._id);
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async CreateNew(branch: ICreateBranch): Promise<Errorable<IBranch>> {
		try {
			return BranchModel.create(branch);
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
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