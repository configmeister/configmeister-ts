<template>
	<layout-center>
		<v-card width="600">
			<v-card-title>Login</v-card-title>
			<v-card-text>
				If you do not have your username and password, please contant the your system administrator.
				<v-layout column>
					<v-text-field label="Username" v-model="username"></v-text-field>
					<v-text-field label="Password" type="password" v-model="password"></v-text-field>
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
	import LayoutCenter   from '@/layouts/LayoutCenter.vue';
	import Component      from 'vue-class-component';
	import Vue            from 'vue';
	import {API}          from '@/utils/api';
	import {hashPassword} from '@/utils/funcs';

	@Component({
		components: {
			LayoutCenter,
		},
	})
	export default class Loing extends Vue {
		private username: string = '';
		private password: string = '';
		private loading: boolean = false;

		async login() {
			// get user salt
			this.loading = true;
			const salt = await API.getUserSalt(this.username);
			if (!salt) {
				// @todo add error message
				this.loading = false;
				return;
			}

			const loginResult = await API.loginUser({
				username: this.username,
				password: await hashPassword(this.password, salt),
			});
			console.log(loginResult);
		}
	}
</script>

<style scoped>

</style>