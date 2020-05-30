<template>
	<v-layout column>
		<v-text-field label="Seach by name..." outlined v-model="searchQuery" append-icon="mdi-magnify" class="seach-field mb-3 ml-0"></v-text-field>
		<v-layout row wrap v-if="configList.length">
			<configuration-card v-for="config in configList" :key="config._id" :id="config._id" :updated-at="config.updatedAt" :name="config.name"></configuration-card>
		</v-layout>
		<v-layout v-else column justify-center align-center class="configs">
			<div class="body-1 mb-3">No configurations found...</div>
			<v-btn text color="primary" :to="newConfigHref">Create one?</v-btn>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import Vue                from 'vue';
	import Component          from 'vue-class-component';
	import ConfigurationCard  from '@/components/ConfigurationCard/ConfigurationCard.vue';
	import {Getter}           from 'vuex-class';
	import {ROOTS}            from '@/utils/roots';
	import {CONFIG_NAMESPACE} from '@/utils/store/store';
	import {CONFIG_GETTERS}   from '@/utils/store/config.store';
	import {IConfiguration}   from '../../../../common/types/config.types';

	@Component({
		components: {ConfigurationCard},
	})
	export default class ConfigurationList extends Vue {
		@Getter(CONFIG_GETTERS.GET_LIST, {namespace: CONFIG_NAMESPACE}) configs: IConfiguration[] | undefined;

		private newConfigHref: string = ROOTS.CREATE_CONFIGURATION;
		private searchQuery: string = '';

		get configList() {
			if (this.searchQuery.length === 0) {
				return this.configs ? this.configs : [];
			}
			return this.configs ? this.configs.filter(config => !!config.name.match(new RegExp(this.searchQuery, 'i'))) : [];
		}

	}
</script>

<style lang="scss" scoped>
	.seach-field {
		width : 300px;
	}

	.configs {
		min-height : 100px;
	}
</style>