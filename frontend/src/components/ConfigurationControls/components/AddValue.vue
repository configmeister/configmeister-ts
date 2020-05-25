<template>
	<v-layout column class="pa-4">
		<v-select label="Node Type" :items="nodeTypes" v-model="nodeType"></v-select>
		<v-text-field label="Node Key" v-model="itemKey" :error-messages="nodeKeyError"></v-text-field>
		<v-layout row align-center class="pl-4 pr-4">
			<v-select label="Item Type" :items="computedItemType" v-model="itemType" style="max-width: 200px;" class="mr-3"></v-select>
			<template v-if="showItemValueInput">
				<v-text-field label="Item Value" v-if="computedItemCanBeInputAsString" :type="valueInputType" v-model="itemValue" :error-messages="itemValueError"></v-text-field>
				<v-checkbox v-else v-model="itemValue" label="Item Value"></v-checkbox>
			</template>
		</v-layout>
		<v-btn color="primary" @click="addValue">Submit</v-btn>
	</v-layout>
</template>

<script lang="ts">
	import Vue                         from 'vue';
	import Component                   from 'vue-class-component';
	import {EComplexType, EScalarType} from '../../../../../common/data-types';
	import {Watch}                     from 'vue-property-decorator';
	import {Getter}                    from 'vuex-class';
	import {CONFIG_GETTERS, INode}     from '@/utils/store/config.store';
	import {CONFIG_NAMESPACE}          from '@/utils/store/store';
	import {API}                       from '@/utils/api';

	export enum EItemType {
		SCALAR  = 'Scalar',
		COMPLEX = 'Complex'
	}

	@Component
	export default class AddValue extends Vue {
		@Getter(CONFIG_GETTERS.SELECTED_VALUE, {namespace: CONFIG_NAMESPACE}) selectedValue: INode | undefined;

		private nodeType: EItemType = EItemType.SCALAR;
		private nodeTypes: EItemType[] = [
			EItemType.SCALAR,
			EItemType.COMPLEX,
		];

		private itemKey: string = '';

		private itemType: string = EScalarType.STRING;

		private itemValue: string | number | boolean | undefined;

		private addingValue: boolean = false;
		private nodeKeyError: string[] = [];
		private itemValueError: string[] = [];

		@Watch('nodeType')
		watchNodeType() {
			switch (this.nodeType) {
				case EItemType.COMPLEX:
					this.itemType = EComplexType.OBJECT;
					break;
				case EItemType.SCALAR:
					this.itemType = EScalarType.STRING;
			}
		}

		@Watch('itemKey')
		watchItemKey() {
			this.nodeKeyError = [];
		}

		get computedItemType(): string[] {
			switch (this.nodeType) {
				case EItemType.SCALAR:
					return [
						EScalarType.BOOLEAN,
						EScalarType.STRING,
						EScalarType.NUMBER,
					];
				case EItemType.COMPLEX:
					return [
						EComplexType.ARRAY,
						EComplexType.OBJECT,
					];
				default:
					return [];
			}
		}

		get showItemValueInput() {
			return this.nodeType === EItemType.SCALAR;
		}

		get computedItemCanBeInputAsString() {
			return this.itemType !== EScalarType.BOOLEAN;
		}

		get valueInputType() {
			return this.itemType === EScalarType.NUMBER ? 'number' : 'text';
		}

		async validate(): Promise<boolean> {
			if (this.itemKey.length === 0) {
				this.nodeKeyError = ['Node Key must have at least 1 character'];
				return false;
			}
			if (this.nodeType === EItemType.SCALAR && this.itemType !== EScalarType.BOOLEAN && (typeof this.itemValue !== this.itemType)) {
				this.itemValueError = ['Please provide a valid value'];
				return false;
			}


			const res = await API.validateValueToBeAdded(this.selectedValue, {
				nodeType:  this.nodeType,
				nodeKey:   this.itemKey,
				itemType:  this.itemType,
				itemValue: JSON.stringify(this.itemValue),
			});
			return !(res && res.error);
		}

		async addValue() {
			this.addingValue = true;
			const res = await this.validate();
			if (!res) {
				this.addingValue = false;
				return;
			}
			const result = await API.addValue(this.selectedValue, {
				nodeType:  this.nodeType,
				nodeKey:   this.itemKey,
				itemType:  this.itemType,
				itemValue: JSON.stringify(this.itemValue),
			});
			if (result && result.error) {
				this.addingValue = false;
				return;
			}
		}
	}
</script>

<style scoped>

</style>