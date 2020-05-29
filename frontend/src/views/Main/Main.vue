<template>
	<layout-column>
		<user-recent-configurations></user-recent-configurations>
		<configuration-list></configuration-list>
	</layout-column>
</template>

<script lang="ts">
	import Vue                      from 'vue';
	import Component                from 'vue-class-component';
	import LayoutColumn             from '@/layouts/LayoutColumn.vue';
	import UserRecentConfigurations from '@/components/UserRecentConfigurations/UserRecentConfigurations.vue';
	import ConfigurationList        from '@/components/ConfigurationList/ConfigurationList.vue';

	@Component({
		components: {ConfigurationList, UserRecentConfigurations, LayoutColumn},
	})
	export default class Main extends Vue {

	}
</script>

<style scoped>

</style>