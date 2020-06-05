<template>
	<v-layout column>
		<add-new-value :configuration="configuration" v-model="addNewValue"></add-new-value>
	</v-layout>
</template>

<script lang="ts">
	import Vue                    from 'vue';
	import Component              from 'vue-class-component';
	import {Prop}                 from 'vue-property-decorator';
	import {ConfigurationWrapper} from '@/utils/wrappers/configuration.wrapper';
	import AddNewValue            from '@/views/Configuration/ControlsOptions/ValueControl/components/AddNewValue.vue';

	@Component({
		components: {AddNewValue},
	})
	export default class BranchValueControl extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;

		private addNewValue = {};
	}
</script>

<style scoped>

</style>