<!--<template>-->
<!--	<layout-column fill-height>-->
<!--		<v-overlay v-if="loading">-->
<!--			<v-layout justify-center align-center>-->
<!--				<v-progress-circular indeterminate color="secondary"></v-progress-circular>-->
<!--			</v-layout>-->
<!--		</v-overlay>-->
<!--		<template v-else>-->
<!--			<v-layout align-center class="top-row mb-6">-->
<!--				<div class="title config-name mr-6">-->
<!--					{{currentConfig.name}}-->
<!--					<span class="caption grey&#45;&#45;text">Updated at: {{configurationLastUpdate}}</span>-->
<!--				</div>-->
<!--				<v-select label="Version" v-model="selectedVersion" :items="currentConfig.versions" item-text="label" item-value="id" outlined class="version-selector"></v-select>-->
<!--			</v-layout>-->
<!--			<v-layout justify-space-between>-->
<!--				<configuration-tree-view :selected-version-id="selectedVersion"></configuration-tree-view>-->
<!--				<configuration-controls></configuration-controls>-->
<!--			</v-layout>-->
<!--		</template>-->
<!--	</layout-column>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--	import Vue                                           from 'vue';-->
<!--	import Component                                     from 'vue-class-component';-->
<!--	import {Action, Getter, State}                       from 'vuex-class';-->
<!--	import {CONFIG_NAMESPACE}                            from '@/utils/store/store';-->
<!--	import {CONFIG_ACTIONS, CONFIG_GETTERS, ConfigState} from '@/utils/store/config.store';-->
<!--	import LayoutColumn                                  from '@/layouts/LayoutColumn.vue';-->
<!--	import moment                                        from 'moment';-->
<!--	import {CurrentLocation}                             from '@/utils/lang';-->
<!--	import ConfigurationTreeView                         from '@/components/ConfigurationTreeView/ConfigurationTreeView.vue';-->
<!--	import ConfigurationControls                         from '@/components/ConfigurationControls/ConfigurationControls.vue';-->
<!--	import {Configuration as IConfiguration}             from '../../../../common/data-types';-->

<!--	@Component({-->
<!--		components: {ConfigurationControls, ConfigurationTreeView, LayoutColumn},-->
<!--	})-->
<!--	export default class Configuration extends Vue {-->
<!--		@State(CONFIG_NAMESPACE) configState: ConfigState | undefined;-->
<!--		@Getter(CONFIG_GETTERS.CURRENT_CONFIGURATION, {namespace: CONFIG_NAMESPACE}) currentConfig: IConfiguration | undefined;-->
<!--		@Action(CONFIG_ACTIONS.GET_CURRENT_CONFIGURATION, {namespace: CONFIG_NAMESPACE}) getCurrentConfiguration: any;-->

<!--		private loading: boolean = true;-->
<!--		private selectedVersion: string | undefined;-->

<!--		get configurationLastUpdate(): string | undefined {-->
<!--			return moment(this.currentConfig?.updatedAt).format(CurrentLocation().timeFormat);-->
<!--		}-->

<!--		async mounted() {-->
<!--			await this.getCurrentConfiguration(this.$route.params.id);-->
<!--			this.selectedVersion = this.currentConfig?.versions[0].id;-->
<!--			this.loading = false;-->
<!--		}-->
<!--	}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--	.config-name {-->
<!--		width          : auto;-->
<!--		position       : relative;-->
<!--		display        : flex;-->
<!--		flex-direction : column;-->
<!--		top            : -16px;-->
<!--	}-->

<!--	.version-selector {-->
<!--		max-width : 300px;-->
<!--	}-->

<!--	.top-row {-->
<!--		max-height : 74px;-->
<!--	}-->
<!--</style>-->