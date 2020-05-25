import {ICreateBranch}     from '../../../common/data-types';
import {BranchModel}       from '../models/branch.model';
import {INode}             from '../../../frontend/src/utils/store/config.store';
import {ComplexValueModel} from '../models/complex-value.model';
import {ScalarValueModel}  from '../models/scalar-value.model';

export class BranchResolver {
	public static async CreateNew(props: ICreateBranch) {
		return BranchModel.create({
			name:      props.name,
			versionId: props.versionId,
		});
	}

	public static async Destroy(id: number) {
		// @todo remove my scalars and complexes
		await BranchModel.destroy({
			where: {
				id,
			},
		});
	}

	public static async ValidateValue(target: INode, node: { nodeType: string, nodeKey: string, itemType: string, itemValue: string }): Promise<boolean> {
		// @todo add mixin check
		let valueKeys = null;
		switch (node.nodeType) {
			case 'Complex':
				valueKeys = await BranchModel.findOne({
					where:      {
						id: target.id,
					},
					attributes: [],
					include:    [{model: ComplexValueModel, attributes: ['key']}],
				});
				valueKeys = valueKeys.complexValues.map(el => el.key);
				break;
			case 'Scalar':
				valueKeys = await BranchModel.findOne({
					where:      {
						id: target.id,
					},
					attributes: [],
					include:    [{model: ScalarValueModel, attributes: ['key']}],
				});
				valueKeys = valueKeys.scalarValues.map(el => el.key);
		}
		return valueKeys === null || valueKeys.indexOf(node.nodeKey) === -1;
	}

	public static async AddValue(target: INode, node: { nodeType: string, nodeKey: string, itemType: string, itemValue: string }): Promise<boolean> {
		return true;
	}
}