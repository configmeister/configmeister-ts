<template>
	<v-layout column fill-height fill-width justify-center align-center>
		<slot></slot>
	</v-layout>
</template>

<script lang="ts">
	import Vue       from 'vue';
	import Component from 'vue-class-component';

	@Component
	export default class LayoutCenter extends Vue {}
</script>

