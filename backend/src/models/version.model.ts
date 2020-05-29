import {Schema}   from 'mongoose';
import {IVersion} from '../../../common/types/version.types';
import mongoose   from 'mongoose';

export const VersionSchema: Schema = new Schema<IVersion>({
	name:     {
		type:     String,
		required: true,
	},
	branches: {
		type:    Array,
		default: [],
	},
});
export const VersionModel = mongoose.model<IVersion>('versions', VersionSchema);