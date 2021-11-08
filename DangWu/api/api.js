import { http } from './http.js';

// 登陆接口
export function loginUserApi(params){
	http('/user/loginUser','post',params)
}
// 根据Token获取用户信息
export function getUserInfoByToken(params){
	http('/user/analysisToken','get',params)
}
// 根据班级Id获取班级
export function getClassInfo(params){
	http('/clazz/clazz','get',params)
}
// 根据deptId获取支部信息
export function getDeptInfoApi(params){
	http('/dept/selectDeptId','get',params)
}

// 根据类型获取试题
export function getRandomQuestionByTypeAndSum(params){
	http('/question/randomQuestions','get',params)
}