<template>
	<v-layout column class="column-layout" :class="computedClasses">
		<slot></slot>
	</v-layout>
</template>

<script lang="ts">
	import Vue       from 'vue';
	import Component from 'vue-class-component';
	import {Prop}    from 'vue-property-decorator';

	@Component
	export default class LayoutColumn extends Vue {
		@Prop({type: Boolean, default: () => false}) fillHeight: boolean | undefined;

		get computedClasses() {
			const classes = [];
			if (this.fillHeight) {
				classes.push('column-layout--fill-height');
			}
			return classes;
		}
	}
</script>

<style lang="scss" scoped>
	.column-layout {
		padding : 40px;

		&--fill-height {
			min-height : 100%;
		}
	}
</style>