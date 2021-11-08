import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import { reoladUser } from './methods/reloadUser.js'
Vue.prototype.$reoladUser = reoladUser

//引入vuex
import store from 'pages/store/store.js'
//把vuex定义成全局组件
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'
 
const app = new Vue({
    ...App,
	store
})
app.$mount()
