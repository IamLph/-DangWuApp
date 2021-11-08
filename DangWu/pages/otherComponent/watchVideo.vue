<template>
	<view class="container">
		<view class="topContainer">
			<view class="top">
				<view :class=" isFinsh ? 'finshmaskPoint':'maskPoint' "></view>
				<view class="maskContent">
					任务点
				</view>
			</view>
		</view>
		<view class="videoContainer">
			<video class="video"
				id="myVideo"
			   :src="videoUrl" 
			   :enable-progress-gesture="enableProgressGesture"
			   title="哈哈哈"
			   @play="startVideo"
			   @timeupdate="changeTime($event)"
			   :initial-time="initiaTime">
			   
		   </video>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				initiaTime:"",
				videoUrl:"",
				// 监视是否播放完毕
				isFinsh:false,
				// 是否开启控制进度的手势
				enableProgressGesture:false,
				// 指定视频初始播放位置，单位为秒（s）。
				// initiaTime:0,
				//实时播放进度,就是播放到的位置
				realTime:0, 
				currentTime:0,
				// 剩余时间
				remainTime:"",
				timer:null,
			}
		},
		onLoad(option){
			let that = this;
			let videoId = option.id;
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('watchVideo', function(data) {
				// 修改视频地址
				that.videoUrl = data.url
				that.initiaTime = data.initiaTime
				that.isFinsh = data.videoIsOK
				// 修改标题
				uni.setNavigationBarTitle({
				    title: data.name
				});
			})
		},
		destroyed(){
			if(this.timer){
				clearInterval(this.timer); 
			}
		},
		methods:{
			startVideo(){
				// 获取 video 上下文 videoContext 对象
				this.videoContext = uni.createVideoContext('myVideo');
				// 进入全屏状态
				this.videoContext.requestFullScreen();
				//开始播放视频，进行记录
				this.recodeWatchTime();
			},
			recodeWatchTime(){
				let that = this;
				// console.log("开始记录了")
				// 每分钟存一次观看记录与剩余时间
				this.timer = setInterval(function(){
					let time = that.currentTime
					var remianTime = that.remainTime;
					if(remianTime > 60){
						remianTime = parseInt( remianTime / 60);
					}else{
						remianTime = 1
					}
					// 传递 观看时间time,剩余时间remainTime
					// console.log(remianTime)
					// console.log("观看到了:"+time);
				},60000);
			},
			changeTime(e){
				//获取视频播放的总时长
				let duration = e.detail.duration
				//实时获取当前播放进度 转化为秒 当前时间 到时候有个视频记录
				let currentTime = parseInt(e.detail.currentTime)
				// 定时器记录观看历史
				this.currentTime = currentTime
				this.remainTime = parseInt(duration - currentTime)
				// 如果没有看完
				if(this.isFinsh == false){
					// console.log(this.isFinsh)
					let isReady = 1; // 是否开启可以视频快进 1 禁止开启
					//跳转到指定播放位置 initial-time 时间为秒
					let that = this;
					
					// console.log("视频播放到第" + currentTime + "秒")//查看正在播放时间，以秒为单位
					// 如果真实播放时间为0，就是还没有开始看
					if (that.realTime==0){
						// 视频的初始时间initTime + 真实时间
						// 监视跳转的时间 初始时间+真实播放时间
					  var jump_time = parseInt(that.initTime) + parseInt(that.realTime)
					}else{
					  var jump_time = parseInt(that.realTime)
					  // console.log(jump_time);
					}
					// 是否开启进度控制 默认开启为1
					if(isReady == 1){
						// 如果跳转的时间超过了三秒
						// 如果当前播放时间大于跳转时间并且 当前进度 - 跳转时间
						if (currentTime > jump_time && currentTime - jump_time > 3){
							let videoContext = uni.createVideoContext('myVideo')
							// seek 跳转到指定位置，单位 s,即将视频跳转到真实的时间
							videoContext.seek(that.realTime)
						}
					}
					// 修改真实播放进度的时间
					that.realTime = currentTime //实时播放进度
					// 判断是否播放完毕
					if(currentTime == jump_time && (duration - currentTime) <= 1 ){
						let videoContext = uni.createVideoContext('myVideo')
						that.isFinsh = true
						videoContext.exitFullScreen()
					}
				}
			},
			
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
	.container{
		width: 100%;
		height: 90%;
		padding: 10upx 30upx 10upx 30upx;
	}
	.topContainer{
		width: 100%;
		height: 100upx;
		/* background-color: pink; */
		position: relative;
	}
	.top{
		margin-left: 40upx;
	}
	.maskPoint{
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		background-color: rgba(218, 161, 80, 1.0);
		position: absolute;
		bottom: 10upx;
	}
	.finshmaskPoint{
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		background-color: rgba(28, 218, 34, 1.0);
		position: absolute;
		bottom: 10upx;
	}
	.maskContent{
		text-align: left;
		width: 100upx;
		height: 40upx;
		position: absolute;
		bottom: 10upx;
		margin-left: 50upx;
	}
	.videoContainer{
		text-align: center;
		margin-top: 20upx;
	}
	.video{
		width: 100%;
	}
		
</style>
