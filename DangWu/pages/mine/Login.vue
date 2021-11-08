<template>
	<view class="spwd">
		<view class="spwd-input">
			<input type="text" v-model="username" placeholder="账号"/>
		</view>
		<view class="spwd-input">
			<input type="password" v-model="password" placeholder="密码"/>
		</view>
		<view>
			<button @click="settingPwd">登录</button>
		</view>
		<view class="forget" @click="forget">
			<span>忘记密码?</span>
		</view>
	</view>
</template>

<script>
	import { goWithObj } from '../../data/page.js';
	import userInfoJson from '../../data/userInfo.js'
	import * as api from '../../api/api.js'
	import { login } from '../../methods/setUserInfo.js'
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if(token != ''){
				// 有缓存，重新将数据写到vuex中
				this.$store.commit('setToken',token)
				uni.switchTab({
				    url: '/pages/component/Index'
				});
			}
		},
		methods:{
			// 登陆
			settingPwd() {
				if(this.username == '' || this.password == ''){
					uni.showToast({
						title:"账号密码不可为空",
						icon:"none"
					})
				}else{
					login(this.username,this.password);
				}
			},
			forget() {
				uni.showToast({
					title: '请联系老师或管理员重置密码',
					icon: 'none'
				}); 
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
	
	.forget{
		margin-top: 7%;
		text-align: center;
		color: #3b3b3b;
		font-weight: 900;
		font-size: 110%;
	}
	
	.forget:hover{
		color: #717171;
	}
</style>
