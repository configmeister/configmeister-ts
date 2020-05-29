<template>
	<layout-center>
		<v-card width="512">
			<v-card-title>New Configuration</v-card-title>
			<v-card-text>
				<v-layout column>
					<v-text-field label="Configuration name" v-model="configName" :error-messages="configNameError"></v-text-field>
					<v-text-field label="Version name" v-model="versionName" :error-messages="versionNameError"></v-text-field>
					<v-combobox multiple small-chips deletable-chips v-model="branches" append-icon="" label="Branches" :error-messages="branchesError"></v-combobox>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" text @click="createConfig" :loading="creating">Submit</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="error" text :to="mainHref">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</layout-center>
</template>

<script lang="ts">
	import Vue                from 'vue';
	import Component          from 'vue-class-component';
	import LayoutCenter       from '@/layouts/LayoutCenter.vue';
	import {ROOTS}            from '@/utils/roots';
	import {Watch}            from 'vue-property-decorator';
	import {ConfigurationApi} from '@/utils/api/configuration.api';
	import {IError}           from '../../../../common/types/common.types';
	import {IConfiguration}   from '../../../../common/types/config.types';

	@Component({
		components: {LayoutCenter},
	})
	export default class CreateConfiguration extends Vue {

		private mainHref: string = ROOTS.MAIN;
		private configName: string = '';
		private versionName: string = '';
		private branches: string[] = [];
		private creating: boolean = false;
		private configNameError: string[] = [];
		private versionNameError: string[] = [];
		private branchesError: string[] = [];

		@Watch('versionName')
		watchVersionName() {
			this.versionNameError = [];
		}

		@Watch('branches', {deep: true})
		watchBranches() {
			this.branchesError = [];
		}

		private async createConfig() {
			this.creating = true;
			this.configNameError = [];
			this.versionNameError = [];
			this.branchesError = [];

			if (this.versionName.length === 0) {
				this.versionNameError = ['Version must not be empty'];
			}
			if (this.branches.length === 0) {
				this.branchesError = ['Should include at least one branch'];
			}
			if (this.configNameError.length !== 0 || this.versionNameError.length !== 0 || this.branchesError.length !== 0) {return this.creating = false; }

			const res = await ConfigurationApi.CreateNew({
				name:    this.configName,
				version: {
					name:     this.versionName,
					branches: this.branches.map(el => ({name: el})),
				},
			});
			console.log(res);
			if ((res as IError).code) {
				this.configNameError = [`Name '${this.configName}' is already taken`];
				this.creating = false;
				return;
			}
			await this.$router.push({
				path: `${ROOTS.CONFIGURATION}${res}`,
			});
			this.creating = false;
		}
	}
</script>

<style scoped>

</style>