<template>
	<view class="practice">
		<!-- 两个按钮 -->
		<view class="practice-item">
			<view class="practice-item-practice" :class="backgroundColor === 0 ? 'bgc' : ''" @tap="practice">
				<view>练习</view>
			</view>
			<view class="practice-item-test" :class="backgroundColor === 1 ? 'bgc' : ''" @tap="test">
				<view>测试</view>
			</view>
		</view>

		<!-- 练习 -->
		<view class="practice-question" :class="backgroundColor === 0 ? 'block' : 'none'">
			<view>
				<view class="question-item" @tap="goToPracticepractice('judge')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/judge.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">判断练习</view>
					</view>
				</view>
				
				<view class="question-item" @tap="goToPracticepractice('choice')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/choice.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">单选练习</view>
					</view>
				</view>
				
				<view class="question-item" @tap="goToPracticepractice('morechoice')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/choice.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">多选练习</view>
					</view>
				</view>

				<view class="question-item" @tap="goToPracticepractice('completion')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/completion.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">填空练习</view>
					</view>
				</view>

				<view class="question-item" @tap="goToPracticepractice('saqs')">
					<view class="question-item-question">
						<view class="question-item-img">
							<image src="../../static/practice/saqs.png" mode="" class="question-img"></image>
						</view>
						<view class="question-choice">简答练习</view>
					</view>
				</view>

			</view>
		</view>


		<!-- 测试 -->
		<view class="test-question" :class="backgroundColor === 1 ? 'block' : 'none'">
			<view>

				<view class="test-items" v-for="(item,index) in tests" :id="index" @tap="goToPracticetest(item)">
					<view class="test-item">
						<view class="test-item-img">
							<image src="../../static/practice/test.png" mode="" class="question-img"></image>
						</view>
						<view class="test-item-msg">
							<view>
								<image :src="item.img" mode="" class="question-img start"></image>
								{{item.name}}
							</view>
							<view>
								<image src="../../static/practice/head.png" mode="" class="question-img start"></image>
								已有{{item.peoper}}人参加
							</view>
							<view>
								<image src="../../static/practice/file.png" mode="" class="question-img start"></image>
								题目数量:{{item.number}}
							</view>
							<view>
								<image src="../../static/practice/flag.png" mode="" class="question-img start"></image>
								<text class="test-text">难度</text>
								<image src="../../static/practice/start.png" mode="" class="question-img start" v-for="(i,index) in parseInt(item.deficult)" />
							</view>
						</view>
					</view>
				</view>


			</view>
		</view>
		<!-- 测试完毕 -->
	</view>
</template>

<script>
	import practice from "../../data/practice.json"
	import {
		goWithObj
	} from "../../data/page.js"
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
			goToPracticepractice(item) {
				console.log("题型是:=======>"+item)
				goWithObj({
					url: "./practice-practice",
					method: "navigateTo",
					para: {
						para: item
					}
				})
			},

			goToPracticetest(item) {
				goWithObj({
					url: "./practice-test",
					method: "navigateTo",
					para: {
						para: item
					}
				})
			},

			getTestByBottom() {
				this.tests.push.apply(this.tests, practice.test)
				// console.log("cdc")
			},


		},
		onLoad() {
			// console.log(this.backgroundColor)
		},
		onReachBottom() {
			if (this.backgroundColor === 1) {
				// console.log("errrr")
				this.getTestByBottom()
			}


		}

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
	.practice-item {
		background-color: #C8C7CC;
		display: flex;
		flex-direction: row;
		width: 40%;
		margin: auto;
		height: 60rpx;
		margin-top: 20rpx;
		border-radius: 0.5em;
	}

	.practice-item-practice,
	.practice-item-test {
		width: 50%;
	}

	.practice-item-practice,
	.practice-item-test>view {
		text-align: center;
		font-size: 30rpx;
		line-height: 60rpx;
	}

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
	.test-items {
		/* height: 220rpx; */
		border-bottom: 1rpx solid #CCCCCC;
		/* padding-bottom: 34%; */
	}

	.test-items:last-child {
		border-bottom: 0rpx solid #CCCCCC;
	}

	.start {
		width: 30rpx;
		height: 30rpx;
	}

	.test-item {
		display: flex;
		flex-direction: row;
		margin-top: 7%;
		margin-bottom: 7%;
	}

	.test-item-img,
	.test-item-msg {
		vertical-align: middle;
	}

	.test-item-img {
		width: 20%;
		margin: auto;
	}

	.test-item-msg {
		width: 80%;
	}

	.test-item-msg>view {
		margin-top: 15rpx;
	}

	.test-item-msg>view>image,
	.test-text {
		margin-right: 15rpx;
	}

	/* test-item d */
</style>
