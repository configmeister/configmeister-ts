<template>
	<v-card width="100%" class="mr-6">
		<v-tabs>
			<v-tab v-for="branch in versionBranches" :key="branch.id">{{branch.name}}</v-tab>
			<v-tab-item v-for="branch in versionBranches" :key="branch.id + 'item'">
				<tree-view :branch="branch"></tree-view>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
	import Vue                           from 'vue';
	import Component                     from 'vue-class-component';
	import {Prop}                        from 'vue-property-decorator';
	import {Getter, State}               from 'vuex-class';
	import {CONFIG_NAMESPACE}            from '@/utils/store/store';
	import {CONFIG_GETTERS, ConfigState} from '@/utils/store/config.store';
	import TreeView                      from '@/components/ConfigurationTreeView/TreeView.vue';
	import {Configuration}               from '../../../../common/data-types';

	@Component({
		components: {TreeView},
	})
	export default class ConfigurationTreeView extends Vue {
		@State(CONFIG_NAMESPACE) configState: ConfigState | undefined;
		@Getter(CONFIG_GETTERS.CURRENT_CONFIGURATION, {namespace: CONFIG_NAMESPACE}) currentConfig: Configuration | undefined;

		@Prop({required: true}) selectedVersionId: string | undefined;

		get versionBranches() {
			return this.currentConfig?.versions.find(v => v.id === this.selectedVersionId)?.branches || [];
		}
	}
</script>

<style scoped>

</style>