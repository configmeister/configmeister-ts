import {CONFIGURATION_API_PREFIX}             from '../../../../common/endpoints';
import {createMethods}                        from '@/utils/api/methods';
import {IConfiguration, ICreateConfiguration} from '../../../../common/types/config.types';
import {Errorable, IPagination}               from '../../../../common/types/common.types';

const {post, get} = createMethods(CONFIGURATION_API_PREFIX);

export class ConfigurationApi {
	public static async FetchCurrent(id: string): Promise<Errorable<IConfiguration>> {
		return post('get-one-full', {id});
	}

	public static async CreateNew(configuration: ICreateConfiguration): Promise<Errorable<string>> {
		return post('create', configuration);
	}

	public static async FetchAll(pagination: IPagination = {}): Promise<Errorable<IConfiguration[]>> {
		return post('fetch-all', pagination);
	}

	public static async FetchRecent(pagination: IPagination = {}): Promise<Errorable<IConfiguration[]>> {
		return post('fetch-recent', pagination);
	}

	public static async DeleteById(id: string): Promise<Errorable<boolean>> {
		return post('delete-by-id', {id});
	}
}
