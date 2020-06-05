<template>
	<v-card class="card-width">
		<v-card-title>
			<v-text-field class="search-width" dense outlined label="Search by key..." append-icon="mdi-magnify"></v-text-field>
		</v-card-title>
		<v-card-text>
			<v-treeview dense activatable :items="treeview" @update:active="onActiveUpdate" return-object>
				<template v-slot:prepend="{item}">
					<v-icon small color="#000000">{{getIconFromItem(item)}}</v-icon>
				</template>
				<template v-slot:label="{item}">
					<span class="">{{getLabelFromItem(item).label}}</span>
					<span :class="getLabelFromItem(item).type.class" v-if="item.type">{{item.type.text}}</span>
					<span>:</span>
				</template>
				<template v-slot:append="{item}">
					<span v-html="getValueFromItem(item)"></span>
				</template>
			</v-treeview>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import Vue                                from 'vue';
	import Component                          from 'vue-class-component';
	import {Prop}                             from 'vue-property-decorator';
	import {ConfigurationWrapper}             from '@/utils/wrappers/configuration.wrapper';
	import {ITreeviewNode, ITreeviewNodeType} from '../../../../common/types/common.types';
	import {EComplexType, IComplexFull}       from '../../../../common/types/complex.types';
	import {IBranchFull}                      from '../../../../common/types/branch.types';

	@Component
	export default class ConfigurationTreeView extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;


		get treeview(): ITreeviewNode[] {
			if (!this.configuration) {
				return [];
			}
			return [{
				id:           this.configuration!.currentBranch!._id,
				name:         this.configuration!.currentBranch!.name,
				nodeType:     ITreeviewNodeType.BRANCH,
				children:     [],
				raw:          this.configuration!.currentBranch as IBranchFull,
				directParent: null,
			}];
		}

		getIconFromItem(item: ITreeviewNode) {
			switch (item.nodeType) {
				case ITreeviewNodeType.BRANCH:
					return 'mdi-source-branch';
				case ITreeviewNodeType.COMPLEX:
					switch ((item.raw as IComplexFull).type) {
						case EComplexType.OBJECT:
							return 'mdi-code-braces';
						case EComplexType.ARRAY:
							return 'mdi-code-brackets';
					}
					break;
				default:
					return 'mdi-code-tags';
			}
		}

		getLabelFromItem(item: ITreeviewNode) {
			switch (item.nodeType) {
				case ITreeviewNodeType.BRANCH:
					return {
						label: item.name,
					};
			}
		}

		getValueFromItem(item: ITreeviewNode) {

		}

		onActiveUpdate(e: ITreeviewNode[]) {
			this.configuration!.currentValue = e[0] || null;
		}
	}
</script>

<style scoped>
	.card-width {
		width : calc(60% - 12px);
	}


	.search-width {
		max-width : 300px;
	}
</style>