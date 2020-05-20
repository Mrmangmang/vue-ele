import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import  './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../icon-font/iconfont.css'
// 导入这个包
import axios from 'axios'
axios.defaults.baseURI='http://127.0.0.1:8888/api/private/v1/'
    //把这个包挂载到vue的原型对象上，这样每个vue组件
// https://cn.vuejs.org/v2/cookbook/adding-instance-properties.html
Vue.prototype.$http = axios
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
