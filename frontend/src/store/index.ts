import Vue                  from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {RootState}          from '@/utils/store/store';
import {user}               from '@/utils/store/user.store';
import {configurations}     from '@/utils/store/config.store';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
	state:   {
		version: '1.0.0',
	},
	modules: {
		user,
		configurations,
	},
};

export default new Vuex.Store<RootState>(store);