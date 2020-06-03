<template>
	<layout-column fill-height>
		<v-overlay v-if="loading">
			<v-layout justify-center align-center>
				<v-progress-circular indeterminate color="secondary"></v-progress-circular>
			</v-layout>
		</v-overlay>
		<template v-else>
			<configuration-header :configuration="configuration"></configuration-header>
			<v-layout justify-space-between>
				<configuration-tree-view :configuration="configuration"></configuration-tree-view>
				<configuration-controls :configuration="configuration"></configuration-controls>
			</v-layout>
		</template>
	</layout-column>
</template>

<script lang="ts">
	import Vue                              from 'vue';
	import Component                        from 'vue-class-component';
	import LayoutColumn                     from '../../layouts/LayoutColumn.vue';
	import {Action, Getter}                 from 'vuex-class';
	import {CONFIG_ACTIONS, CONFIG_GETTERS} from '@/utils/store/config.store';
	import {CONFIG_NAMESPACE}               from '@/utils/store/store';
	import {IConfigurationFull}             from '../../../../common/types/config.types';
	import {ConfigurationWrapper}           from '@/utils/wrappers/configuration.wrapper';
	import ConfigurationHeader              from '@/views/Configuration/ConfigurationHeader.vue';
	import ConfigurationTreeView            from '@/views/Configuration/ConfigurationTreeView.vue';
	import ConfigurationControls            from '@/views/Configuration/ConfigurationControls.vue';

	@Component({
		components: {ConfigurationControls, ConfigurationTreeView, ConfigurationHeader, LayoutColumn},
	})
	export default class Configuration extends Vue {
		@Getter(CONFIG_GETTERS.GET_CURRENT, {namespace: CONFIG_NAMESPACE}) config: IConfigurationFull | undefined;
		@Action(CONFIG_ACTIONS.FETCH_CURRENT, {namespace: CONFIG_NAMESPACE}) fetchCurrentConfiguration: any;
		private loading: boolean = true;
		private configuration: ConfigurationWrapper = new ConfigurationWrapper();

		async mounted() {
			await this.fetchCurrentConfiguration(this.$route.params.id);
			if (!this.config) {
				// go to 404
				return;
			}
			this.configuration.updateRaw(this.config);
			this.loading = false;
		}
	}
</script>

<style lang="scss" scoped>
</style>