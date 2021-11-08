<template>
	<view class="spwd">
		<view class="spwd-input">
			<input type="text" v-model="oldPassword" placeholder="旧密码"/>
		</view>
		<view class="spwd-input">
			<input type="password" v-model="newPassword" placeholder="新密码"/>
		</view>
		<view>
			<button @click="settingPwd">修改</button>
		</view>
	</view>
</template>

<script>
	import {goWithObj} from '../../data/page.js';
	export default {
		data() {
			return {
				oldPassword:'',
				newPassword:''
			}
		},
		methods:{
			settingPwd() {
				if (!this.oldPassword || this.oldPassword === '') {
					uni.showToast({
					    title: '旧密码不为空',
						icon: 'none'
					});   
					return;
				}
				
				if (!this.newPassword || this.newPassword === '') {
					uni.showToast({
					    title: '新密码不为空',
						icon: 'none'
					});   
					return;
				}
				
				const patrn = /^(\w){6,20}$/;
				if (!patrn.test(this.oldPassword)) {
					console.log(patrn);
					uni.showToast({
					    title: '只能输入6-20个字母、数字、下划线',
						icon: 'none'
					});   
					return;
				}
				
				console.log(this.oldPassword);
				console.log(this.newPassword);
				
				// 调用提交接口
				
				
				// 如果修改成功,退回到登录页面
				if (true) {
					uni.showToast({
					    title: '修改成功，请重新登录',
						icon: 'none'
					});
					setTimeout(() =>{goWithObj({url:'/pages/mine/Login',method:'reLaunch'});},1500);
					
				}
				
			}
		}
		
	}
</script>

<style lang="css">
	.spwd-input:first-child{
		margin-top: 10%;
	}
	
	.spwd-input{
		border-bottom:1rpx solid #ababab;
		width: 90%;
		margin: auto;
	}
	
	.spwd-input input{
		height: 12vw;
		font-size: 120%;
	}
	
	.spwd-input:hover{
		border-bottom:5rpx solid #bc0003;
	}
	
	.spwd button{
		margin-top: 10%;
		width: 80%;
		background-color: #bc0003;
		border: 0;
		color: #ffffff;
	}
	
	
</style>
