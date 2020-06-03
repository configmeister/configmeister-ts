import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {IConfiguration, IConfigurationsState}         from '../../../../common/types/config.types';
import {RootState}                                    from '@/utils/store/store';
import {ConfigurationApi}                             from '@/utils/api/configuration.api';
import {IError}                                       from '../../../../common/types/common.types';

export const state: IConfigurationsState = {
	recent:  [],
	list:    [],
	current: null,
};

export enum CONFIG_GETTERS {
	GET_RECENT  = 'GET_RECENT',
	GET_LIST    = 'GET_LIST',
	GET_CURRENT = 'GET_CURRENT',
}

export const getters: GetterTree<IConfigurationsState, RootState> = {
	[CONFIG_GETTERS.GET_RECENT](state) {
		return state.recent;
	},
	[CONFIG_GETTERS.GET_CURRENT]() {
		return state.current;
	},
	[CONFIG_GETTERS.GET_LIST]() {
		return state.list;
	},
};

export enum CONFIG_MUTATIONS {
	SET_RECENT          = 'SET_RECENT',
	SET_LIST            = 'SET_LIST',
	SET_CURRENT         = 'SET_CURRENT',
	REMOVE_CONFIG_BY_ID = 'REMOVE_CONFIG_BY_ID'
}

export const mutations: MutationTree<IConfigurationsState> = {
	[CONFIG_MUTATIONS.SET_RECENT](state, payload: IConfiguration[]) {
		state.recent = payload;
	},
	[CONFIG_MUTATIONS.SET_LIST](state, payload: IConfiguration[]) {
		state.list = payload;
	},
	[CONFIG_MUTATIONS.SET_CURRENT](state, payload: IConfiguration) {
		state.current = payload;
	},
	[CONFIG_MUTATIONS.REMOVE_CONFIG_BY_ID](state, id: string) {
		const rIdx = state.recent.findIndex(el => el._id === id);
		const lIdx = state.list.findIndex(el => el._id === id);
		if (rIdx !== -1) {
			state.recent.splice(rIdx, 1);
		}
		if (lIdx !== -1) {
			state.list.splice(lIdx, 1);
		}
	},
};

export enum CONFIG_ACTIONS {
	FETCH_DATA           = 'FETCH_DATA',
	DELETE_CONFIGURATION = 'DELETE_CONFIGURATION',
	FETCH_CURRENT        = 'FETCH_CURRENT',
}

export const actions: ActionTree<IConfigurationsState, RootState> = {
	async [CONFIG_ACTIONS.FETCH_DATA]({commit}) {
		commit(CONFIG_MUTATIONS.SET_RECENT, await ConfigurationApi.FetchRecent());
		commit(CONFIG_MUTATIONS.SET_LIST, await ConfigurationApi.FetchAll());
	},
	async [CONFIG_ACTIONS.DELETE_CONFIGURATION]({commit}, id: string) {
		const res = await ConfigurationApi.DeleteById(id);
		if (res) {
			commit(CONFIG_MUTATIONS.REMOVE_CONFIG_BY_ID, id);
		}
		return res;
	},
	async [CONFIG_ACTIONS.FETCH_CURRENT]({commit}, id: string) {
		const res = await ConfigurationApi.FetchCurrent(id);
		if (res && !(res as IError).error) {
			commit(CONFIG_MUTATIONS.SET_CURRENT, res);
		}
	},
};

export const configurations: Module<IConfigurationsState, RootState> = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};

