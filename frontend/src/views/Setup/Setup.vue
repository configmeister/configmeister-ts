<template>
	<layout-center>
		<v-card width="512">
			<v-card-title>Setup the admin user</v-card-title>
			<v-card-text>
				Please setup the admin user. You will need an admin user to create new users.
				<v-layout column>
					<v-text-field label="Username" v-model="username"></v-text-field>
					<v-text-field label="Password" v-model="password" type="password"></v-text-field>
					<v-text-field label="Confirm password" v-model="confirmPassword" type="password" :error-messages="confirmationError"></v-text-field>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text :disabled="!noErrors" :loading="loading" @click="createUser">Submit</v-btn>
			</v-card-actions>
		</v-card>
	</layout-center>
</template>

<script lang="ts">
	import Vue              from 'vue';
	import Component        from 'vue-class-component';
	import LayoutCenter     from '@/layouts/LayoutCenter.vue';
	import {Watch}          from 'vue-property-decorator';
	import forge            from 'node-forge';
	import {hashPassword}   from '@/utils/funcs';
	import {UserApi}        from '@/utils/api/user.api';
	import {ERoles, IError} from '../../../../common/types/common.types';
	import {ROOTS}          from '@/utils/roots';

	@Component({
		components: {
			LayoutCenter,
		},
	})
	export default class Setup extends Vue {
		private username: string = 'root';
		private password: string = '';
		private confirmPassword: string = '';
		private confirmationError: string[] = [];
		private loading: boolean = false;

		@Watch('password')
		@Watch('confirmPassword')
		checkPasswords() {
			if (this.password === this.confirmPassword) {
				this.confirmationError = [];
			} else {
				if (this.password === '' || this.confirmPassword === '') {
					this.confirmationError = [];
				} else {
					this.confirmationError = ['Password do not match'];
				}
			}
		}

		get noErrors() {
			return this.confirmationError.length === 0;
		}

		async createUser() {
			this.loading = true;
			if (!this.noErrors) {
				return;
			}

			const salt = await forge.random.getBytes(128);
			const key = await hashPassword(this.password, salt);
			const res = await UserApi.CreateNew({
				username: this.username,
				password: key,
				salt,
				roles:    [ERoles.admin],
			});
			if (!res || (res as IError).error) {
				// do something with error and return;
				this.loading = false;
				return;
			}
			await this.$router.push({
				path: ROOTS.LOGIN,
			});
			this.loading = false;
		}
	}
</script>

<style scoped>

</style>