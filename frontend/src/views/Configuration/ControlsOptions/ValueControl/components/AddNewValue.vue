<template>
	<v-layout column>
		<v-subheader>Add new value</v-subheader>
		<v-container>
			<v-row>
				<v-col>
					<v-select label="Node Type" dense :items="nodeTypes" v-model="value.nodeType"></v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field label="Node Name" dense v-model="value.nodeName" :disabled="nodeNameDisabled"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="3">
					<v-select label="Value Type" dense :items="valueTypes" v-model="value.valueType"></v-select>
				</v-col>
				<v-col>
					<v-text-field label="Value" dense v-model="value.value"></v-text-field>
				</v-col>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script lang="ts">
	import Vue                                                from 'vue';
	import Component                                          from 'vue-class-component';
	import {Prop}                                             from 'vue-property-decorator';
	import {ConfigurationWrapper, ConfigurationWrapperEvents} from '@/utils/wrappers/configuration.wrapper';
	import {IAddNewValueVueModel, ITreeviewNodeType}          from '../../../../../../../common/types/common.types';
	import {EScalarType}                                      from '../../../../../../../common/types/scalar.types';
	import {EComplexType}                                     from '../../../../../../../common/types/complex.types';


	@Component
	export default class AddNewValue extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;
		@Prop() value: IAddNewValueVueModel | undefined;

		@Prop() baseNodeName: string = '';
		@Prop() baseNodeType: ITreeviewNodeType = ITreeviewNodeType.SCALAR;
		@Prop() baseValueType: EScalarType | EComplexType = EScalarType.STRING;
		@Prop() baseValue: string = '';


		private nodeNameDisabled: boolean = false;

		updateSelf() {
			this.$emit('input', {
				nodeName:  this.baseNodeName,
				nodeType:  this.baseNodeType,
				valueType: this.baseValueType,
				value:     this.baseValue,
			});
		}

		async mounted() {
			await this.$nextTick();
			this.configuration?.on(ConfigurationWrapperEvents.CURRENT_VALUE_CHANGED, () => {
				this.updateSelf();
			});
		}
	}
</script>

<style scoped>

</style>