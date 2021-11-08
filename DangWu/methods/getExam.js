import * as api from '../api/api.js'

export async function getRandomExamByTypeAndSum(type,sum){
	let data = []
	await api.getRandomQuestionByTypeAndSum({
		data:{
			type:type,
			sum:sum
		},
		success:res=>{
			console.log("成功")
			console.log(res)
			data = res.data.questionContentJsons
		},
		fail:err=>{
			console.log("失败")
		}
	})
	return await data
}