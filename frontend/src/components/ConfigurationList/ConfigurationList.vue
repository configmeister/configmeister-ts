<template>
	<v-layout column>
		<v-text-field label="Seach by name..." v-model="searchQuery" append-icon="mdi-magnify" class="seach-field mb-3 ml-0"></v-text-field>
		<v-layout row wrap v-if="configs.list.length">
			<configuration-card v-for="config in configList" :key="config.id" v-bind="config"></configuration-card>
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
	import {State}            from 'vuex-class';
	import {CONFIG_NAMESPACE} from '@/utils/store/store';
	import {ConfigState}      from '@/utils/store/config.store';
	import {ROOTS}            from '@/utils/roots';

	@Component({
		components: {ConfigurationCard},
	})
	export default class ConfigurationList extends Vue {
		@State(CONFIG_NAMESPACE) configs: ConfigState | undefined;

		private newConfigHref: string = ROOTS.CREATE_CONFIGURATION;
		private searchQuery: string = '';

		get configList() {
			if (this.searchQuery.length === 0) {
				return this.configs?.list;
			}
			return this.configs?.list.filter(config => !!config.name.match(new RegExp(this.searchQuery, 'i')));
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