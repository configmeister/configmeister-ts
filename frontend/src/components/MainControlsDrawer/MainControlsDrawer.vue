<!--<template>-->
<!--	<v-navigation-drawer app color="primary">-->
<!--		<v-list dark>-->
<!--			<v-list-item>-->
<!--				<v-list-item-avatar color="secondary">-->
<!--					<span class="primary&#45;&#45;text">{{user.username[0].toUpperCase()}}</span>-->
<!--				</v-list-item-avatar>-->
<!--				<v-list-item-content>-->
<!--					<v-list-item-title>{{user.username}}</v-list-item-title>-->
<!--					<v-list-item-subtitle class="overline">{{user.roles.join(', ')}}</v-list-item-subtitle>-->
<!--				</v-list-item-content>-->
<!--			</v-list-item>-->
<!--			<v-divider></v-divider>-->
<!--			<v-list-item v-for="item in userActions" :key="item.text" :to="item.path" @click="parseClick(item)">-->
<!--				<v-list-item-icon>-->
<!--					<v-icon>{{item.icon}}</v-icon>-->
<!--				</v-list-item-icon>-->
<!--				<v-list-item-content>-->
<!--					<v-list-item-title>{{item.text}}</v-list-item-title>-->
<!--					<v-list-item-subtitle v-if="item.subheader">{{item.subheader}}</v-list-item-subtitle>-->
<!--				</v-list-item-content>-->
<!--			</v-list-item>-->
<!--		</v-list>-->
<!--	</v-navigation-drawer>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--	import Vue              from 'vue';-->
<!--	import Component        from 'vue-class-component';-->
<!--	import {State}          from 'vuex-class';-->
<!--	import {USER_NAMESPACE} from '@/utils/store/store';-->
<!--	import {UserState}      from '@/utils/store/user.store';-->
<!--	import {ROOTS}          from '@/utils/roots';-->

<!--	type UserActionType = {-->
<!--		text: string;-->
<!--		path?: string;-->
<!--		icon: string;-->
<!--		customHandler?: Function;-->
<!--	}-->

<!--	@Component-->
<!--	export default class MainControlsDrawer extends Vue {-->
<!--		@State(USER_NAMESPACE) user: UserState | undefined;-->

<!--		parseClick(item: UserActionType) {-->
<!--			if (item.customHandler) {-->
<!--				return item.customHandler();-->
<!--			}-->
<!--			return;-->
<!--		}-->

<!--		get userActions(): UserActionType[] {-->
<!--			return [{-->
<!--				text: 'Configurations',-->
<!--				path: ROOTS.MAIN,-->
<!--				icon: 'mdi-text-box',-->
<!--			}, {-->
<!--				text: 'New Configuration',-->
<!--				path: ROOTS.CREATE_CONFIGURATION,-->
<!--				icon: 'mdi-plus',-->
<!--			}, {-->
<!--				text:          'Logout',-->
<!--				customHandler: () => {-->
<!--					window.location.replace('/logout');-->
<!--				},-->
<!--				icon:          'mdi-logout',-->
<!--			}];-->
<!--		}-->
<!--	}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->