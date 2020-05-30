<template>
	<v-app class="v-application">
		<template v-if="inited && userState.loggedIn">
			<main-controls-drawer></main-controls-drawer>
		</template>
		<v-content app>
			<template v-if="inited">
				<router-view></router-view>
			</template>
			<template v-else>
				<layout-center>
					<v-progress-circular indeterminate></v-progress-circular>
				</layout-center>
			</template>
		</v-content>
	</v-app>
</template>

<script lang="ts">
	import Vue                                from 'vue';
	import Component                          from 'vue-class-component';
	import {Action, State}                    from 'vuex-class';
	import {CONFIG_NAMESPACE, USER_NAMESPACE} from '@/utils/store/store';
	import {ROOTS}                            from '@/utils/roots';
	import LayoutCenter                       from '@/layouts/LayoutCenter.vue';
	import MainControlsDrawer                 from '@/components/MainControlsDrawer/MainControlsDrawer.vue';
	import {IUserState}                       from '../../common/types/user.types';
	import {USER_ACTIONS}                     from '@/utils/store/user.store';
	import {CONFIG_ACTIONS}                   from '@/utils/store/config.store';

	@Component({
		components: {MainControlsDrawer, LayoutCenter},
	})
	export default class App extends Vue {
		private inited: boolean = false;
		@State(USER_NAMESPACE) userState: IUserState | undefined;
		@Action(USER_ACTIONS.FETCH_USER_DATA, {namespace: USER_NAMESPACE}) fetchUserData: any;
		@Action(CONFIG_ACTIONS.FETCH_DATA, {namespace: CONFIG_NAMESPACE}) fetchConfigData: any;

		async mounted() {
			await this.fetchUserData();
			if (!this.userState?.loggedIn && this.$route.path !== ROOTS.LOGIN && this.$route.path !== ROOTS.SETUP) {
				await this.$router.push(ROOTS.LOGIN);
				this.inited = true;
				return;
			}
			await this.fetchConfigData();
			this.inited = true;
		}
	}
</script>

<style>
	html, body {
		background-color : #fefefe;
		overflow-y       : auto !important;
	}

	.v-application {
		background : #fefefe !important;
	}
</style>