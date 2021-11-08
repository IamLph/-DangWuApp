export function getUser(){
	return uni.getStorageSync('user')
}

export function getClassInfo(){
	return uni.getStorageSync('classInfo')
}

export function getDeptInfo(){
	return uni.getStorageSync('deptInfo')
}