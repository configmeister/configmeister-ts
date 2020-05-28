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
				<v-btn color="primary" text :disabled="!noErrors" @click="createUser">Submit</v-btn>
			</v-card-actions>
		</v-card>
	</layout-center>
</template>

<script lang="ts">
	import Vue            from 'vue';
	import Component      from 'vue-class-component';
	import LayoutCenter   from '@/layouts/LayoutCenter.vue';
	import {Watch}        from 'vue-property-decorator';
	import forge          from 'node-forge';
	import {API}          from '@/utils/api';
	import {Roles}        from '../../../../common/roles';
	import {hashPassword} from '@/utils/funcs';

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
			if (!this.noErrors) {
				return;
			}

			const salt = await forge.random.getBytes(128);
			const key = await hashPassword(this.password, salt);

			const res = await API.createUser({
				username: this.username,
				password: key,
				roles:    [Roles.admin],
				salt,
			});
			if (res) {
				await this.$router.push('/login');
			}
		}
	}
</script>

<style scoped>

</style>