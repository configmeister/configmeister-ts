<template>
	<v-layout column class="column-layout">
		<slot></slot>
	</v-layout>
</template>

<script lang="ts">
	import Vue       from 'vue';
	import Component from 'vue-class-component';

	@Component
	export default class LayoutColumn extends Vue {

	}
</script>

<style lang="scss" scoped>
	.column-layout {
		padding : 40px;
	}
</style>