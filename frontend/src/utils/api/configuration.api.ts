import {CONFIGURATION_API_PREFIX}             from '../../../../common/endpoints';
import {createMethods}                        from '@/utils/api/methods';
import {IConfiguration, ICreateConfiguration} from '../../../../common/types/config.types';
import {Errorable}                            from '../../../../common/types/common.types';

const {post, get} = createMethods(CONFIGURATION_API_PREFIX);

export class ConfigurationApi {
	public static async CreateNew(configuration: ICreateConfiguration): Promise<Errorable<string>> {
		return post('create', configuration);
	}
}
