<template>
	<view>
		<view :class="block===0? 'block' : 'none'">
			<view class="login">
				练习结束
			</view>
		</view>
		<view :class="block===1? 'block' : 'none'">
			<!-- 头部 -->
			<view id="top-box" class="cu-bar bg-white solid-bottom">
				<view class="action text-black">
					<text v-if="currentType===1">单选题</text>
					<text v-else-if="currentType===2">多选题</text>
					<text v-else-if="currentType===4">填空题</text>
					<text v-else-if="currentType===5">简答题</text>
					<text v-else-if="currentType===3">判断题</text>
				</view>
				
				<!-- 倒计时 -->
				<view class="action">
					<view class="cu-btn bg-green shadow" style="margin-right: 30upx;" data-target="modalCard" v-if="currentType===1 || currentType===2 || currentType===3 || currentType===4">{{content}}</view>
					<!-- 提交按钮 -->
					<view class="topSubmit" @tap="submit" >
						提交
					</view>
				</view>
				
			</view>

			<!--  -->
			<view class="cu-modal" :class="modalCard=='modalError'?'show':''" @tap="hideCardModal">
				<view class="cu-dialog" @tap.stop>

					<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight}">
						<view class="cu-bar solid-bottom">
							<view class="action eee">
								<text class="cuIcon-title text-red"></text>答题卡
								<button class="cu-btn bg-green shadow submit" 
									data-target="modalCard" 
									@tap="submit" 
									v-if="currentType===1 || currentType===2 || currentType===3 || currentType===4">
									提交
								</button>
							</view>
						</view>
						<view class="grid col-5 ">
							<view class="margin-tb-sm text-center" v-for="(subject,index) in subjectList" :key="index">
								<button class="cu-btn round" :class="[subject.userAnswer.length===0?'line-grey':'bg-red']" @click="AppointedSubject(index)">{{index+1}}</button>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<form>
				<swiper :current="subjectIndex" class="swiper-box" @change="SwiperChange" :style="{'height':swiperHeight}">
					<swiper-item v-for="(subject,index) in subjectList">

						<view v-if="index-subjectIndex>=-1&&index-subjectIndex<=1">

							<view class="cu-bar bg-white solid-bottom">
								<view class="action text-black">
									<!-- 题目 -->
									<!-- <text class="cuIcon-title text-red"></text><text v-html="subject.title"/> -->
									<text v-html="subject.title"/>
								</view>
							</view>

							<view>
								<!-- 判断题 -->
								<radio-group class="block" @change="RadioboxChange" v-if="subject.type===3">
									<view class="cu-form-group" v-for="option in subject.optionList">
										<radio :value="option.prefix" :checked="subject.userAnswer.indexOf(option.prefix) > -1?true:false"></radio>
										<view class="title text-black">{{option.prefix}}.<text v-html="option.content"/></view>
									</view>
								</radio-group>
								<!-- 单选题 -->
								<radio-group class="block" @change="RadioboxChange" v-if="subject.type===1">
									<view class="cu-form-group" v-for="option in subject.optionList">
										<radio :value="option.prefix" :checked="subject.userAnswer.indexOf(option.prefix) > -1?true:false"></radio>
										<view class="title text-black">{{option.prefix}}.<text v-html="option.content"/></view>
									</view>
								</radio-group>
								<!-- 多选题 -->
								<checkbox-group class="block" @change="CheckboxChange" v-else-if="subject.type===2">
									<view class="cu-form-group" v-for="option in subject.optionList">
										<checkbox :value="option.prefix" :class="subject.userAnswer.indexOf(option.prefix) > -1?'checked':''" :checked="subject.userAnswer.indexOf(option.prefix) > -1?true:false"></checkbox>
										<view class="title  text-black">{{option.prefix}}.<text v-html="option.content"/></view>
									</view>
								</checkbox-group>

								<!-- 单行文本 -->
								<view v-else-if="subject.type===4">
									<view class="cu-form-group solid-bottom">
										<view class="title  text-black">
											答：
										</view>
										<!-- 文本输入 -->
										<input placeholder="文本输入框" name="input" v-model="subject.userAnswer" @blur="textInput"></input>
									</view>
								</view>

								<!-- 多行 -->
								<view v-else-if="subject.type===5">
									<!-- <view class="cu-bar cu-bar-title bg-white margin-top">
										<view class="action  text-black">
											答：
										</view>
									</view> -->
									<!-- 文本输入 -->
									<!-- <view class="cu-form-group solid margin">
										<textarea maxlength="-1" class="textarea-height" @blur="textInputs" v-model="subject.userAnswer" placeholder="多行文本输入框"></textarea>
									</view> -->
								</view>
							</view>

							<view v-show="subject.showAnswer" class="margin-top solid-top">
								<!-- 渲染正确答案 -->
								<view class="cu-bar">
									<view class="action text-grey">
										<text>正确答案：</text>
										<text class="solid-bottom  padding-left text-green"><text v-html="subject.answer"></text></text>
									</view>
								</view>
								<!-- 渲染解析内容 -->
								<view class="cu-bar cu-bar-title">
									<view class="action  text-grey">
										<text>解析：</text>
									</view>
								</view>
								<!-- 解析内容 -->
								<view class="text-content padding  text-grey">
									<text v-html="subject.explain"></text>
								</view>
							</view>

						</view>
					</swiper-item>
				</swiper>
			</form>

			<!-- 底部 -->
			<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">

				<view class="action" @click="MoveSubject(-1)">
					<view class="cuIcon-cu-image">
						<text class="lg cuIcon-back text-gray"></text>
					</view>
					<view class="text-gray">上一题</view>
				</view>

				<view class="action" @click="MoveSubject(1)">
					<view class="cuIcon-cu-image">
						<text class="lg text-gray cuIcon-right"></text>
					</view>
					<view class="text-gray">下一题</view>
				</view>

				<view class="action" @click="FavorSubject" :class="[userFavor?'text-red':'text-gray']">
					<view class="cuIcon-cu-image">
						<text class="lg cuIcon-favor"></text>
					</view>
					<view>收藏</view>
				</view>

				<view class="action" @click="ShowAnswerChange">
					<view class="cuIcon-cu-image">
						<text class="lg text-gray cuIcon-question"></text>
					</view>
					<view class="text-gray">解答</view>
				</view>

				<view class="action" @tap="showCardModal" data-target="modalError">
					<view class="cuIcon-cu-image">
						<text class="lg text-gray cuIcon-form"></text>
					</view>
					<view class="action">
						<view class="shadow">答题卡</view>
					</view>
				</view>

			</view>

		</view>
	</view>

