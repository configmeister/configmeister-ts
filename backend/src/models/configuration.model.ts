import mongoose, {Schema} from 'mongoose';
import {IConfiguration}   from '../../../common/types/config.types';
import {IVersion}         from '../../../common/types/version.types';

export const ConfigurationSchema: Schema = new Schema<IConfiguration>({
	name:      {
		type:     String,
		required: true,
		unique:   true,
	},
	updatedAt: {
		type:    Date,
		default: new Date(),
	},
	versions:  {
		type:    Array,
		default: [],
	},
});
export const ConfigurationModel = mongoose.model<IConfiguration>('configurations', ConfigurationSchema);
