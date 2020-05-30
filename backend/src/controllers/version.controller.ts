import {ICreateVersion, IVersion} from '../../../common/types/version.types';
import {Errorable, IError}        from '../../../common/types/common.types';
import {VersionModel}             from '../models/version.model';
import {BranchController}         from './branch.controller';
import {logger}                   from '../index';
import {IBranch}                  from '../../../common/types/branch.types';

export class VersionController {
	public static async GetById(id: string): Promise<Errorable<IVersion>> {
		try {
			return VersionModel.findById(id);
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
			const version = (await VersionController.GetById(id)) as IVersion;
			if (version.branches.length) {
				const proms = version.branches.map(el => BranchController.DeleteById(el));
				await Promise.all(proms);
			}
			await VersionModel.findByIdAndDelete(version._id);
			return true;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	public static async CreateNew(version: ICreateVersion): Promise<Errorable<IVersion>> {
		try {
			const branches = await BranchController.CreateMany(version.branches);
			if ((branches as IError).error) {
				return branches as IError;
			}
			const vers = await VersionModel.create({
				name:     version.name,
				branches: (branches as IBranch[]).map(el => el._id),
			});
			return vers;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}
}