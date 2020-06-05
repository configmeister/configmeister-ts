<template>
	<v-card class="card-width">
		<v-tabs>
			<v-tab v-for="(tab, index) in tabValues" :key="index">{{tab}}</v-tab>

			<v-tab-item v-for="(tab, index) in tabItems" :key="index">
				<component :is="tab" :configuration="configuration"></component>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
	import Vue, {VueConstructor}  from 'vue';
	import Component              from 'vue-class-component';
	import {Prop}                 from 'vue-property-decorator';
	import {ConfigurationWrapper} from '@/utils/wrappers/configuration.wrapper';
	import ValueControl           from '@/views/Configuration/ControlsOptions/ValueControl/ValueControl.vue';

	@Component
	export default class ConfigurationControls extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;

		private tabItems: VueConstructor[] = [];
		private tabValues: string[] = [];

		private registerTab({tab, component}: { tab: string, component: VueConstructor }) {
			this.tabValues.push(tab);
			this.tabItems.push(component);
		}

		mounted() {
			this.registerTab({
				tab:       'Value',
				component: ValueControl,
			});
		}
	}
</script>

<style scoped>
	.card-width {
		width : calc(40% - 12px);
	}
</style>