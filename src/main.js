import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/css/reset.css';
require("./common/dateformat.js");

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#vueApp');
