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
	import LayoutCenter      from '@/layouts/LayoutCenter.vue';
	import Component         from 'vue-class-component';
	import Vue               from 'vue';
	import {hashPassword}    from '@/utils/funcs';
	import {Mutation, State} from 'vuex-class';
	import {USER_NAMESPACE}  from '@/utils/store/store';
	import {ROOTS}           from '@/utils/roots';
	import {Watch}           from 'vue-property-decorator';
	import {UserApi}         from '@/utils/api/user.api';
	import {IError}          from '../../../../common/types/common.types';
	import {IUserState}      from '../../../../common/types/user.types';
	import {USER_MUTATIONS}  from '@/utils/store/user.store';

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

		@State(USER_NAMESPACE) user: IUserState | undefined;
		@Mutation(USER_MUTATIONS.SET_USER_DATA, {namespace: USER_NAMESPACE}) setUserData: any;

		@Watch('username')
		@Watch('passowrd')
		watchData() {
			this.error = [];
		}

		async login() {
			this.loading = true;
			const salt = await UserApi.GetSalt(this.username);
			if (!salt || (salt as IError).error) {
				this.error = ['Username and/or password is incorrect'];
				this.loading = false;
				return;
			}
			const loginResult = await UserApi.Login(this.username, await hashPassword(this.password, (salt as string)));
			if (!loginResult || (loginResult as IError).error) {
				this.error = ['Username and/or password is incorrect'];
				this.loading = false;
				return;
			}
			this.setUserData(loginResult);
			await this.$router.push(ROOTS.MAIN);
		}

		async mounted() {
			console.log('asdjnaskjdn', this.user);
			if (this.user?.loggedIn) {
				await this.$router.push(ROOTS.MAIN);
			}
		}
	}
</script>

<style scoped>

</style>