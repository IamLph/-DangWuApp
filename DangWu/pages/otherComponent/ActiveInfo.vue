<template>
	<view class="activeContainer">
		<view class="activeContainerTwo">
			<scroll-view class="container" scroll-y>
				<view v-html="title" class="title"></view>
				<view v-html="richText" class="text"/>
			</scroll-view>
		</view>
		<view v-if="state != '规划中' && state != ''">
			<view class="bottom_container">
				<view @click="pushHerd" class="push_bottom">
					<view class="push_text">
						发表心得体会
					</view>
				</view>
				<!-- 图标，收藏数量 -->
				<view class="like">
					<!-- <view class="lg text-gray cuIcon-appreciate , bottom_like"></view>
					<view>11</view> -->
					<view class="lg text-gray cuIcon-friendfamous , bottom_star"></view>
					<view class="star_Num">12</view>
				</view>	
			</view>
		</view>
		<!-- 引用上传插件，不要删 -->
		<l-file
		    ref="lFile" 
		    @up-success="upSuccess"
		></l-file>
	</view>
	
</template>

<script>
	import richTextJson from '../../data/ActiveInfo.js'
	import activeJson from '../../data/Active.js'
	// 这行不要删
	import lFile from '../../components/l-file/l-file.vue'
	export default{
		data(){
			return{
				infoData:"",
				title:"",
				richText:"",
				state:"",		
			} 
		},
		onLoad:function(option){
			let that = this;
			let id = option.id;
			// console.log(id)
			// 死数据测试，后期用接口
			let list = richTextJson.richContent;
			for(var i = 0 ; i < list.length ; i++){
				if(list[i].id == id){
					that.richText = list[i].content;
					that.title = list[i].title;
					break;
				}
			}
			// 判断活动状态
			let partActiveList = activeJson.partActive;
			// console.log(partActiveList);
			for(var i = 0 ; i < partActiveList.length ; i ++ ){
				// console.log(partActiveList[i].id == id)
				if(partActiveList[i].id == id){
					that.state = partActiveList[i].state
					break;
				}
			}
		},
		methods:{
			pushHerd(){
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					//非真实地址，记得更换,调试时ios有跨域，需要后端开启跨域并且接口地址不要使用http://localhost/
					url: 'http://42.192.137.173:10010/api/upload/image',
					//默认file,上传文件的key
					name: 'file',
					// header: {'Authorization':'token'},
					//...其他参数
				});
			},
			upSuccess(res){
				console.log("上传成功")
				console.log(res);
		// 19:39:22.163 上传地址:https://localhost:8080/static
		// 19:39:22.204 请求头:{}
		// 19:39:22.246 参数:{}
		// 19:39:22.265 at hybrid/html/js/h5-uploader.js:9
		// 19:39:22.286 status：0 at hybrid/html/js/h5-uploader.js:49
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		padding-bottom: 10rpx;
		background-color: white;
	}
	.activeContainer{
		margin-left: 5%;
		width: 90%;
		height: 98%;
		position: relative;
	}
	.activeContainerTwo{
		margin-top: 0%;
		width: 100%;
		height: 95%;
	}
	.container{
		width: 100%;
		height: 100%;
		/* margin-top: 3%; */
		background-color: white;
	}
	.title{
		font-size: 40upx;
		font-weight: 1000;
		text-align: center;
	}
	/* 富文本内容 */
	.text{
		margin-top: 20upx;
	}
	.bottom_container{
		position: absolute;
		width: 100%;
		display: flex;
		margin-top: 15upx;
		height: 63upx;
	}
	.push_bottom{
		width: 380rpx;
		height: 63upx;
		text-align: center;
		background-color: rgba(240,239,244,1);
		/* border: 0.5em; */
		border-radius: 1em;
		margin-left: 100upx;
	}
	.push_text{
		font-size: 30upx;
		margin-top: 10upx;
		font-weight: 600;
	}
	.like{
		height: 50upx;
		display: flex;
		margin-left: 0upx;
		margin-left: 40upx;
	}
	.bottom_like{
		width: 50upx;
		height: 50upx;
		font-size: 50upx;	
	}
	.bottom_star{
		width: 50upx;
		height: 50upx;
		font-size: 50upx;
		color: red;
	}
	.star_Num{
		font-size: 22upx;
		font-weight: 400;
	}
</style>
