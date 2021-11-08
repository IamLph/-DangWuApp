<template>
	<view class="content">
		<!-- 轮播图1 -->
		<swiper class="screen-swiper" 
				:class="dotStyle?'square-dot':'round-dot'" 
				:indicator-dots="true" 
				:circular="true"
				:autoplay="true" 
				:interval="interval" 
				duration="500">
			<swiper-item v-for="(item,index) in indexImgList" :key="item.id" @click="getInfo(item.id)">
				<image :src="item.src" mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
		<!-- 四个小功能 -->
		<view class="gridOp">
			<view class="gridOp_Icon" v-for="(item,index) in opList" :key="index" @click="option(item.id)">
				<view>
					<image :src="item.src" class="gridOp_Img"></image>
				</view>
				<text class="gridOp_Text">{{item.text}}</text>
			</view>
		</view>
		<!-- 新闻公示 -->
		<view class="news_text" @tap="getMorNews()">
			<view class="news_text_view">{{newsTitle}}</view>
			<view class="lg text-gray cuIcon-right , news_text_img"></view>
		</view>	
		<!-- 新闻列表 -->
		<view class="newsScoView">
			<block v-for="(item,index) in newsList" :key="index">
				<!-- 默认渲染三个 -->
				<view class="card_mine" v-if="index < defaultNewsCount">
					<view class="news_title">{{item.title}}</view>
					<view class="news_content_container">
						<text space="emsp" decode=true class="news_content">
							<block v-if="item.content.length > 50">
								{{item.content.substring(0,51)}}......
							</block>
							<block v-else>
								{{item.content}}
							</block>
						</text>
					</view>
					<view class="detail_news_container">  
						<view for="index" class="detail_news" @tap="getInfo(item.id)">
							{{detailNews}}
						</view>
						<view class="lg text-gray cuIcon-right ,  detail_news_img"></view>
					</view>
				</view>
			</block>
		</view>
		<br>
	</view>
</template>

<script>
	//假数据文件 （后期可删）目前：新闻渲染
	import indexJson from '../../data/index.js';
	import { goWithObj } from "../../data/page.js"
	import { AllClass } from "../../api/index.js"
	import * as api from '../../api/api.js'
	import { sildeShow , opList } from '../../data/TotalData.js'
	export default {
		data() {
			return {
				dotStyle: false,
				interval: sildeShow.interval,
				indexJson:indexJson,
				opList:opList,
				indexImgList: sildeShow.indexImgList,
				// 新闻
				newsList: indexJson.newsList,
				// newsTitle
				newsTitle:"新闻公示",
				detailNews:"查看详细",
				// 默认渲染新闻个数
				defaultNewsCount:3,
			}
		},
		onLoad() {
			this.$reoladUser()
		},
		methods: {
			// 第一个轮播图需要，colorUi,不可删
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// 获取详细的新闻
			getInfo(id){
				uni.navigateTo({
					url:'/pages/otherComponent/newsInfo?id='+id,
				})
			},
			// 选择功能
			option(id) {
				switch (id) {
					case 1:
						{
							// console.log("错题" + id)
							// uni.showToast({
							// 	title: "错题功能正在开发!",
							// 	icon: "none"
							// })
							goWithObj({url:"../error/error",method:"navigateTo",para:{}})
						}
						break;
					case 2:
						{
							// console.log("练习" + id)
							// uni.navigateTo({
							// 	url: "../practice/practice",
							// 	success: (res) => {
							// 		console.log(res)
							// 	},
							// 	fail: (err) => {
							// 		console.log(err)
							// 	}
							// })
							goWithObj({url:"../practice/practice",method:"navigateTo",para:{}})
							
						}
						break;
					case 3:
						{
							goWithObj({url:"../collect/collect",method:"navigateTo",para:{}})
						}
						break;
					case 4:
						{
							// console.log("更多" + id)
							uni.showToast({
								title: "更多功能正在开发!",
								icon: "none"
							})
						}
					default:
						break;
				}
			},
			getMorNews() {
				// console.log("获取更多的新闻");
				// 跳转新闻公示
				uni.navigateTo({
					url:'/pages/otherComponent/AllNews',
				})
			}
		}
	}
	// x轴的偏移量、y轴的偏移量、模糊半径、阴影颜色
</script>

<style lang="scss">
	page{
		overflow-x: hidden; 
		width: 100%;
	}

	.content {
		background-color: rgb(255, 255, 255);
		height: 100%;
	}
	.news_text{
		width: 100%;
		height: 50upx;
		margin-top: 20upx;
		margin-left: 10upx;
		display: flex;
	}
	.news_text_view{
		float: left;
		margin-left: 10rpx;
		font-size: 40upx;
		font-weight: 1000;
		height: 50upx;
	}
	.news_text_img{
		height: 50upx;
		width: 50upx;
		color: black;
		font-size: 35upx;
		font-weight: 600;
		margin-top:12upx;
		margin-left: 20upx;
	}
	.gridOp {
		width: 100%;
		height: 150upx;
		text-align: center;
		margin-top: 36upx;
	}
	.gridOp_Icon {
		display: inline-block;
		width: 25%;
		text-align: center;
		// border: 1 green;
	}
// 图标圈
	.gridOp_includeImg {
		width: 100rpx;
		height: 100rpx;
		margin: auto;
		text-align: center;
		background-color:rgba(229,46,40,1);
		border-radius: 50%;
		// padding: 15rpx;
	}
	.gridOp_Img {
		// 方案一
		// width: 60rpx;
		// height: 60rpx;
		// border-radius: 50%;
		// margin-left: 5rpx;
		// margin-top: 10px;
		// 方案二
		// width: 76rpx;
		// height: 76rpx;
		// border-radius: 50%;
		// margin-left: 5rpx;
		// margin-top: 12rpx;
		// 方案三
		width: 100rpx;
		height: 100rpx;
		// border-radius: 50%;
		// margin-left: 5rpx;
		// margin-top: 12rpx;
	}
	.gridOp_Text {
		font-size: 27rpx;
		color: rgba(126, 136, 136, 1);
		font-weight: 500;
	}
	.newsScoView{
		width: 94%;
		margin-left: 3%;
		margin-top: 40upx;
	}
	.card_mine {
		width: 100%;
		height: 250rpx;
		background: white;
		box-shadow:-1px 1px 2px 1px rgba(205,205,205,1);
		padding: 5px 10px 5px 20px;
		margin-top: 20rpx;
		position: relative;
		margin-top: 40upx;
	}

	.news_title{
		font-size: 35upx;
		font-weight: 800;
		margin-top: 10rpx;
	}
	.news_content_container{
		margin-top: 10rpx;
	}
	.news_content{
		color: rgba(128,127,127,1);
		font-size: 32upx;
	}
	.detail_news_container{
		width: 94%;
		height: 35upx;
		display: flex;
		margin-left: 3%;
		position: absolute;
		bottom: 10upx;
	}
	.detail_news{
		float: left;
		margin-left: 73%;
		height: 35upx;
		font-size: 28upx;
		text-decoration:underline;
		color: rgba(128,127,127,1);
	}
	.detail_news_img{
		height: 20upx;
		width: 20upx;
		margin-top: 6upx;
		margin-left: 8upx;
	}
</style>
