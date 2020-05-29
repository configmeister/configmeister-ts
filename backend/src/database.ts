import mongoose from 'mongoose';

export const ConnectMongo = async (db: string) => {
	const connect = async () => {
		try {
			await mongoose.connect(db, {useNewUrlParser: true});
			console.log(`Connected to ${db}`);
		} catch (e) {
			console.error(e);
		}
		mongoose.connection.on('disconnected', connect);
	};
	await connect();
};