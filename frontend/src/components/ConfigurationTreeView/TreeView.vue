<template>
	<v-treeview dense activatable :multiple-active="false" @update:active="setActive" return-object hoverable :items="treeModel" color="accent">
		<template v-slot:prepend="{item}">
			<v-icon small color="primary">{{iconFromNodeType(item)}}</v-icon>
		</template>
		<template v-slot:label="{item}">
			<div class="inner-item">
				<span>{{item.name}}</span>
				<span v-html="typeFromNodeType(item)"></span>
				<span v-html="valueFromNodeType(item)"></span>
			</div>
		</template>
	</v-treeview>
</template>

<script lang="ts">
	import Vue                                                                from 'vue';
	import Component                                                          from 'vue-class-component';
	import {Mutation, State}                                                  from 'vuex-class';
	import {CONFIG_NAMESPACE}                                                 from '@/utils/store/store';
	import {CONFIG_MUTATIONS, ConfigState}                                    from '@/utils/store/config.store';
	import {Prop}                                                             from 'vue-property-decorator';
	import {Branch, EComplexType, EScalarType, INode, NODE_TYPE, ScalarValue} from '../../../../common/data-types';


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
				children: this.parseRootChildren(),
			}];
		}

		setActive(val: INode[]) {
			this.setActiveValue(val);
		}

		parseValues(source: (ScalarValue)[] | undefined): INode[] {
			if (!source) {
				return [];
			}
			const res: INode[] = [];
			for (let i = 0; i < source.length; i++) {
				const currentItem = source[i];
				switch (currentItem.nodeType) {
					case NODE_TYPE.SCALAR:
						res.push({
							id:       currentItem.id,
							nodeType: currentItem.nodeType,
							type:     currentItem.type,
							name:     currentItem.key,
							value:    currentItem.value,
							children: [],
						});
						continue;
				}
			}
			return res;
		}

		parseRootChildren(): INode[] {
			return [
				...this.parseValues(this.branch?.scalarValues),
			];
		}

		iconFromNodeType(item: { nodeType: NODE_TYPE }): string {
			switch (item.nodeType) {
				case NODE_TYPE.ROOT:
					return 'mdi-source-branch';
				default:
					return 'mdi-code-tags';
			}
		}

		typeFromNodeType(item: { nodeType: NODE_TYPE, type?: EScalarType | EComplexType }) {
			switch (item.nodeType) {
				case NODE_TYPE.ROOT:
					return ':';
				case NODE_TYPE.SCALAR:
					return `&nbsp;(<strong>${item.type}</strong>):`;
			}
		}

		valueFromNodeType(item: { nodeType: NODE_TYPE, type?: EScalarType | EComplexType, value: any }) {
			if (item.nodeType !== NODE_TYPE.SCALAR) {
				return '';
			}
			switch (item.type) {
				case EScalarType.NUMBER:
					return `<span class="indigo--text text--lighten-1">${item.value}</span>`;
				case EScalarType.BOOLEAN:
					return `<span class="yellow--text text--darken-3">${item.value}</span>`;
				case EScalarType.STRING:
					return `<span class="green--text text--darken-1">"${item.value}"</span>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.inner-item {
		max-width : 200px;
		display   : flex;

		span:last-child {
			margin-left : 24px;
		}
	}
</style>