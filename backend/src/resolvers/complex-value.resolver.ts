// import {ICreateComplex}    from '../../../common/data-types';
// import {ComplexValueModel} from '../models/complex-value.model';
// import {v1 as uuid}        from 'uuid';
//
// export class ComplexValueResolver {
// 	public static async CreateNew(value: ICreateComplex) {
// 		return ComplexValueModel.create({
// 			id:                 uuid(),
// 			key:                value.key,
// 			type:               value.type,
// 			complexValueRootId: value.complexValueRootId ? value.complexValueRootId : null,
// 			branchRootId:       value.branchRootId ? value.branchRootId : null,
// 		});
// 	}
// }