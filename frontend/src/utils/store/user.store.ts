import {Roles}                            from '../../../../common/roles';
import {ActionTree, Module, MutationTree} from 'vuex';
import {RootState}                        from '@/utils/store/store';
import {API}                              from '@/utils/api';

export interface UserState {
	id: number | null;
	username: string | null;
	roles: Roles[];
	loggedIn: boolean;
}

export const state: UserState = {
	id:       null,
	username: null,
	roles:    [],
	loggedIn: false,
};

export enum USER_MUTATIONS {
	SET_USER_DATA = 'SET_USER_DATA'
}

export const mutations: MutationTree<UserState> = {
	[USER_MUTATIONS.SET_USER_DATA](state, {id, username, roles, loggedIn}: { id: number, username: string, roles: Roles[], loggedIn: boolean }) {
		state.id = id || null;
		state.username = username || null;
		state.roles = roles || null;
		state.loggedIn = loggedIn || false;
	},
};

export enum USER_ACTIONS {
	FETCH_USER_DATA = 'FETCH_USER_DATA'
}

export const actions: ActionTree<UserState, RootState> = {
	async [USER_ACTIONS.FETCH_USER_DATA]({commit}) {
		const data = await API.fetchUserData();
		commit(USER_MUTATIONS.SET_USER_DATA, data);
	},
};


export const user: Module<UserState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
};