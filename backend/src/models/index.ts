import {sequelize}            from '../database';
import {UserModel}            from './user.model';
import {DEVELOPMENT}          from '../index';
import {Session}              from './session.model';
import {PermissionModel}      from './permission.model';
import {UserPermissionsModel} from './user-permissions.model';
import {ApiKeysModel}         from './api_keys';
import {ScalarValueModel}     from './scalar-value.model';
import {ComplexValueModel}    from './complex-value.model';
import {BranchModel}          from './branch.model';
import {VersionModel}         from './version.model';
import {ConfigurationModel}   from './configuration.model';
import {MixinModel}           from './mixin.model';
import {MixinRootsModel}      from './mixin-roots.model';
import {OverrideModel}        from './override.model';
import {Roles}                from '../../../common/roles';
import {PermissionResolver}   from '../resolvers/permission.resolver';

export async function InitModels() {
	sequelize.addModels([
		Session,
		UserModel,
		PermissionModel,
		UserPermissionsModel,
		ApiKeysModel,
		ScalarValueModel,
		ComplexValueModel,
		BranchModel,
		VersionModel,
		ConfigurationModel,
		MixinModel,
		MixinRootsModel,
		OverrideModel,
	]);

	await Session.sync({force: false});
	await UserModel.sync({force: false});
	await PermissionModel.sync({force: false});
	await UserPermissionsModel.sync({force: false});
	await ApiKeysModel.sync({force: false});
	await ConfigurationModel.sync({force: false});
	await VersionModel.sync({force: false});
	await BranchModel.sync({force: false});
	await ComplexValueModel.sync({force: false});
	await MixinModel.sync({force: false});

	await OverrideModel.sync({force: false});
	await MixinRootsModel.sync({force: false});
	await ScalarValueModel.sync({force: false});

	await PermissionResolver.SetupPermissions();
}