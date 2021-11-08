<template>
	<view class="container">
		<scroll-view scroll-y class="scrollView" @scrolltolower="getMoreNews">
			<view class="newsScoView">
				<block v-for="(item,index) in newsList" :key="index">
					<!-- 默认渲染三个 -->
					<view class="card_mine">
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
								新闻详细
							</view>
							<view class="lg text-gray cuIcon-right ,  detail_news_img"></view>
						</view>
					</view>
				</block>
			</view>
			<br>
			<view v-if="index > 2" class="noMoreNews">没有更多的新闻了!!</view>
		</scroll-view>
	</view>
</template>

<script>
	import newsListJson from '../../data/AllNews.js'
	export default{
		data(){
			return{
				newsList:newsListJson.AllNewsList,
				// 模拟加载三次没有数据
				index:0
			}
		},
		onLoad(){
			// console.log(this.newsList)
		},
		methods:{
			// 获取详细的新闻
			getInfo(id){
				uni.navigateTo({
					url:'/pages/otherComponent/newsInfo?id='+id,
				})
			},
			getMoreNews(){
				console.log("上拉刷新")
				uni.showLoading({
				    title: '加载中'
				});
				this.conncatData();
			},
			async conncatData(){
				let that = this;
				// 模拟延时
				if(that.index > 2){
					console.log("没有更多数据了")
					uni.hideLoading();
				}else{
					setTimeout(function () {
					    that.newsList = that.newsList.concat(newsListJson.AllNewsList);
						that.index ++ ;
						uni.hideLoading();
					}, 1200);
				}
				
			}
		},
		onReachBottom(){
			console.log("上拉刷新")
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
	.scrollView{
		height: 100%;
		padding-bottom: 20upx;
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
	.noMoreNews{
		text-align: center;
		font-size: 28upx;
		font-weight: 500;
	}
</style>
