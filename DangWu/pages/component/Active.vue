<template>
	<!-- 活动导航栏内容 -->
	<view class="containerV">
		<active :activeList="activeList"/>
			
		</active>
	</view>
</template>
	
<script>
	import active from '../template/acitveTp.vue'
	// 活动信息（后期可删）
	import activeJson from '../../data/Active.js'
	export default {
		data() {
			return {
				activeList:activeJson.activeList
			}
		},
		onLoad(){
			let isHaveData = this.activeList;
			uni.showLoading({
			    title: '加载中'
			});
			// 模拟网络加载延迟
			if(isHaveData == ""){
				console.log("没有数据")
			}else{
				console.log("有数据")
				uni.hideLoading();
			}
		},
		components:{
			active
		},
	}
</script>

<style>
	page{
		background-color: rgb(255,255,255);
		width: 100%;
		height: 100%;
	}
	.containerV{
		width: 100%;
		height: 100%;
	}
	.isOver{
		position: absolute;
		margin-left: 10upx;
		margin-top: 10upx;
		border-radius: 0.3em;
		/* width: 80rpx; */
		height: 40rpx;
		top: 0;
		border: 1px solid rgb(236, 236, 236);
		background-color: white;
		text-align: center;
		font-size: 20rpx;
		padding: 5upx;
		font-weight: 400;
	}
	.active_time{
		margin-top: 10rpx;
		color: rgba(255,187,152,1);
	}
	.active_title{
		margin-top: 10rpx;
		font-size: 27rpx;
		font-weight: 400;
		color: rgb(4,3,9);
	}
	.active_type{
		position: absolute;
		font-size: 25upx;
		margin-top: 10upx;
		color: rgba(127,127,127,1);
	}
</style>
