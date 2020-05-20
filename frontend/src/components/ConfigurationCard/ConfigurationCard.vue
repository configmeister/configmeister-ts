<template>
	<v-card width="256" class="ma-3">
		<v-card-title class="body-1">{{name}}</v-card-title>
		<v-card-subtitle class="caption">Last updated: {{parseDate}}</v-card-subtitle>
		<v-divider></v-divider>
		<v-card-actions>
			<v-btn class="btn" small color="primary" text :to="getTo">Edit</v-btn>
			<v-spacer></v-spacer>
			<v-dialog v-model="deleteDialogShown" width="512">
				<template v-slot:activator="{on}">
					<v-btn class="btn" small color="error" text v-on="on">Delete</v-btn>
				</template>
				<v-card>
					<v-card-title>Are you sure want to delete {{name}}?</v-card-title>
					<v-card-text>
						This action is permament.
					</v-card-text>
					<v-card-actions>
						<v-btn color="error" text @click="deleteConfiguration" :loading="deleteInProcess">Proceed</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="deleteDialogShown = false">Cancel</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card-actions>

		<v-dialog></v-dialog>
	</v-card>
</template>

<script lang="ts">
	import Vue       from 'vue';
	import Component from 'vue-class-component';
	import {Prop}    from 'vue-property-decorator';
	import moment    from 'moment';
	import {ROOTS}   from '@/utils/roots';

	@Component
	export default class ConfigurationCard extends Vue {
		@Prop({required: true}) name: string | undefined;
		@Prop({required: true}) id: number | undefined;
		@Prop({required: true}) updatedAt: Date | undefined;

		private deleteDialogShown: boolean = false;
		private deleteInProcess: boolean = false;

		get parseDate() {
			return moment(this.updatedAt).format('DD.MM.YY HH:mm:ss');
		}

		get getTo() {
			return `${ROOTS.CONFIGURATION}${this.id}`;
		}

		async deleteConfiguration() {
			// @todo add configuration deletion and store update
			this.deleteInProcess = true;
			setTimeout(() => {
				this.deleteInProcess = false;
				this.deleteDialogShown = false;
			}, 1000);
		}

	}
</script>

<style lang="scss" scoped>
	.btn {
		width : 100px;
	}
</style>