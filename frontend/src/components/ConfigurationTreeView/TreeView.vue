<template>
	<v-treeview dense activatable @update:active="setActive" return-object hoverable :items="treeModel" color="accent">
		<template v-slot:prepend="{item}">
			<v-icon small color="primary">{{iconFromNodeType(item)}}</v-icon>
		</template>
		<template v-slot:label="{item}">
			<span>{{item.name}}</span>
			<span>{{typeFromNodeType(item)}}</span>
		</template>
	</v-treeview>
</template>

<script lang="ts">
	import Vue                from 'vue';
	import Component          from 'vue-class-component';
	import {Mutation, State}  from 'vuex-class';
	import {CONFIG_NAMESPACE} from '@/utils/store/store';
	import {
		Branch,
		CONFIG_MUTATIONS,
		ConfigState,
		INode,
		NODE_TYPE,
	}                         from '@/utils/store/config.store';
	import {Prop}             from 'vue-property-decorator';


	@Component
	export default class TreeView extends Vue {
		@State(CONFIG_NAMESPACE) configState: ConfigState | undefined;
		@Mutation(CONFIG_MUTATIONS.SET_CURRENT_SELECTED_VALUE, {namespace: CONFIG_NAMESPACE}) setActiveValue: any;

		@Prop({required: true, type: Object}) branch: Branch | undefined;

		// private activeNode: INode[] = [];

		get treeModel(): INode[] {
			return [{
				id:       this.branch?.id,
				name:     this.branch?.name,
				nodeType: NODE_TYPE.ROOT,
				children: [],
			}];
		}

		setActive(val: INode[]) {
			this.setActiveValue(val);
		}

		iconFromNodeType(item: { nodeType: NODE_TYPE }): string {
			switch (item.nodeType) {
				case NODE_TYPE.ROOT:
					return 'mdi-source-branch';
				default:
					return 'mdi-code-tags';
			}
		}

		typeFromNodeType(item: { nodeType: NODE_TYPE }) {
			switch (item.nodeType) {
				case NODE_TYPE.ROOT:
					return ':';
			}
		}
	}
</script>

<style scoped>

</style>