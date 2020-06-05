<template>
	<v-layout class="configuration-header">
		<div class="headline mr-6 mt-1">{{configuration.name}}</div>
		<v-select
				:items="configuration.raw.versions"
				return-object
				item-text="name"
				v-model="configuration.currentVersion"
				outlined
				dense
				class="header-selector mr-6"
				label="Version"
		></v-select>
		<v-select
				:items="configuration.currentVersion.branches"
				return-object
				item-text="name"
				v-model="configuration.currentBranch"
				outlined
				dense
				class="header-selector"
				label="Branch"
		>
		</v-select>
	</v-layout>
</template>

<script lang="ts">
	import Vue                    from 'vue';
	import Component              from 'vue-class-component';
	import {Prop}                 from 'vue-property-decorator';
	import {ConfigurationWrapper} from '@/utils/wrappers/configuration.wrapper';

	@Component
	export default class ConfigurationHeader extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;
	}
</script>

<style lang="scss" scoped>
	.configuration-header {
		max-height : 124px;
	}

	.header-selector {
		max-width : 300px;
	}
</style>