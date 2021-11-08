<template>
	<view class="container">
		<view class="msgTop">
			<block v-for="(item,index) in msgTypeList" :key="index">
				<view class="topType">
					<view :class="typeIndex == item.id ? 'topTextContainer':'noTopTextContainer'" @click="selectType(item.id)">
						<text class="topText">{{item.content}}</text>
					</view>
				</view>
			</block>
		</view>
		
		<view class="msgContainer">
			<!-- 轮播效果 -->
			<swiper class="swiper" @change="touchScreen" :current="typeIndex">
				<block v-for="index in msgTypeList.length" :key="index">
					<swiper-item>
						<scroll-view scroll-y class="scrollView">
							<block v-for="(item,index) in msgInfoList" :key="index">
								<view class="partContainer">
									<view class="time">{{item.data}}</view>
									<view class="textContainer">
										<view class="msgText">
											{{item.content}}
											<text class="currentTime">{{item.time}}</text>
										</view>
									</view>
								</view>
							</block>
							<view class="bottom">
								<view class="bottomText">没有更多消息了</view>
							</view> 
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
			<!-- 方案一 -->
			<!-- <scroll-view scroll-y class="scrollView">
				<block v-if="typeIndex == 0">
					<block v-for="(item,index) in msgInfoList" :key="index">
						<view class="partContainer">
							<view class="time">{{item.data}}</view>
							<view class="textContainer">
								<view class="msgText">
									{{item.content}}
									<text class="currentTime">{{item.time}}</text>
								</view>
							</view>
						</view>
					</block>
				</block>
				<block v-if="typeIndex == 1">
					<block v-for="(item,index) in SmsgInfoList" :key="index">
						<view class="partContainer">
							<view class="time">{{item.data}}</view>
							<view class="textContainer">
								<view class="msgText">
									{{item.content}}
									<text class="currentTime">{{item.time}}</text>
								</view>
							</view>
						</view>
					</block>
				</block>
				<view class="bottom">
					<view class="bottomText">没有更多消息了</view>
				</view> 
			</scroll-view> -->
		</view>
	</view>
</template>
	
<script>
	// 消息数据（后期可删）
	import msgJson from '../../data/Msg.js'
	
	import { MSGTYPELIST } from '../../data/TotalData.js'
	export default {
		data() {
			return { 
				// 消息类型数组
				msgTypeList:MSGTYPELIST,
				// 消息内容数组
				msgInfoList:msgJson.msgInfoList,
				// 默认选择提醒消息
				typeIndex:0,
				currentIndex:0
			}
		},
		methods: {
			// 更新页面
			async updatePage(){
				if(this.typeIndex == 0){
					this.msgInfoList = msgJson.msgInfoList
				}else if(this.typeIndex == 1){
					this.msgInfoList = msgJson.SmsgInfoList
				}else if(this.typeIndex == 2){
					this.msgInfoList = msgJson.zanInfoList
				}else{
					this.msgInfoList = msgJson.otherMsgList
				}
			},
			selectType(index){
				// 修改导航参数
				this.typeIndex = index
				this.updatePage();
			},
			touchScreen(res){
				// console.log(res.detail.current);
				let index = res.detail.current;
				this.typeIndex = index;
				this.updatePage();
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		padding: 0;
		background-color: white;
	}
	.container{
		width: 100%;
		height: 100%;
	}
	.msgTop{
		width: 100%;
		height: 80upx;
		background-color: rgba(239,239,239,1);
		display: flex;
	}
	.topType{
		width: 25%;
		height: 100%;
		text-align: center;
	}
	.topTextContainer{
		width: 128upx;
		height: 68upx;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		margin-top: 10upx;
		border-bottom: 2px solid rgba(185, 27, 35, 1.0);
	}
	.noTopTextContainer{
		width: 128upx;
		height: 68upx;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		margin-top: 10upx;
		border-bottom: 2px;
	}
	.topText{
		color: rgba(185, 27, 35, 1.0);
		font-size: 30upx;
		font-weight: 500;
	}
	.msgContainer{
		width: 94%;
		height: 88%;
		margin-left: 3%;
		margin-top: 20upx;
		background-color: white;
	}
	.scrollView{
		width: 100%;
		height: 100%;
	}
	.partContainer{
		width: 98%;
		margin-left: 1%;
		margin-bottom: 40upx;
		height: auto;
		border-radius: 1%;
	}
	.time{
		text-align: center;
		font-size: 26upx;
		font-weight: 400;
	}
	.textContainer{
		width: 100%;
		height: auto;
		/* background-color: rgba(237,248,254,1); */
		background-color: rgba(248, 248, 242, 1.0);
		padding: 30upx;
		padding-top: 20upx;
		margin-top: 15upx;
		padding-bottom: 30upx;
	}
	.msgText{
		font-size: 30upx;
		color: rgba(153,153,153,1);
		font-weight: 500;
	}
	.currentTime{
		font-size: 24upx;
		color: rgba(203,204,206,1);
	}
	.bottom{
		width: 100%;
		height: 60upx;
		text-align: center;
	}
	.bottomText{
		font-size: 30upx;
		font-weight: 500;
		height: 50upx;
	}
	.swiper{
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
