<template>
	<layout-center>
		<v-card width="512">
			<v-card-title>Login</v-card-title>
			<v-card-text>
				If you do not have your username and password, please contant the your system administrator.
				<v-layout column>
					<v-text-field label="Username" v-model="username" :error-messages="error"></v-text-field>
					<v-text-field label="Password" type="password" v-model="password" :error-messages="error"></v-text-field>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="login" :loading="loading" :disabled="loading">Submit</v-btn>
			</v-card-actions>
		</v-card>
	</layout-center>
</template>

<script lang="ts">
	import LayoutCenter                       from '@/layouts/LayoutCenter.vue';
	import Component                          from 'vue-class-component';
	import Vue                                from 'vue';
	// import {API}                              from '@/utils/api';
	import {hashPassword}                     from '@/utils/funcs';
	import {Action, Mutation, State}          from 'vuex-class';
	import {CONFIG_NAMESPACE, USER_NAMESPACE} from '@/utils/store/store';
	// import {USER_MUTATIONS, UserState}        from '@/utils/store/user.store';
	import {ROOTS}                            from '@/utils/roots';
	// import {CONFIG_ACTIONS}                   from '@/utils/store/config.store';
	import {Watch}                            from 'vue-property-decorator';

	@Component({
		components: {
			LayoutCenter,
		},
	})
	export default class Login extends Vue {
		private username: string = '';
		private password: string = '';
		private loading: boolean = false;
		private error: string[] = [];

		// @State(USER_NAMESPACE) user: UserState | undefined;
		// @Mutation(USER_MUTATIONS.SET_USER_DATA, {namespace: USER_NAMESPACE}) setUserData: any;
		// @Action(CONFIG_ACTIONS.FETCH_DATA, {namespace: CONFIG_NAMESPACE}) fetchConfigData: any;

		@Watch('username')
		@Watch('passowrd')
		watchData() {
			this.error = [];
		}

		async login() {
			// // get user salt
			// this.loading = true;
			// const salt = await API.getUserSalt(this.username);
			// if (!salt) {
			// 	this.error = ['Username and/or passwrod is incorrect'];
			// 	this.loading = false;
			// 	return;
			// }
			//
			// const loginResult = await API.loginUser({
			// 	username: this.username,
			// 	password: await hashPassword(this.password, salt),
			// });
			//
			// if (!loginResult || loginResult.error) {
			// 	this.error = ['Username and/or passwrod is incorrect'];
			// 	this.loading = false;
			// 	return;
			// }
			//
			// this.setUserData(loginResult);
			// await this.fetchConfigData();
			// await this.$router.push(ROOTS.MAIN);
		}

		async mounted() {
			// console.log(this.user?.loggedIn);
			// if (this.user?.loggedIn) {
			// 	await this.$router.push(ROOTS.MAIN);
			// }
		}
	}
</script>

<style scoped>

</style>