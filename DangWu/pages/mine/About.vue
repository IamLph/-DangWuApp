<template>
	<view class="info">
		<view class="info-list">
			<view class="logo">
				<image src="../../static/image/mine/pdsulogo.png" mode="widthFix"></image>
			</view>
			<view class="info-item" @click="version()">
				<view class="info-item-l">
					版本
				</view>
				<view class="info-item-r">v0.6.1</view>
			</view>
			<view class="info-item" @click="sprice">
				<view class="info-item-l">
					开发团队
				</view>
				<view class="info-item-r">向量工作室</view>
			</view>
		</view>

		<view class="sprice" v-if="sprices" @click="spriceLogoC">
			<image src="../../static/image/mine/xllogo.png" mode="widthFix"></image>
			<view class="sprice-text">向量工作室了解一下</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				clickNum: 0,
				sprices: false
			}
		},
		methods: {
			version(){
				// console.log("系统版本")
				uni.showToast({
					title:"已是最新版本",
					icon:"none",
					duration:1234
				})
			},
			sprice() {
				if (this.clickNum < 9) {
					this.clickNum++;
					this.sprices = false;
					return;
				}
				this.sprices = true;
				this.clickNum = 0;
				setTimeout(() => {
					this.sprices = false
				}, 3000);
			},
			spriceLogoC() {
				this.sprices = false;
			}
		}
	}
</script>

<style lang="css">
	.logo {
		width: 60%;
		margin: 5% auto;
	}

	.info-item {
		font-size: 110%;
		padding: 3% 3%;
		border-bottom: 1px solid #d5d5d5;
		display: flex;
		flex-direction: row;
		margin: 0% 2%;
	}

	.info-item .info-item-left {
		width: 80%;
		float: left;
		margin-top: 8%;
	}

	.info-item:last-child {
		border: 0px;
	}


	.info-item image {
		width: 20%;
		height: 20vw;
	}

	.info-item .info-item-l {
		width: 20%;
	}

	.info-item .info-item-r {
		width: 80%;
		text-align: right;
		font-size: 90%;
		color: #7d7d7d;
	}


	.sprice {
		background-color: #FFFFFF;
		border-radius: 10%;
		width: 60%;
		height: 60vw;
		margin: auto;
	}

	.sprice-text {
		text-align: center;
		font-size: 120%;
		color: #a3a3a3;
	}
</style>
