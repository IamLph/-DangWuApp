// 总必备数据配置

// 首页轮播图
export const sildeShow = {
	// 轮播切换时间
	interval:2000,
	indexImgList:[
		{
			"id":'101',
			"src":"/static/image/img/head.png"
		},{
			"id":'102',
			"src":"/static/image/img/head002.jpg"
		},{
			"id":'103',
			"src":"/static/image/img/head003.jpg"
		},{
			"id":'104',
			"src":"/static/image/img/head004.jpg"
		},{
			"id":'105',
			"src":"/static/image/img/head002.jpg"
		}
	]
}

// 首页四个小功能图标
export const opList = [
	{ 
		"id":1,
		"src":"../../static/image/icon/index_err.png",
		"text":"错题"
	},
	{
		"id":2,
		"src":"../../static/image/icon/index_pra.png",
		"text":"练习"
	},
	{
		"id":3,
		"src":"../../static/image/icon/index_coll.png",
		"text":"收藏"
	},
	{
		"id":4,
		"src":"../../static/image/icon/index_more.png",
		"text":"更多"
	}
]

// 我的信息背景图片
export const bgImg = "../../static/door.jpg"

// 练习试题时每次获取的题目数量
// 1.单选题  2.多选题  3.判断题 4.填空题 5.简答题
export const SUM1 = "5"
export const SUM2 = "2"
export const SUM3 = "4"
export const SUM4 = "3"
export const SUM5 = "2"
// 练习题时的时长
export const EXAMTIME = "10:30"
// 分钟
export const EXAMTIMEMINYUTES = 10
// 秒
export const EXAMTIMESECONDS = 30

// 消息顶部信息类型
export const MSGTYPELIST = [
	{
		"id":0,
		"content":"提醒消息"
	},{
		"id":1,
		"content":"私信"
	},{
		"id":2,
		"content":"赞"
	},{
		"id":3,
		"content":"其他消息"
	}
] 