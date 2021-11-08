<template>
	<!-- 活动模板 -->
	<scroll-view scroll-y class="container">
		<block v-for="(item,index) in activeList" :key="index">
			<view class="active" @click="getActiveInfo(item.id)">
				<div class="active_card">
					<view class="view_img">
						<image :src="item.img" class="active_image"/>
						<view class="isOver">{{item.state}}</view>
					</view>
					<view class="active_time">{{item.time}}</view>
					<view class="active_title">
						<text space="emsp" decode=true >
							<block v-if="item.title.length > 18">
								{{item.title.substring(0,18)}}......
							</block>
							<block v-else>
								{{item.title}}
							</block>
						</text>
					</view>
					<view class="active_type">{{item.type}}</view>
				</div>
			</view>
		</block>
	</scroll-view>
</template>

<script>
	export default {
		props:["activeList"],
		methods: {
			getActiveInfo(id){
				uni.navigateTo({
					url:'/pages/otherComponent/ActiveInfo?id='+id,
				})
			}
		}
	}
</script>
	
<style>
	.container{
		margin: 0;
		padding: 0;
		width: 100%;
		height: 98%;
		padding: 1% 1%;
		margin-top: 10upx;
	}
	.active{
		width: 50%;
		height: 400rpx;
		float: left;
		margin-top: 10upx;
	}
	.active_card{
		width: 90%;
		background-color: rgb(255,255,255);
		margin-left: auto;
		margin-right: auto;
		height: 400upx;
		position: relative;
	}
	.view_img{
		width: 100%;
		height: 200rpx;
		text-align: center;
		padding: 0;
	}
	.active_image{
		width: 100%;
		height: 100%;
		border-radius: 0.3em;
	}
	.isOver{
		position: absolute;
		margin-left: 10upx;
		margin-top: 10upx;
		border-radius: 0.3em;
		width: 80rpx;
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
