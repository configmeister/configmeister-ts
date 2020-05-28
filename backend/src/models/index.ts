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

	await Session.sync({force: true});
	await UserModel.sync({force: true});
	await PermissionModel.sync({force: true});
	await UserPermissionsModel.sync({force: true});
	await ApiKeysModel.sync({force: true});
	await ConfigurationModel.sync({force: true});
	await VersionModel.sync({force: true});
	await BranchModel.sync({force: true});
	await ComplexValueModel.sync({force: true});
	await MixinModel.sync({force: true});

	await OverrideModel.sync({force: true});
	await MixinRootsModel.sync({force: true});
	await ScalarValueModel.sync({force: true});

	await PermissionResolver.SetupPermissions();
}