<template>
	<!-- 已经参与的活动 -->
	<view>
		<active :activeList="activeList"></active>
	</view>
</template>

<script>
	import active from '../template/acitveTp.vue'
	// 模拟数据
	import activeJson from '../../data/Active.js'
	export default {
		data() {
			return {
				activeList:activeJson.partActive
			}
		},
		components:{
			active
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
</style>
