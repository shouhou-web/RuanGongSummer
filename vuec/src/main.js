import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import MyButton from "components/common/l-app-button/MyButton";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("MyButton",MyButton) // 自定义按钮

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
