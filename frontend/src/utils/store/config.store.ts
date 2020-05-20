import {ActionTree, Module, MutationTree} from 'vuex';
import {RootState}                        from '@/utils/store/store';

export interface ConfigCard {
	id: number;
	name: string;
	updatedAt: Date;
}

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

}

export const mutations: MutationTree<ConfigState> = {};

export enum CONFIG_ACTIONS {
}

export const actions: ActionTree<ConfigState, RootState> = {
};

export const config: Module<ConfigState, RootState> = {
	namespaced: true,
	state,
};

