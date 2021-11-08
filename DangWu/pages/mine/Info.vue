<template>
	<view class="container">
		<view class="topContainer">
			<view class="imgContainer">
				<image :src="user.image" class="headImg" @click="changeImg()"></image>
				<image src="../../static/image/icon/camera.png" class="camera" @click="changeImg()"></image>
			</view>
		</view>
		
		<view class="body">
			<view class="infoContainer">
				<view class="title">
					姓名
				</view>
				<view class="contentContainer">
					<view class="content">{{user.name}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					学号
				</view>
				<view class="contentContainer">
					<view class="content">{{user.userId}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					性别
				</view>
				<view class="contentContainer">
					<view class="content" v-if="user.sex == 0">女</view>
					<view class="content" v-else>男</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					民族
				</view>
				<view class="contentContainer">
					<view class="content">{{user.nation}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					籍贯
				</view>
				<view class="contentContainer">
					<view class="content">{{user.place}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					手机号
				</view>
				<view class="contentContainer">
					<view class="content">{{user.phone}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					院系
				</view>
				<view class="contentContainer">
					<view class="content">{{classInfo.collegeName}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					班级
				</view>
				<view class="contentContainer">
					<view class="content">{{classInfo.name}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
			
			<view class="infoContainer">
				<view class="title">
					所属支部
				</view>
				<view class="contentContainer">
					<view class="content">{{deptInfo.name}}</view>
				</view>
				<view class="rightHead">
					<view class="lg text-gray cuIcon-right , infoImg"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userJson from '../../data/userInfo.js'
	import { getUser , getClassInfo , getDeptInfo } from '../../methods/getUserInfo.js'
 	export default {
		data(){
			return{
				user:getUser(),
				classInfo:getClassInfo(),
				deptInfo:getDeptInfo()
			}
		},
		onLoad() {
			// console.log(this.user)
			// console.log(this.classInfo)
		},
		methods:{
			changeImg(){
				console.log("修改头像")
				const _this = this;
				uni.showActionSheet({
					itemList: ['相册', '拍照'],
					success: (res) => {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex == 0) {
							// 用户点击了从图库上传
							// console.log("相册")
							uni.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									// 选择图片后, 返回的数据
									// console.log("相册")
									// console.log(res.tempFilePaths[0])
									this.pushPhotoToService(res.tempFilePaths[0])
								}
							})
						} else {
							// console.log("照相")
							uni.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera'], //从摄像头选择
								success: (res) => {
									// console.log(res.tempFilePaths[0])
									this.pushPhotoToService(res.tempFilePaths[0])
								}
							})
						};
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			async pushPhotoToService(value) { //图片上传到服务器
				console.log(value)
				const uploadTask = uni.uploadFile({
					url: 'http://42.192.137.173:10010/api/upload/image',
					filePath: value,
					name: 'file',
					success: (uploadFileRes) => {
						// console.log(uploadFileRes.data);
						this.updatePhoto(uploadFileRes.data)
					}
				});
			},

			async updatePhoto(photo) { //修改数据库图片
				// console.log(photo)
				try {
					const value = uni.getStorageSync('WD_TOKEN').WD_TOKEN;
					// console.log(value)
					if (value.WD_TOKEN !== null) {
						const updatePicture = await UpdatePicture({
							uPhoto: photo,
							token: value
						})
						if (updatePicture !== null) {
							uni.showToast({
								title: "客官,头像修改成功了呢",
								icon: "none"
							})
							uni.switchTab({
								url: '../../navigator/mine',
								success(res) {
									console.log(res)
								},
								fail(err) {
									console.log(err)
								}
							});
						}
						// console.log(updatePicture)
					}
				} catch (e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-color: white;
	}
	.container{
		width: 100%;
		height: 100%;
		padding-top: 50upx;
	}
	.topContainer{
		width: 100%;
	}
	.imgContainer{
		width: 200upx;
		height: 200upx;
		margin-left: auto;
		margin-right: auto;
	}
	.headImg{
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}
	.camera{
		width: 70upx;
		height: 60upx;
		position: absolute;
		top: 205upx;
		margin-left: -60upx;
	}
	.body{
		margin-top: 60upx;
		width: 100%;
		height: 400upx;
	}
	.infoContainer{
		/* width: 100%; */
		width: 90%;
		margin-left: 5%;
		height: 100upx;
		/* padding: 20upx 40upx 30upx 40upx; */
		padding: 20upx 0upx 0upx 0upx;
		background-color: white;
		display: flex;
		border-bottom: 1px solid rgba(239,239,239,1);
	}
	.infoContainer:last-child{
		border: 0;
	}
	.title{
		float: left;
		font-size: 35upx;
		font-weight: 600;
	}
	.contentContainer{
		position: right;
		text-align: right;
		position: absolute;
		height: 60upx;
		right: 100upx;
		line-height: 60upx;
	}
	.content{
		font-size: 33upx;
		font-weight:500;
		color: rgba(204,204,204,1);
	}
	.rightHead{
		text-align: right;
		position: absolute;
		width: 60upx;
		height: 60upx;
		right: 30upx;
		line-height: 60upx;
	}
	.infoImg{
		font-size: 40upx;
	}
</style>
