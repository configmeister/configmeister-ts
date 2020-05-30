// import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
// import {RootState}                                    from '@/utils/store/store';
// import {API}                                          from '@/utils/api';
// import {ConfigCard, Configuration, INode}             from '../../../../common/data-types';
//
//
//
// export enum CONFIG_GETTERS {
// 	CURRENT_CONFIGURATION = 'currentConfiguration',
// 	SELECTED_VALUE        = 'selectedValue',
// }
//
// export const getters: GetterTree<ConfigState, RootState> = {
// 	[CONFIG_GETTERS.CURRENT_CONFIGURATION](state): Configuration | null {
// 		return state.current;
// 	},
// 	[CONFIG_GETTERS.SELECTED_VALUE](state): INode | undefined {
// 		return state.selectedValue[0];
// 	},
// };
//
// export enum CONFIG_MUTATIONS {
// 	SET_INITIAL_DATA             = 'setInitialData',
// 	REMOVE_DELETED_CONFIGURATION = 'removeDeletedConfiguration',
// 	SET_CURRENT_CONFIGURATION    = 'setCurrentConfiguration',
// 	SET_CURRENT_SELECTED_VALUE   = 'setCurrentSelectedValue'
// }
//
// export const mutations: MutationTree<ConfigState> = {
// 	[CONFIG_MUTATIONS.SET_INITIAL_DATA](state, data) {
// 		state.recent = data.recents || [];
// 		state.list = data.list || [];
// 	},
// 	[CONFIG_MUTATIONS.REMOVE_DELETED_CONFIGURATION](state, id) {
// 		const listIdx = state.list.findIndex(el => el.id === id);
// 		const recentIdx = state.recent.findIndex(el => el.id === id);
// 		if (listIdx !== -1) {
// 			state.list.splice(listIdx, 1);
// 		}
// 		if (recentIdx !== -1) {
// 			state.recent.splice(recentIdx, 1);
// 		}
// 	},
// 	[CONFIG_MUTATIONS.SET_CURRENT_CONFIGURATION](state, cfg: Configuration) {
// 		state.current = cfg;
// 	},
// 	[CONFIG_MUTATIONS.SET_CURRENT_SELECTED_VALUE](state, value: INode[]) {
// 		state.selectedValue = value;
// 	},
// };
//
// export enum CONFIG_ACTIONS {
// 	FETCH_DATA                = 'fetchData',
// 	DELETE_CONFIGURATION      = 'deleteConfiguration',
// 	GET_CURRENT_CONFIGURATION = 'getCurrentConfiguration'
// }
//
// export const actions: ActionTree<ConfigState, RootState> = {
// 	async [CONFIG_ACTIONS.FETCH_DATA]({commit}) {
// 		const res = await API.fetchConfigurations();
// 		commit(CONFIG_MUTATIONS.SET_INITIAL_DATA, res);
// 	},
// 	async [CONFIG_ACTIONS.DELETE_CONFIGURATION]({commit}, id: string) {
// 		const res = await API.deleteConfiguration(id);
// 		if (res !== true) {
// 			return;
// 		}
// 		commit(CONFIG_MUTATIONS.REMOVE_DELETED_CONFIGURATION, id);
// 	},
// 	async [CONFIG_ACTIONS.GET_CURRENT_CONFIGURATION]({commit}, id: string) {
// 		console.log(id);
// 		const cfg = await API.getFullConfiguration(id);
// 		console.log(cfg);
// 		if (!cfg) {
// 			return false;
// 		}
// 		commit(CONFIG_MUTATIONS.SET_CURRENT_CONFIGURATION, cfg);
// 	},
// };
//
// export const config: Module<ConfigState, RootState> = {
// 	namespaced: true,
// 	state,
// 	mutations,
// 	actions,
// 	getters,
// };
//

import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {IConfiguration, IConfigurationsState}         from '../../../../common/types/config.types';
import {RootState}                                    from '@/utils/store/store';
import {ConfigurationApi}                             from '@/utils/api/configuration.api';

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
};

export const configurations: Module<IConfigurationsState, RootState> = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};

