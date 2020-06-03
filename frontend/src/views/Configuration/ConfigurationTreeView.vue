<template>
	<div>treeview</div>
</template>

<script lang="ts">
	import Vue                    from 'vue';
	import Component              from 'vue-class-component';
	import {Prop}                 from 'vue-property-decorator';
	import {ConfigurationWrapper} from '../../utils/wrappers/configuration.wrapper';

	@Component
	export default class ConfigurationTreeView extends Vue {
		@Prop({required: true, type: Object}) configuration: ConfigurationWrapper | undefined;
	}
</script>

<style scoped>

</style>