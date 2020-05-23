import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/global.css'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../icon-font/iconfont.css'
import axios from 'axios'
// 导入这个包
// import axios from 'axios'
    //把这个包挂载到vue的原型对象上，然后你就可以在任何 Vue 实例中使用类似 this.$http.get 的方法：
// https://cn.vuejs.org/v2/cookbook/adding-instance-properties.html
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(config=>{
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$message = Message
Vue.prototype.$http = axios



Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
