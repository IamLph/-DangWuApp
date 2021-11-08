<template>
	<view class="container">
		<view class="header" @click="father($event)" :style="{backgroundImage: 'url(' + bagUrl + ')'}">
			<view class="photo" @click.stop="getInfo">
				<image :src="user.image"></image>
			</view>
			<view class="info">
				<view class="infoName">{{user.name}}</view>
				<view class="infoClooege">{{classInfo.collegeName}}</view>
				<view class="infoClassName">{{classInfo.name}}</view>
			</view>
		</view>
		<!-- 功能 -->
		<view class="main">
			<view class="partContainer" @click="getInfo">
				<view class="itemContainer">
					<view class="leftIcon">
						<span class="cuIcon-people span1"></span>
					</view>
					<view class="content">
						<view class="title">个人信息</view>
					</view>
					<view class="rightIcon">
						<span class="cuIcon-right span2"></span>
					</view>
				</view>
			</view>
			
			<view class="partContainer"  @click="active">
				<view class="itemContainer">
					<view class="leftIcon">
						<span class="cuIcon-activity span1"></span>
					</view>
					<view class="content">
						<view class="title">我的活动</view>
					</view>
					<view class="rightIcon">
						<span class="cuIcon-right span2"></span>
					</view>
				</view>
			</view>
			
			<view class="partContainer" @click="setting">
				<view class="itemContainer">
					<view class="leftIcon">
						<span class="cuIcon-settings span1"></span>
					</view>
					<view class="content">
						<view class="title">设置</view>
					</view>
					<view class="rightIcon">
						<span class="cuIcon-right span2"></span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { goWithObj } from '../../data/page.js'
	import { bgImg } from '../../data/TotalData.js'
	import { setDepteInfo } from '../../methods/setUserInfo.js'
	export default {
		data() {
			return {
				user:null,
				classInfo:null,
				bagUrl:bgImg
			}
		},
		onLoad() {
			this.$reoladUser()
			this.user = uni.getStorageSync('user')
			this.classInfo = uni.getStorageSync('classInfo')
			// 打印用户信息
			console.log(this.user)
			// let deptId = this.user.deptId
			// setDepteInfo(deptId)
		},
		methods:{
			father(event){
				// console.log(event)
				// console.log("更换背景")
				// this.bagUrl = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg'
			},
			getInfo() {
				// console.log("查看个人详细信息");
				goWithObj({url:'/pages/mine/Info',method:'navigateTo'})
			},	
			// 活动
			active() {
				uni.navigateTo({
					url:'/pages/otherComponent/PartActive',
				})
			},
			// 设置
			setting() {
				goWithObj({url:'/pages/mine/Setting',method:'navigateTo'});
				// console.log("设置");
			},
			
		}
	}	
</script>

<style>
	.container{
		width: 100%;
		height: 100%;
		background-color: rgba(248, 248, 249, 1.0);
	}
	.header{
		width: 100%;
		height: 460rpx;
		background-color: #760003;
		/* background-image: url(../../static/door.jpg); */
		background-position:center 80%;
		padding-top: 30rpx;
	}
	.photo{
		width: 25%;
		height: 25vw;
		background-color: #007AFF;
		margin: auto;
		border-radius: 50%;
	}
	.photo image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.info{
		margin-top: 30rpx;
		width: 100%;
		text-align: center;
		color: white;
	}
	.infoName{
		font-weight: 600;
		font-size: 40upx;
		margin-bottom: 15upx;
		font-size: 56upx;
		font-weight: 600;
	}
	.infoClooege{
		font-size: 44upx;
		font-weight: 500;
	}
	.infoClassName{
		font-size: 40upx;
		font-weight: 500;
	}
	.main{
		margin-top: 10upx;
		width: 100%;
		padding: 20upx 30upx 20upx 30upx;
	}
	.partContainer{
		width: 100%;
		height: 80upx;
		border-bottom: 1upx solid rgba(220,220,220,1);		
		padding-top: 10upx;
	}
	.itemContainer{
		width: 100%;
		height: 60upx;
		display: flex;
	}
	.leftIcon{
		width: 60upx;
		height: 60upx;
		line-height: 60upx;
	}
	.span1{
		font-size: 46upx;
	}
	.content{
		height: 60upx;
		line-height: 60upx;
	}
	.title{
		font-size: 36upx;
		font-weight: 500;
	}
	.rightIcon{
		position: absolute;
		right: 28upx;
		height: 60upx;
		line-height: 60upx;
		color: gray;
	}
	.span2{
		font-size: 36upx;
		color: #acacac;
	}
	.partContainer:last-child{
		border: 0;
	}
	.span3{
		float: right;
		color: #acacac;
		margin-right: 15upx;
		font-size: 35upx;
	}
	.btnContainer{
		width: 100%;
		height: 80upx;
		position: absolute;
		bottom: 40upx;
	}
	.loginOutBtn{
		width: 70%;
		height: 70upx;
		line-height: 70upx;
		font-size: 40upx;
		background-color: red;
		color: white;
		border-radius: 0.4em;
	}
</style>
