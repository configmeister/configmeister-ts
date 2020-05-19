<template>
	<v-app>
		<v-content app>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script lang="ts">
	import Vue       from 'vue';
	import Component from 'vue-class-component';

	@Component
	export default class App extends Vue {
	}
</script>

<style>
	html, body {
		background-color : #fefefe;
		overflow-y       : auto !important;
	}

	.v-application {
		background : #fefefe !important;
	}
</style>