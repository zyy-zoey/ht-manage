import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//
// import axios from 'axios'
// axios.defaults.baseURL = 'http://liufusong.top:8899/api/private/v1/'
// axios.interceptors.request.use(config => {
//   // 登录授权 请求验证是否有token 需要授权的api，必须在请求头中使用·Authorization·字段提供token令牌
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config // 必须返回 否则没有值
// })
// Vue.prototype.$http = axios
//
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
