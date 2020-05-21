<template>
	<layout-column fill-height>
		<v-overlay v-if="loading">
			<v-layout justify-center align-center>
				<v-progress-circular indeterminate color="secondary"></v-progress-circular>
			</v-layout>
		</v-overlay>
	</layout-column>
</template>

<script lang="ts">
	import Vue                           from 'vue';
	import Component                     from 'vue-class-component';
	import {Action, State}               from 'vuex-class';
	import {CONFIG_NAMESPACE}            from '@/utils/store/store';
	import {CONFIG_ACTIONS, ConfigState} from '@/utils/store/config.store';
	import LayoutColumn                  from '@/layouts/LayoutColumn.vue';

	@Component({
		components: {LayoutColumn},
	})
	export default class Configuration extends Vue {
		@State(CONFIG_NAMESPACE) configState: ConfigState | undefined;
		@Action(CONFIG_ACTIONS.GET_CURRENT_CONFIGURATION, {namespace: CONFIG_NAMESPACE}) getCurrentConfiguration: any;

		private loading: boolean = true;

		async mounted() {
			await this.getCurrentConfiguration(this.$route.params.id);
			this.loading = false;
		}
	}
</script>

<style scoped>

</style>