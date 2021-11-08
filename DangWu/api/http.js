// const host = "https://www.baiding.top/api";

// const host = "http://zpf.free.idcfengye.com"
const host = "http://119.3.249.103:9001/";

export function http(url, method, params) {
	// let token = 'token'
	// 封装Token
	let token = uni.getStorageSync('token')
	if(token == ''){
		token = 'token'
	}
	// console.log(token)
	let sign = 'sign'
	let data = {
		token,
		sign
	}
  // 判断是否有发送数据
  if (params.data) {
    for (let key in params.data) {
      if (params.data[key] == null || params.data[key] == 'null') {
        delete params.data[key]
      }
    }
    data = { ...data, ...params.data }
  }
  uni.request({
    url: host + url,
    method: method,
    data,
    header: {
      'content-type': 'application/json',
      'token':data.token
    }, 
    success(res) {
      params.success && params.success(res.data)
    },
    fail(err) {
      params.fail && params.fail(err)
    }
  })
}
export default {
  host
}