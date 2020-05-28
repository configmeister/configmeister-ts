<template>
	<v-card width="100%">
		<v-tabs>
			<v-tab v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
			<v-tab-item v-for="(component, index) in controls" :key="index">
				<component :is="component"></component>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
	import Vue, {VueConstructor}              from 'vue';
	import Component                          from 'vue-class-component';
	import {Getter, State}                    from 'vuex-class';
	import {CONFIG_GETTERS}                   from '@/utils/store/config.store';
	import {CONFIG_NAMESPACE, USER_NAMESPACE} from '@/utils/store/store';
	import {UserState}                        from '@/utils/store/user.store';
	import ControlsValue                      from '@/components/ConfigurationControls/ControlsValue.vue';
	import {CurrentLocation}                  from '@/utils/lang';
	import ControlsBranch                     from '@/components/ConfigurationControls/ControlsBranch.vue';
	import ControlsVersion                    from '@/components/ConfigurationControls/ControlsVersion.vue';
	import ControlsConfiguration              from '@/components/ConfigurationControls/ControlsConfiguration.vue';
	import ControlsExport                     from '@/components/ConfigurationControls/ControlsExport.vue';
	import {INode}                            from '../../../../common/data-types';

	export interface ITab {
		tab: string,
		component: VueConstructor,
		rules?: (() => boolean)[],
	}

	const TABS: ITab[] = [
		{
			tab:       CurrentLocation().value,
			component: ControlsValue,
		},
		{
			tab:       CurrentLocation().branch,
			component: ControlsBranch,
		},
		{
			tab:       CurrentLocation().version,
			component: ControlsVersion,
		},
		{
			tab:       CurrentLocation().configuration,
			component: ControlsConfiguration,
		},
		{
			tab:       CurrentLocation().export,
			component: ControlsExport,
		},
	];

	@Component
	export default class ConfigurationControls extends Vue {
		@State(USER_NAMESPACE) userState: UserState | undefined;
		@Getter(CONFIG_GETTERS.SELECTED_VALUE, {namespace: CONFIG_NAMESPACE}) selectedValue: INode | undefined;


		get filteredTabs(): ITab[] {
			return TABS;
		}

		get tabs(): string[] {
			return this.filteredTabs.map(el => el.tab);
		}

		get controls(): VueConstructor[] {
			return this.filteredTabs.map(el => el.component);
		}
	}

</script>

<style scoped>

</style>