import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from '../vuex/getters.js'
import mutations from '../vuex/mutations.js'

const store = new Vuex.Store({
    state: {
		user:null,
		token:null
	},
    mutations,
	getters
})
export default store