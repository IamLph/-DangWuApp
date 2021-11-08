<template>
	<view class="container">
		<view class="top">
			学习新思想，争做新青年！
		</view>
		<view class="classVideoContainer">
			<scroll-view scroll-y class="scrollView">
				<block v-for="(item,index) in videoInfoList" :key="index">
					<view class="unitPart" @click="watchVideo(item.videoUrl,item.id,item.videoName,item.initiaTime,item.videoIsOK)">
						<view class="partContainer">
							<view class="classImgContainer">
								<image class="classImg" :src="item.videoImg">
								</image>
							</view>
							<view class="contentContainer">
								<view class="contentTitle">{{item.videoName}}</view>
								<view class="contentInfo">
									<view v-if="item.videoInfo.length > 24">
										{{item.videoInfo.substring(0,24)}}...
									</view>
									<view v-else>
										{{item.videoInfo}}
									</view>
								</view>
								
								<view class="contentTime">
									<view>
										发布时间:{{item.publishTime}}
									</view>
									<view>剩余时间:13分</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import classJson from '../../data/VideoStudy.js'
	export default{
		data(){
			return{
				videoInfoList:classJson.videoInfoList,
			}
		},
		onLoad(option){
			let id = option.id;
			let className = option.name
			// 修改标题
			uni.setNavigationBarTitle({
			    title: className
			});
		},
		methods:{
			/**
			 * @param {Object} url 传递视频的地址
			 * @param {Object} id 视频id
			 */
			watchVideo(url,id,videoName,initiaTime,videoIsOK){
				uni.navigateTo({
					url:'/pages/otherComponent/watchVideo?id='+id,
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('watchVideo', { 
							url:url,
							name:videoName,
							initiaTime:initiaTime,
							videoIsOK:videoIsOK
						})
					}
				})
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
	.container{
		width: 100%;
		height: 100%;
	}
	.top{
		width: 100%;
		height: 80upx;
		/* background-color: rgba(255, 255, 0, 1.0); */
		text-align: center;
		font-size: 36upx;
		line-height: 80upx;
	}
	.classVideoContainer{
		width: 100%;
		height: 92%;
		padding: 10px 20upx 20upx 20upx;
		display: inline-block;
	}
	.scrollView{
		height: 100%;
		width: 100%;
		padding: 10upx 14upx 10upx 20upx;
	}
	.unitPart{
		width: 100%;
		height: 230upx;
		padding-bottom: 30upx;
		margin-bottom: 30upx;
		border-bottom: 1px solid rgba(229, 227, 228, 1.0);
		/* background-color: pink; */
	}
	.classImgContainer{
		width: 300upx;
		height: 200upx;
		border-radius: 0.4em;
		/* background-color: #0066CC; */
	}
	.classImg{
		width: 300upx;
		height: 200upx;
		border-radius: 0.4em;
	}
	.partContainer{
		display: flex;
	}
	.contentContainer{
		display: inline-block;
		margin-left: 18upx;
		position: relative;
		width: 100%;
	}
	.contentTitle{
		margin-top: 10upx;
		font-size: 30upx;
		font-weight: 600;
	}
	.contentInfo{
		/* background-color: green; */
		font-size: 27upx;
		font-weight: 400;
	}
	.contentTime{
		position: absolute;
		bottom: 4upx;
		font-size: 26upx;
		font-weight: 400;
		color: rgba(153,153,153,1);
	}
		
</style>
