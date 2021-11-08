<template>
	<view class="FatherContainer">
		<view class="MatherContainer">
			<scroll-view class="container" scroll-y>
				<view class="title">
					当前新闻的ID是:{{newId}}
				</view>
				<view v-html="newsRichText"/>
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
	import newsJson from '../../data/newsInfo.js'
	export default{
		data(){
			return{
				newId:"",
				newsRichText:"",
			}
		},
		onLoad:function(option){
			// 获取新闻Id
			let id = option.id;
			this.newId = id;
			// 获取数据
			let list = newsJson.newsList;
			for(var i = 0;i<list.length ;i++){
				if(list[i].id == id){
					this.newsRichText = list[i].content;
					break;
				}
			}
		}
	}
</script>
<style>
	page{
		width: 100%;
		height: 100%;
		padding-bottom: 30rpx;
		background-color: white;
	}
	.FatherContainer{
		margin-left: 5%;
		width: 90%;
	}
	.MatherContainer{
		margin-top: 4%;
	}
	.container{
		width: 100%;
		height: 100%;
		background-color: white;
	}
	.title{
		font-size: 60rpx;
		text-align: center;
	}
</style>
