<!--<template>-->
<!--	<v-layout column class="pa-4">-->
<!--		<v-select label="Node Type" :items="nodeTypes" v-model="nodeType"></v-select>-->
<!--		<v-text-field label="Node Key" v-model="itemKey" :error-messages="nodeKeyError"></v-text-field>-->
<!--		<v-layout row align-center class="pl-4 pr-4">-->
<!--			<v-select label="Item Type" :items="computedItemType" v-model="itemType" style="max-width: 200px;" class="mr-3"></v-select>-->
<!--			<template v-if="showItemValueInput">-->
<!--				<v-text-field label="Item Value" :type="valueInputType" v-model="itemValue" :error-messages="itemValueError"></v-text-field>-->
<!--			</template>-->
<!--		</v-layout>-->
<!--		<v-btn color="primary" @click="addValue" :loading="addingValue">Submit</v-btn>-->
<!--	</v-layout>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--	import Vue                                                          from 'vue';-->
<!--	import Component                                                    from 'vue-class-component';-->
<!--	import {Configuration, EComplexType, EScalarType, INode, NODE_TYPE} from '../../../../../common/data-types';-->
<!--	import {Watch}                                                      from 'vue-property-decorator';-->
<!--	import {Action, Getter, State}                                      from 'vuex-class';-->
<!--	import {CONFIG_ACTIONS, CONFIG_GETTERS}                             from '@/utils/store/config.store';-->
<!--	import {CONFIG_NAMESPACE}                                           from '@/utils/store/store';-->
<!--	import {API}                                                        from '@/utils/api';-->

<!--	@Component-->
<!--	export default class AddValue extends Vue {-->
<!--		@Action(CONFIG_ACTIONS.GET_CURRENT_CONFIGURATION, {namespace: CONFIG_NAMESPACE}) getCurrentConfiguration: any;-->
<!--		@Getter(CONFIG_GETTERS.SELECTED_VALUE, {namespace: CONFIG_NAMESPACE}) selectedValue: INode | undefined;-->
<!--		@Getter(CONFIG_GETTERS.CURRENT_CONFIGURATION, {namespace: CONFIG_NAMESPACE}) currentConfiguration: Configuration | any;-->

<!--		private nodeType: NODE_TYPE = NODE_TYPE.SCALAR;-->
<!--		private nodeTypes: NODE_TYPE[] = [-->
<!--			NODE_TYPE.SCALAR,-->
<!--			NODE_TYPE.COMPLEX,-->
<!--		];-->

<!--		private itemKey: string = '';-->

<!--		private itemType: string = EScalarType.STRING;-->

<!--		private itemValue: string = '';-->

<!--		private addingValue: boolean = false;-->
<!--		private nodeKeyError: string[] = [];-->
<!--		private itemValueError: string[] = [];-->

<!--		@Watch('nodeType')-->
<!--		watchNodeType() {-->
<!--			switch (this.nodeType) {-->
<!--				case NODE_TYPE.COMPLEX:-->
<!--					this.itemType = EComplexType.OBJECT;-->
<!--					break;-->
<!--				case NODE_TYPE.SCALAR:-->
<!--					this.itemType = EScalarType.STRING;-->
<!--			}-->
<!--		}-->

<!--		@Watch('itemKey')-->
<!--		watchItemKey() {-->
<!--			this.nodeKeyError = [];-->
<!--		}-->

<!--		@Watch('itemValue')-->
<!--		watchItemValue() {-->
<!--			this.itemValueError = [];-->
<!--		}-->

<!--		get computedItemType(): string[] {-->
<!--			switch (this.nodeType) {-->
<!--				case NODE_TYPE.SCALAR:-->
<!--					return [-->
<!--						EScalarType.BOOLEAN,-->
<!--						EScalarType.STRING,-->
<!--						EScalarType.NUMBER,-->
<!--					];-->
<!--				case NODE_TYPE.COMPLEX:-->
<!--					return [-->
<!--						EComplexType.ARRAY,-->
<!--						EComplexType.OBJECT,-->
<!--					];-->
<!--				default:-->
<!--					return [];-->
<!--			}-->
<!--		}-->

<!--		get showItemValueInput() {-->
<!--			return this.nodeType === NODE_TYPE.SCALAR;-->
<!--		}-->

<!--		get valueInputType() {-->
<!--			return this.itemType === EScalarType.NUMBER ? 'number' : 'text';-->
<!--		}-->

<!--		preparedValue() {-->
<!--			switch (this.itemType) {-->
<!--				case EScalarType.STRING:-->
<!--					return this.itemValue;-->
<!--				case EScalarType.NUMBER:-->
<!--					return Number(this.itemValue);-->
<!--				case EScalarType.BOOLEAN:-->
<!--					return this.itemValue === 'true';-->
<!--			}-->
<!--		}-->

<!--		async validate(): Promise<boolean> {-->
<!--			if (this.itemKey.length === 0) {-->
<!--				this.nodeKeyError = ['Node Key must have at least 1 character'];-->
<!--				return false;-->
<!--			}-->
<!--			if (this.nodeType === NODE_TYPE.SCALAR) {-->
<!--				switch (this.itemType) {-->
<!--					case EScalarType.STRING:-->
<!--						if ((this.itemValue as string).length === 0) {-->
<!--							this.itemValueError = ['Please provide a valid string'];-->
<!--							return false;-->
<!--						}-->
<!--						break;-->
<!--					case EScalarType.NUMBER:-->
<!--						if (Number.isNaN(Number(this.itemValue))) {-->
<!--							this.itemValueError = ['Please provide a valid value'];-->
<!--							return false;-->
<!--						}-->
<!--						break;-->
<!--					case EScalarType.BOOLEAN:-->
<!--						if (['true', 'false'].indexOf(this.itemValue) === -1) {-->
<!--							this.itemValueError = ['Value must be either "true" or "false"'];-->
<!--							return false;-->
<!--						}-->
<!--						break;-->
<!--				}-->
<!--			}-->


<!--			const res = await API.validateValueToBeAdded(this.selectedValue, {-->
<!--				nodeType:  this.nodeType,-->
<!--				nodeKey:   this.itemKey,-->
<!--				itemType:  this.itemType,-->
<!--				itemValue: this.preparedValue(),-->
<!--			});-->
<!--			return !(res && res.error);-->
<!--		}-->

<!--		clearInputs() {-->
<!--			this.itemKey = '';-->
<!--			this.itemValue = '';-->
<!--		}-->

<!--		async addValue() {-->
<!--			this.addingValue = true;-->
<!--			const res = await this.validate();-->
<!--			console.log('Validation:', res);-->
<!--			if (!res) {-->
<!--				this.addingValue = false;-->
<!--				return;-->
<!--			}-->
<!--			const result = await API.addValue(this.selectedValue, {-->
<!--				nodeType:  this.nodeType,-->
<!--				nodeKey:   this.itemKey,-->
<!--				itemType:  this.itemType,-->
<!--				itemValue: this.preparedValue(),-->
<!--			});-->
<!--			console.log('Result:', result);-->
<!--			if (result && result.error) {-->
<!--				this.addingValue = false;-->
<!--				return;-->
<!--			}-->
<!--			this.clearInputs();-->
<!--			await this.getCurrentConfiguration(this.currentConfiguration.id);-->
<!--			this.addingValue = false;-->
<!--		}-->
<!--	}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->