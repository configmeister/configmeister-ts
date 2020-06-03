export const nop = () => {};
export const mapAsync = async (target: Array<any>, callback: (value: any, index: number) => any) => {
	const res = [];
	for (let i = 0; i < target.length; i++) {
		res.push(await callback(target[i], i));
	}
	return res;
};