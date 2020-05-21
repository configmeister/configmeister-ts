import {ActionTree, Module, MutationTree} from 'vuex';
import {RootState}                        from '@/utils/store/store';
import {API}                              from '@/utils/api';
import {ConfigCard}                       from '../../../../common/data-types';


export interface Configuration {
	id: number,
	name: string,
	updatedAt: Date,
}

export interface ConfigState {
	recent: ConfigCard[];
	list: ConfigCard[];
	current: Configuration | null;
}

export const state: ConfigState = {
	recent:  [],
	list:    [],
	current: null,
};

export enum CONFIG_MUTATIONS {
	SET_INITIAL_DATA             = 'setInitialData',
	REMOVE_DELETED_CONFIGURATION = 'removeDeletedConfiguration'
}

export const mutations: MutationTree<ConfigState> = {
	[CONFIG_MUTATIONS.SET_INITIAL_DATA](state, data) {
		state.recent = data.recents || [];
		state.list = data.list || [];
	},
	[CONFIG_MUTATIONS.REMOVE_DELETED_CONFIGURATION](state, id) {
		const listIdx = state.list.findIndex(el => el.id === id);
		const recentIdx = state.recent.findIndex(el => el.id === id);
		if (listIdx !== -1) {
			state.list.splice(listIdx, 1);
		}
		if (recentIdx !== -1) {
			state.recent.splice(recentIdx, 1);
		}
	},
};

export enum CONFIG_ACTIONS {
	FETCH_DATA                = 'fetchData',
	DELETE_CONFIGURATION      = 'deleteConfiguration',
	GET_CURRENT_CONFIGURATION = 'getCurrentConfiguration'
}

export const actions: ActionTree<ConfigState, RootState> = {
	async [CONFIG_ACTIONS.FETCH_DATA]({commit}) {
		const res = await API.fetchConfigurations();
		commit(CONFIG_MUTATIONS.SET_INITIAL_DATA, res);
	},
	async [CONFIG_ACTIONS.DELETE_CONFIGURATION]({commit}, id: number) {
		const res = await API.deleteConfiguration(id);
		if (res !== true) {
			return;
		}
		commit(CONFIG_MUTATIONS.REMOVE_DELETED_CONFIGURATION, id);
	},
	async [CONFIG_ACTIONS.GET_CURRENT_CONFIGURATION]({commit}, id: number) {

	},
};

export const config: Module<ConfigState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
};

