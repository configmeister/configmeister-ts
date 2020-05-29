<!--<template>-->
<!--	<v-layout column>-->
<!--		<template v-if="currentValue">-->
<!--			<template v-for="(item, index) in controls">-->
<!--				<v-subheader :key="'s' + index" v-if="item.subheader">{{item.subheader}}</v-subheader>-->
<!--				<component v-for="(c, index) in item.components" :key="index" :is="c" :data="item.data"></component>-->
<!--			</template>-->
<!--		</template>-->
<!--		<template v-else>-->
<!--			<div class="body-2 ma-4">{{controls[0]}}</div>-->
<!--		</template>-->
<!--	</v-layout>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--	import Vue                from 'vue';-->
<!--	import Component          from 'vue-class-component';-->
<!--	import {Getter}           from 'vuex-class';-->
<!--	import {CONFIG_GETTERS}   from '@/utils/store/config.store';-->
<!--	import {CONFIG_NAMESPACE} from '@/utils/store/store';-->
<!--	import {CurrentLocation}  from '@/utils/lang';-->
<!--	import AddValue           from '@/components/ConfigurationControls/components/AddValue.vue';-->
<!--	import {INode, NODE_TYPE} from '../../../../common/data-types';-->

<!--	@Component-->
<!--	export default class ControlsValue extends Vue {-->
<!--		@Getter(CONFIG_GETTERS.SELECTED_VALUE, {namespace: CONFIG_NAMESPACE}) currentValue: INode | undefined;-->

<!--		get controls() {-->
<!--			if (!this.currentValue) {-->
<!--				return [CurrentLocation().controls.selectValue];-->
<!--			}-->

<!--			switch (this.currentValue.nodeType) {-->
<!--				case NODE_TYPE.ROOT:-->
<!--					return [-->
<!--						{-->
<!--							subheader:  CurrentLocation().controls.addValue,-->
<!--							components: [AddValue],-->
<!--						},-->
<!--					];-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->