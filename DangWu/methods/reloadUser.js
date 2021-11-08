export function reoladUser(){
	let user = uni.getStorageSync('user')
	let token = uni.getStorageSync('token')
	// console.log("执行了")
	// console.log(user)
	// console.log(token)
	if(user != '' && token != ''){
		this.$store.commit('setUser',user)
		this.$store.commit('setToken',token)
	}else{
		uni.reLaunch({
		    url: '/pages/index/login.vue'
		});
	}
}