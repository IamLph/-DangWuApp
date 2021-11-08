export function goWithObj({url,method = 'navigateTo',para = {}}) {
	if (method === "switchTab" || method === "navigateBack") {
		console.warn("方法不支持")
		return
	}

	if (method === "" || method === undefined) {
		console.error("方法名为空")
		return
	}
	uni[method]({
		url: url + "?para=" + encodeURIComponent(JSON.stringify(para)),
		success: function(res) {
			// console.log(res)
		},
		file: function(err) {
			// console.error(err)
		}
	})
}

export function toWithObj({option}) {
	if (option === "" || option === undefined) {
		console.warn("参数为空")
		return
	}
	return JSON.parse(decodeURIComponent(option.para))
}