</template>

<script>
	import practice from "../../data/practice.json"
	import { getRandomExamByTypeAndSum } from '../../methods/getExam.js'
	import { toWithObj } from "../../data/page.js"
	import { SUM1 , SUM2 ,SUM3 ,SUM4 ,SUM5 , EXAMTIME ,EXAMTIMEMINYUTES , EXAMTIMESECONDS } from '../../data/TotalData.js'
	import * as api from '../../api/api.js'
	export default {
		data() {
			return {
				userFavor: false, //是否已收藏
				currentType: 0, //当前题型
				subjectIndex: 0, //跳转索引
				autoShowAnswer: false, //答错是否显答案
				autoRadioNext: true, //判断题、单项题，自动移下一题
				// 滑块高度
				swiperHeight: '800px', 
				title: '',
				subjectList: [],
				//显示答题卡
				modalCard: null, 
				seconds: EXAMTIMESECONDS, //秒
				minutes: EXAMTIMEMINYUTES, //分
				content: "", //内容
				clock: undefined, //时钟
				block: 0,
				//封装问题结果
				questions: [],
				// API传题
				EXAM:[],
			}
		},
		onReady() {
			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {
					// //这里是手机屏幕高度                    
					tempHeight = res.windowHeight;
					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							_me.swiperHeight = tempHeight + 'px';
						}).exec();
					}).exec();
				}
			});
		},
		onLoad(option) {
			this.block = 1
			this.content = EXAMTIME
			// 根据类型获取试题信息
			this.getInfo(option)
			uni.setNavigationBarTitle({
				title: this.title
			});
			//添加用户显示答案字段
			for (var i = 0; i < this.subjectList.length; i++) {
				this.$set(this.subjectList[i], "showAnswer", false);
			}
		},
		methods: {
			/**
			 * 调用获取试题API
			 * @param {Object} type 试题类型
			 * @param {Object} sum	试题加载数量
			 */
			getExamByTypeAndSum(type,sum){
				let that = this
				api.getRandomQuestionByTypeAndSum({
					data:{
						type:type,
						sum:sum
					},
					success:res=>{
						let exam = res.data.questionContentJsons
						var list = []
						for (var i = 0;i<exam.length;i++){
							list[i] = {
								"title":exam[i].title,
								"type":exam[i].type,
								"optionList":exam[i].items,
								"answer":exam[i].correctArray,
								"userAnswer": "",
								"userFavor": false,
								"explain": exam[i].analyze
							}
						}
						// 设置试题当前类型
						that.currentType = list[0].type;
						// 渲染试题内容
						that.subjectList = list
						console.log(list)
					},
					fail:err=>{
						console.log("失败")
					}
				})
			},
			/**
			 * 选项类型
			 * @param {Object} option 传递类型等参数
			 */
			async getInfo(option) {
				const item = toWithObj({
					option
				});
				if (item.para === "choice") {
					this.title = "单选专项"
					this.setClock() // 倒计时
					this.getExamByTypeAndSum(1,SUM1)
				} else if (item.para === "morechoice") {
					this.title = "多选练习"
					this.setClock() // 倒计时
					this.getExamByTypeAndSum(2,SUM4)
				}else if (item.para === "completion") {
					this.title = "填空专项"
					this.setClock() // 倒计时
					this.getExamByTypeAndSum(4,SUM4)
				}  else if (item.para === "saqs") {
					this.title = "简答专项"
					this.getExamByTypeAndSum(5,SUM5)
				} else if (item.para === "judge") {
					this.title = "判断专项"
					this.setClock() // 倒计时
					this.getExamByTypeAndSum(3,SUM3)
				}
			},
			setClock(){
				// 设置定时器
				this.clock = setInterval(() => { //倒计时
					this.block = 1
					this.seconds--
					this.content = this.minutes + ":" + (this.seconds = ((this.seconds >= 1 && this.seconds < 10) ? "0" + this.seconds :
						this.seconds))
					if (this.minutes >= 0) {
						if (this.seconds === 0) { //当倒计时小于0时清除定时器
							this.seconds = 60
							this.minutes--
						}
					} else if (this.minutes < 0) {
						if (this.seconds >= 1) { //当倒计时小于0时清除定时器
							this.block = 0;
							clearInterval(this.clock)
						}
					}
				}, 1000)
			},
			showCardModal: function(e) { //显示答题卡
				console.log(e)
				this.modalCard = e.currentTarget.dataset.target
			},
			hideCardModal: function(e) { //关闭答题卡
				this.modalCard = null
			},
			SwiperChange: function(e) { //滑动事件
				let index = e.target.current;
				if (index != undefined) {
					this.subjectIndex = index;
					this.currentType = this.subjectList[index].type;
					this.userFavor = this.subjectList[index].userFavor;
				}
			},
			RadioboxChange: function(e) { //单选选中
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].userAnswer = values;
				if (this.autoRadioNext && this.subjectIndex < this.subjectList.length - 1) {
					this.subjectIndex += 1;
				};
				this.questions.push(values)
			},

			CheckboxChange: function(e) { //复选选中
				var items = this.subjectList[this.subjectIndex].optionList;
				console.log("==========测试========")
				console.log(items)
				console.log("==========测试========")
				var values = e.detail.value;
				// console.log("复选" + values)
				this.subjectList[this.subjectIndex].userAnswer = "";
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].prefix == values[j]) {
							this.subjectList[this.subjectIndex].userAnswer += items[i].prefix;
							break
						}
					}
				}
				this.questions.push(values)
			},

			textInput: function(e) { //填空题
				this.subjectList[this.subjectIndex].userAnswer = e.detail.value;
				this.questions.push(e.detail.value)
			},

			textInputs: function(e) { //填空题
				// console.log(e.detail.value)
				this.questions.push(e.detail.value)
				this.subjectList[this.subjectIndex].userAnswer = e.detail.value;
			},

			ShowAnswerChange: function(e) { //显示答案
				if (this.subjectList[this.subjectIndex].showAnswer) {
					this.subjectList[this.subjectIndex].showAnswer = false;
				} else {
					this.subjectList[this.subjectIndex].showAnswer = true;
				}
			},
			FavorSubject: function(e) { //收藏题
				if (this.userFavor) {
					this.userFavor = false;
					this.subjectList[this.subjectIndex].userFavor = false;
				} else {
					this.userFavor = true;
					this.subjectList[this.subjectIndex].userFavor = true;
				}
			},
			MoveSubject: function(e) { //上一题、下一题
				if (e === -1 && this.subjectIndex != 0) {
					this.subjectIndex -= 1;
				}
				if (e === 1 && this.subjectIndex < this.subjectList.length - 1) {
					this.subjectIndex += 1;
				}
			},
			AppointedSubject: function(e) { //题卡指定
				this.modalCard = null;
				this.subjectIndex = e;
			},
			submit: function() {
				// 关闭答题卡
				this.hideCardModal()
				// 显示提交内容
				console.log(this.subjectList)
			}
		},

		watch: {
			// 时钟监听
			content(val) {
				// console.log(val)
				if (val === "0:0") {
					this.block = 0;
					this.submit()
				}
			}
		},
	}
</script>

<style>
	@import "../../colorui/animation.css";

	page {
		background-color: #FFFFFF;
	}
	.topSubmit{
		border-radius: 0.5em;
		width: 115upx;
		box-shadow: 1px 1px 1px 1px red;
		height: 100%;
		text-align: center;
		line-height: 60upx;
		background-color: red;
		font-size: 29upx;
		font-weight: 500;
		color: white;
	}
	.cu-form-group {
		justify-content: flex-start
	}

	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 0upx;
	}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cu-bar-title {
		min-height: 50upx;
	}

	.cu-list.menu>.cu-item-error {
		justify-content: flex-start;
	}

	.textarea-height {
		min-height: 600upx;
		font-size: 20px;
		line-height: 20px;
	}

	.block {
		display: block;
	}

	.none {
		display: none;
	}

	.login {
		font-size: 86rpx;
		text-shadow: 5px 5px 5px black, 0px 0px 2px black;
		color: white;
		text-align: center;
	}

	.shadow {
		border-radius: 0.5em;
	}

	.submit {
		margin-left: 50%;
	}

	.eee {
		width: 100%;
	}
</style>
