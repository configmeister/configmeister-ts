<template>
	<v-layout class="mb-6" column>
		<div class="title mb-3">Recent configurations:</div>
		<template v-if="configs.recent.length">
			<v-layout class="configs-row">
				<configuration-card v-for="config in configs.recent" :key="config.id" v-bind="config"></configuration-card>
			</v-layout>
		</template>
		<template v-else>
			<v-layout class="configs-row" align-center justify-center>
				<div class="body-1">No recent configurations...</div>
			</v-layout>
		</template>
	</v-layout>
</template>

<script lang="ts">
	import Vue                from 'vue';
	import Component          from 'vue-class-component';
	import {State}            from 'vuex-class';
	import {CONFIG_NAMESPACE} from '@/utils/store/store';
	import {ConfigState}      from '@/utils/store/config.store';
	import ConfigurationCard  from '@/components/ConfigurationCard/ConfigurationCard.vue';

	@Component({
		components: {ConfigurationCard},
	})
	export default class UserRecentConfigurations extends Vue {
		@State(CONFIG_NAMESPACE) configs: ConfigState | undefined;

	}
</script>

<style lang="scss" scoped>
	.configs-row {
		height : 100px;
	}
</style>