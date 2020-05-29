// import {EScalarType, ICreateScalar} from '../../../common/data-types';
// import {ScalarValueModel}           from '../models/scalar-value.model';
// import {v1 as uuid}                 from 'uuid';
//
// export class ScalarValueResolver {
// 	public static async CreateNew(value: ICreateScalar) {
// 		switch (value.type) {
// 			case EScalarType.STRING:
// 				value.value = JSON.stringify(value.value);
// 				break;
// 			case EScalarType.BOOLEAN:
// 				value.value = JSON.stringify(value.value === 'true');
// 				break;
// 			case EScalarType.NUMBER:
// 				value.value = JSON.stringify(Number(value.value));
// 				break;
// 		}
// 		return ScalarValueModel.create({
// 			id:                 uuid(),
// 			key:                value.key,
// 			type:               value.type,
// 			value:              value.value,
// 			complexValueRootId: value.complexValueRootId ? value.complexValueRootId : null,
// 			branchRootId:       value.branchRootId ? value.branchRootId : null,
// 		});
// 	}
// }