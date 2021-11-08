<template>
	<view class="collect">
		<!-- 头部 -->
		<view class="collect-item">
			<view class="collect-header">
				<view class="collect-header-items">
					<view @tap="choice" :class=" number === 1 ? 'color' : ''" class="collect-header-item">选择</view>
					<view @tap="completion" :class=" number === 2 ? 'color' : ''" class="collect-header-item">填空</view>
					<view @tap="saqs" :class=" number === 3 ? 'color' : ''" class="collect-header-item">简答</view>
					<view @tap="judge" :class=" number === 4 ? 'color' : ''" class="collect-header-item">判断</view>
				</view>
			</view>
		</view>

		<view class="swiper-items">
			<swiper class="swiper" :duration="duration" :style="{'height':swiperHeight}" :current="swiperNumber" @touchstart="touchStart"
			 @touchend="touchEnd">
				<swiper-item class="swiper-item-hight" :style="{'height':swiperItemHeight}">
					<view class="scroll-view-item swiper-item" v-for="(item,index) in choices" @tap="choiceOne(item)">
						<view class="question-title">
							{{item.title}}
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-hight" :style="{'height':swiperItemHeight}">
					<view class="scroll-view-item swiper-item" v-for="(item,index) in completions" @tap="choiceOne(item)">
						<view class="question-title">
							{{item.title}}
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-hight" :style="{'height':swiperItemHeight}">
					<view class="scroll-view-itemv swiper-item" v-for="(item,index) in squss" @tap="choiceOne(item)">
						<view class="question-title" v-if="(index !== 0) || (index !==squss.length-1)">
							{{item.title}}
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-hight" :style="{'height':swiperItemHeight}">
					<view class="scroll-view-itemv swiper-item" v-for="(item,index) in judges" @tap="choiceOne(item)">
						<view class="question-title" v-if="(index !== 0) || (index !==judges.length-1)">
							{{item.title}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import question from "../../data/question.json"
	import {
		goWithObj
	} from "../../data/page.js"
	export default {
		data() {
			return {
				//点击的分类名
				number: 1,
				swiperNumber: 0,
				// swiper的东西
				duration: 500,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				swiperHeight: '800px', //
				swiperItemHeight: '800px', //
				choices: [],
				completions: [],
				squss: [],
				judges: [],
			}
		},
		methods: {
			choice() {
				this.number = 1
				this.swiperNumber = 0
			},
			completion() {
				this.number = 2
				this.swiperNumber = 1
			},
			saqs() {
				this.number = 3
				this.swiperNumber = 2
			},

			judge() {

				this.number = 4
				this.swiperNumber = 3
				// console.log(this.number)
				// console.log(this.swiperNumber)
			},
			getQuestionChoice() {
				this.choices.push.apply(this.choices, question.choice)
			},
			getQuestionCompletion() {
				this.completions.push.apply(this.completions, question.completion)
			},
			getQuestionSaqs() {
				this.squss.push.apply(this.squss, question.saqs)
			},

			getQuestionJudge() {
				this.judges.push.apply(this.judges, question.judge)
			},
			touchStart(e) {
				this.touchStartX = e.touches[0].clientX;
				this.touchStartY = e.touches[0].clientY;
			},

			/**  
			 * 触摸结束  
			 **/
			touchEnd(e) {
				let deltaX = e.changedTouches[0].clientX - this.touchStartX;
				let deltaY = e.changedTouches[0].clientY - this.touchStartY;
				if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX >= 0) {
						// console.log("左滑")
						this.number--
						if (this.number < 1) {
							this.number = 1
						}
						// console.log(this.number)
					} else {
						this.number++
						if (this.number > 4) {
							this.number = 4
							// console.log(this.number)
						}
					}
				}
			},

			choiceOne(item) {
				console.log(item)
				goWithObj({
					url: "./detail-collect",
					method: "navigateTo",
					para: {
						para: item
					}
				})
			}
		},
		onLoad() {
			this.getQuestionChoice()
			this.getQuestionCompletion()
			this.getQuestionSaqs()
			this.getQuestionJudge()
		},
		onReady() {
			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				success: function(res) {
					tempHeight = res.windowHeight; //手机窗口高度
					// console.log(tempHeight)
					_me.swiperItemHeight = tempHeight + 'px';
					// console.log(_me.swiperItemHeight)
					uni.createSelectorQuery().select(".collect-header").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						// console.log(data.height)
						tempHeight -= data.height; //分类高度
						_me.swiperHeight = tempHeight + 'px';
					}).exec();
				}
			});
		}
	}
</script>

<style>
	/* 头部 */

	.collect-item {
		height: 55rpx;
		/* margin-top: 111rpx; */
	}

	.collect-header {
		position: fixed;
		width: 100%;
		margin-top: -1px;
		z-index: 10;
	}

	.collect-header-items {
		display: flex;
		flex-direction: row;
		margin-top: 1rpx;
		border-radius: 5%;
	}

	.collect-header-item {
		width: 33.3%;
		text-align: center;
		background-color: #a5a5a5;
		line-height: 60rpx;
	}

	.collect-header-item {
		height: 60rpx;
	}

	.color {
		border-radius: 0.5em;
		border: 1rpx solid #CCCCCC;
		background-color: #fefefe;
	}

	/*滑动*/
	.swiper-items {}

	.swiper {}

	.swiper-item {
		overflow: scroll;
		width: 94%;
		margin-left: 3%;
		border-top: 0.1rpx outset #CCCCCC;
	}

	.swiper-item:first-child,
	.swiper-item:last-child {
		border-top: 0rpx;
	}

	.swiper-item-hight {
		overflow: scroll;
		height: auto;
		margin-top: 3px;
		margin-bottom: 1rpx;
	}

	.question-title {
		height: 80rpx;
		line-height: 80rpx;
		/* border-top: 0.1rpx outset #CCCCCC; */
	}
</style>
