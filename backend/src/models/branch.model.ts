import {Schema}  from 'mongoose';
import {IBranch} from '../../../common/types/branch.types';
import mongoose  from 'mongoose';

export const BranchSchema: Schema = new Schema<IBranch>({
	name: {
		type:     String,
		required: true,
	},
});
export const BranchModel = mongoose.model<IBranch>('branches', BranchSchema);