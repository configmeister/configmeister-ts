import Vue     from 'vue';
// @ts-ignore
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary:   '#2f3c43',
				secondary: '#ffde07',
				accent:    '#009688',
				error:     '#e91e63',
				warning:   '#ff5722',
				info:      '#2196f3',
				success:   '#4caf50',
			},
		},
	},
});
