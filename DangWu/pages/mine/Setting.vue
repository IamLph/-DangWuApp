<template>
  <view class="info">
		<view class="info-item">
			<view class="info-item-l" @click="network">
				网络诊断
			</view>
			<view class="info-item-r cuIcon-right"></view>
		</view>
		<view class="info-item" @click="settingPwd">
			<view class="info-item-l">
				修改密码
			</view>
			<view class="info-item-r cuIcon-right"></view>
		</view>
		<view class="info-item" @click="about">
			<view class="info-item-l">
				关于我们
			</view>
			<view class="info-item-r cuIcon-right"></view>
		</view>
		<view class="btnContainer">
			<button class="logout" @click="logout">
				退出登录
			</button>
		</view>
		
		
		<!-- 弹窗 -->
		<view>
			<l-modal ref="customModal" @onClickCancel="cancel" @onClickConfirm="confirm">
				<template>
					<p style="text-align: center;">您确认退出吗</span>？</p>
				</template>
			</l-modal>
		</view>
  </view>
</template>

<script>
	import {goWithObj} from '../../data/page.js'
	import lModal from '../../components/l-modal/l-modal.vue'
	export default{
		components: {
			lModal
		},
		data(){
			return {
				
			}
		},
	methods:{
		open() {
			this.$refs['customModal'].showModal()
		},
		cancel() {
			uni.showToast({
				title:"我就知道你不舍得俺",
				icon:"none"
			})
		},
		confirm() {
			// 选择退出清除缓存
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
			goWithObj({url:'/pages/mine/Login',method:'reLaunch'});
		},
		/** 退出登录 */
		logout() {
			this.open()
		},
		/** 关于我们 */
		about() {
			goWithObj({url:"/pages/mine/About"});
		},
		network() {
			uni.getNetworkType({
			    success: function (res) {
			        uni.showToast({
			            title: '当前使用:' + res.networkType + '网络',
						icon: 'none'
			        });
			    }
			});
		},
		settingPwd() {
			goWithObj({url:'/pages/mine/SettingPwd'});
		}
	}
	
}
</script>

<style lang="css">
	.info-item{
		font-size: 110%;
		padding: 3% 3%;
		border-bottom: 1px solid #d5d5d5;
		display: flex;
		flex-direction: row;
		margin: 0% 2%;
	}
	
	.info-item:last-child{
		border: 0;
	}

	.info-item .info-item-left{
		width: 80%;
		float: left;
		margin-top: 8%;
	}


	.info-item image{
		width: 20%;
		height: 20vw;
	}
	
	.info-item .info-item-l{
		width: 20%;
		font-size: 32upx;
	}
	
	.info-item .info-item-r{
		width: 80%;
		text-align: right;
		font-size: 90%;
		color: #7d7d7d;
	}
	.btnContainer{
		position: absolute;
		bottom: 100upx;
		width: 100%;
		height: 130upx;
		padding-top: 15upx;
	}
	.logout{
		font-size: 40upx;
		font-weight: 500;
		color: #ffffff;
		width: 90%;
		height: 100upx;
		background-color: #a50002;
		border: 0;
	}
</style>
