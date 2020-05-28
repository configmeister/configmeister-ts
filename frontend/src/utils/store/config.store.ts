import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootState}                                    from '@/utils/store/store';
import {API}                                          from '@/utils/api';
import {ConfigCard, Configuration, INode}             from '../../../../common/data-types';


export interface ConfigState {
	recent: ConfigCard[];
	list: ConfigCard[];
	current: Configuration | null;
	selectedValue: INode[];
}

export const state: ConfigState = {
	recent:        [],
	list:          [],
	current:       null,
	selectedValue: [],
};

export enum CONFIG_GETTERS {
	CURRENT_CONFIGURATION = 'currentConfiguration',
	SELECTED_VALUE        = 'selectedValue',
}

export const getters: GetterTree<ConfigState, RootState> = {
	[CONFIG_GETTERS.CURRENT_CONFIGURATION](state): Configuration | null {
		return state.current;
	},
	[CONFIG_GETTERS.SELECTED_VALUE](state): INode | undefined {
		return state.selectedValue[0];
	},
};

export enum CONFIG_MUTATIONS {
	SET_INITIAL_DATA             = 'setInitialData',
	REMOVE_DELETED_CONFIGURATION = 'removeDeletedConfiguration',
	SET_CURRENT_CONFIGURATION    = 'setCurrentConfiguration',
	SET_CURRENT_SELECTED_VALUE   = 'setCurrentSelectedValue'
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
	[CONFIG_MUTATIONS.SET_CURRENT_CONFIGURATION](state, cfg: Configuration) {
		state.current = cfg;
	},
	[CONFIG_MUTATIONS.SET_CURRENT_SELECTED_VALUE](state, value: INode[]) {
		state.selectedValue = value;
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
	async [CONFIG_ACTIONS.DELETE_CONFIGURATION]({commit}, id: string) {
		const res = await API.deleteConfiguration(id);
		if (res !== true) {
			return;
		}
		commit(CONFIG_MUTATIONS.REMOVE_DELETED_CONFIGURATION, id);
	},
	async [CONFIG_ACTIONS.GET_CURRENT_CONFIGURATION]({commit}, id: string) {
		console.log(id);
		const cfg = await API.getFullConfiguration(id);
		console.log(cfg);
		if (!cfg) {
			return false;
		}
		commit(CONFIG_MUTATIONS.SET_CURRENT_CONFIGURATION, cfg);
	},
};

export const config: Module<ConfigState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

