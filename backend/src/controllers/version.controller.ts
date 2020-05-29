import {ICreateVersion, IVersion} from '../../../common/types/version.types';
import {Errorable, IError}        from '../../../common/types/common.types';
import {VersionModel}             from '../models/version.model';
import {BranchController}         from './branch.controller';
import {logger}                   from '../index';
import {IBranch}                  from '../../../common/types/branch.types';

export class VersionController {
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