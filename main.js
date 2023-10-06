import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView);

// 引入vuex
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import store from '@/store';

const app = new Vue({
		store,
    ...App
})

// require('./common/request')(app)

// 自定义工具
import utils from '@/common/utils.js'
Vue.use(utils, app)

// 引入请求封装，将app参数传递到配置中
require('@/common/request.js')(app)

app.$mount()
