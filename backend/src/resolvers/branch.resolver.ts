import {ICreateBranch, INode, NODE_TYPE} from '../../../common/data-types';
import {BranchModel}                     from '../models/branch.model';
import {ComplexValueModel}               from '../models/complex-value.model';
import {ScalarValueModel}                from '../models/scalar-value.model';
import {Errorable}                       from '../../../common/errors';
import {logger}                          from '../index';
import {ScalarValueResolver}             from './scalar-value.resolver';
import {v1 as uuid}                      from 'uuid';

export class BranchResolver {
	public static async CreateNew(props: ICreateBranch) {
		return BranchModel.create({
			id:        uuid(),
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

	public static async ValidateValue(target: INode, node: { nodeType: string, nodeKey: string, itemType: string, itemValue: any }): Promise<boolean> {
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

	private static async AddScalar(id: number, value: { key: string, type: string, value: any }): Promise<Errorable<boolean>> {
		try {
			await ScalarValueResolver.CreateNew({
				...value,
				branchRootId: id,
			});
			return true;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}

	private static async AddComplex(id: number, value: { key: string, type: string }): Promise<Errorable<boolean>> {
		return true;
	}

	public static async AddValue(target: INode,
	                             node: { nodeType: NODE_TYPE, nodeKey: string, itemType: string, itemValue: any }): Promise<Errorable<boolean>> {
		console.log(JSON.stringify(target, null, 4), JSON.stringify(node, null, 4));
		try {
			const branchId = target.id;
			switch (node.nodeType) {
				case NODE_TYPE.SCALAR:
					await BranchResolver.AddScalar(branchId, {
						key:   node.nodeKey,
						type:  node.itemType,
						value: node.itemValue,
					});
					break;
				case NODE_TYPE.COMPLEX:
					await BranchResolver.AddComplex(branchId, {
						key:  node.nodeKey,
						type: node.itemType,
					});
					break;
				default:
					return {
						error:   true,
						message: 'Unknown value type',
					};
			}
			return true;
		} catch (e) {
			logger.error(e.message);
			return {
				error:   true,
				message: e.message,
			};
		}
	}
}