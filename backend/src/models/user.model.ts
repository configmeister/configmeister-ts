import mongoose, {Schema} from 'mongoose';
import {IUser}            from '../../../common/types/user.types';


export const UserSchema: Schema = new Schema({
	username: {
		type:     String,
		required: true,
	},
	password: {
		type:     String,
		required: true,
	},
	salt:     {
		type:     String,
		required: true,
	},
	roles:    {
		type:     Array,
		required: true,
	},
});

export const UserModel = mongoose.model<IUser>('users', UserSchema);
