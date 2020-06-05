<template>
	<v-layout column>
		<component :is="currentControlComponent" :configuration="configuration"></component>
	</v-layout>
</template>

<script lang="ts">
	import Vue, {VueConstructor}  from 'vue';
	import Component              from 'vue-class-component';
	import {Prop}                 from 'vue-property-decorator';
	import {ConfigurationWrapper} from '@/utils/wrappers/configuration.wrapper';
	import {ITreeviewNodeType}    from '../../../../../../common/types/common.types';
	import BranchValueControl     from '@/views/Configuration/ControlsOptions/ValueControl/BranchValueControl.vue';
	import ComplexValueControl    from '@/views/Configuration/ControlsOptions/ValueControl/ComplexValueControl.vue';
	import ScalarValueControl     from '@/views/Configuration/ControlsOptions/ValueControl/ScalarValueControl.vue';

	@Component
	export default class ValueControl extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;

		get currentControlComponent(): VueConstructor | null {
			switch (this.configuration?._currentValue.nodeType) {
				case ITreeviewNodeType.BRANCH:
					return BranchValueControl;
				case ITreeviewNodeType.COMPLEX:
					return ComplexValueControl;
				case ITreeviewNodeType.SCALAR:
					return ScalarValueControl;
				default:
					return null;
			}
		}
	}
</script>

<style scoped>

</style>