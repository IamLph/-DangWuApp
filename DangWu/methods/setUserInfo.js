import * as api from '../api/api.js'
/**
 * 登陆时获取并设置oken
 * @param {Object} name 用户账号
 * @param {Object} pwd 用户密码
 */
export function login(name,pwd){
	api.loginUserApi({
		data:{
			password: pwd,
			username: name
		},
		success:res => {
			if(res.success){
				let token = res.data.token;
				uni.switchTab({
					url: '/pages/component/Index',
					success(res) {
						uni.setStorageSync('token',token)
						setUserInfo()
					}
				});
			}else{
				uni.showToast({
					title:"账号或者密码错误",
					icon:"none"
				})
			}
		},
		fail:err => {
			uni.showToast({
				title:"网络延迟",
				icon:"none"
			})
		}
	})
}
/**
 * 登陆获取并设置用户信息
 */
function setUserInfo(){
	api.getUserInfoByToken({
		data:{},
		success:res=>{
			if(res.success){
				let user = res.data.user
				uni.setStorageSync('user',user)
				setClassInfo(user.classId)
				setDepteInfo(user.deptId)
			}else{
				uni.showToast({
					title:"用户信息获取失败",
					icon:"none"
				})
			}
		},
		fail:err=>{
			uni.showToast({
				title:"网络延迟",
				icon:"none"
			})
		}
	})
}
/**
 * 根据班级id获取班级信息并设置信息
 * @param {Object} classId 班级id
 */
function setClassInfo(classId){
	api.getClassInfo({
		data:{
			clazzId:classId
		},
		success:res=>{
			if(res.success){
				let classObj = res.data.clazz
				uni.setStorageSync('classInfo',classObj)
			}
		},
		fail:err=>{
			uni.showToast({
				title:"网络延迟",
				icon:"none"
			})
		}
	})
}

/**
 * 根据支部Id获取支部信息
 * @param {Object} deptId 支部Id
 */
function setDepteInfo(deptId){
	api.getDeptInfoApi({
		data:{
			deptId:deptId
		},
		success:res=>{
			if(res.success){
				uni.setStorageSync('deptInfo',res.data.dept)
			}else{
				uni.showToast({
					title:"支部信息获取失败",
					icon:"none"
				})
			}
		},
		fail:err=>{
			uni.showToast({
				title:"网络延迟",
				icon:"none"
			})
		}
	})
}