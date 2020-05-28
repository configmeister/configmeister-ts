import {PermissionModel} from '../models/permission.model';
import {Roles}           from '../../../common/roles';
import {v1 as uuid}      from 'uuid';

export class PermissionResolver {

	public static permissionsMap = {};

	private static async SetupMap() {
		const permissions = await PermissionModel.findAll();
		const roles = Object.values(Roles);
		for (let i = 0; i < roles.length; i++) {
			const roleLabel = roles[i];
			PermissionResolver.permissionsMap[roleLabel] = permissions.find(el => el.label === roleLabel).id;
		}
	}

	public static async SetupPermissions() {
		const isSetupNeeded = (await PermissionModel.count()) === 0;
		if (!isSetupNeeded) {
			await PermissionResolver.SetupMap();
			return;
		}

		const permissions = Object.values(Roles);
		for (let i = 0; i < permissions.length; i++) {
			await PermissionModel.create({
				id:    uuid(),
				label: permissions[i],
			});
		}

		await PermissionResolver.SetupMap();
	}

}