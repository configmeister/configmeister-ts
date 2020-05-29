// export enum USER_ACTIONS {
// 	FETCH_USER_DATA = 'FETCH_USER_DATA'
// }
//
// export const actions: ActionTree<UserState, RootState> = {
// 	async [USER_ACTIONS.FETCH_USER_DATA]({commit}) {
// 		const data = await API.fetchUserData();
// 		commit(USER_MUTATIONS.SET_USER_DATA, data);
// 	},
// };
//
//
// export const user: Module<UserState, RootState> = {
// 	namespaced: true,
// 	state,
// 	mutations,
// 	actions,
// };

import {ActionTree, Module, MutationTree} from 'vuex';
import {RootState}                        from '@/utils/store/store';
import {IUser, IUserState}                from '../../../../common/types/user.types';
import {UserApi}                          from '@/utils/api/user.api';


export const state: IUserState = {
	_id:      '',
	username: '',
	roles:    [],
	loggedIn: false,
};

export enum USER_MUTATIONS {
	SET_USER_DATA = 'SET_USER_DATA',
}

export const mutations: MutationTree<IUserState> = {
	[USER_MUTATIONS.SET_USER_DATA](state, payload: IUserState) {
		state._id = payload._id;
		state.username = payload.username;
		state.roles = payload.roles;
		state.loggedIn = payload.loggedIn;
	},
};

export enum USER_ACTIONS {
	FETCH_USER_DATA = 'FETCH_USER_DATA'
}

export const actions: ActionTree<IUserState, RootState> = {
	async [USER_ACTIONS.FETCH_USER_DATA]({commit}) {
		const data = await UserApi.FetchUserData();
		commit(USER_MUTATIONS.SET_USER_DATA, data);
	},
};

export const user: Module<IUserState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
};