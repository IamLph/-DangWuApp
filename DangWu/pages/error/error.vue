<template>
	<view class="practice">
		<!-- 两个按钮 -->
<!-- 		<view class="practice-item">
			<view class="practice-item-practice" :class="backgroundColor === 0 ? 'bgc' : ''" @tap="practice">
				<view>练习</view>
			</view>
			<view class="practice-item-test" :class="backgroundColor === 1 ? 'bgc' : ''" @tap="test">
				<view>测试</view>
			</view>
		</view> -->

		<!-- 练习 -->
		<view class="practice-question" :class="backgroundColor === 0 ? 'block' : 'none'">
			<view>
				<view class="question-item" @tap="goToErrortest('judge')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/judge.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">判断题</view>
					</view>
				</view>
				
				
				<view class="question-item" @tap="goToErrortest('choice')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/choice.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">选择题</view>
					</view>
				</view>

				<view class="question-item" @tap="goToErrortest('completion')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/completion.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">填空题</view>
					</view>
				</view>

				<view class="question-item" @tap="goToErrortest('saqs')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/saqs.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">简答题</view>
					</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	import practice from "../../data/practice.json"
	import {goWithObj} from "../../data/page.js"
	export default {
		data() {
			return {
				backgroundColor: 0, //控制
				tests: [],
			}
		},
		methods: {
			practice() {
				this.backgroundColor = 0
				// console.log(this.backgroundColor)
			},
			test() {
				this.backgroundColor = 1
				this.getTest()
				// console.log(this.backgroundColor)
			},
			getTest() {
				this.tests = [...practice.test]
				// console.log(this.tests)
			},
			goToErrortest(item){
				goWithObj({url:"./error-test",method:"navigateTo",para:{para:item}})
			},
			
		},
		onLoad() {
			console.log(this.backgroundColor)
		},

	}
</script>

<style>
	.practice {
		width: 94%;
		margin-left: 3%;
		margin-top: 10rpx;
		padding-bottom: 10rpx;
	}

	/* 练习和测试s */

	/* 练习和测试e */


	/* 设置出现不出现s */
	.bgc {
		border-radius: 0.5em;
		background-color: #FFFFFF;
	}

	.block {
		display: block;
	}

	.none {
		display: none;
	}

	/* 设置出现不出现d*/

	/* question-item s */
	.practice-question {
		margin-top: 40rpx;
	}

	.question-img {
		width: 100rpx;
		height: 100rpx;
	}


	.question-item {
		height: 200rpx;
		margin-bottom: 20rpx;
		width: 100%;
		/* background-color: #FFFFFF; */
		/* border-radius: 0.5em; */
	}

	.question-item-question {
		display: flex;
		flex-direction: row;
		height: 200rpx;
		line-height: 200rpx;
		border: 1rpx solid #dedede;
		background-color: #FFFFFF;
		border-radius: 0.5em;
		box-shadow: 10rpx 10rpx 2rpx 1rpx #F0F0F0;
	}

	.question-img,
	.question-choice,
	.question-item-img {
		vertical-align: middle;
		line-height: 200rpx;
	}

	.question-item-img,
	.question-choice {
		margin-left: 5%;
	}

	.question-choice {
		font-size: 40rpx;
	}

	/* question-item d */

	/* test-item s */


	/* test-item d */
</style>
