import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import MyButton from "components/common/l-app-button/MyButton";
import MHover from "components/common/m-hover/m-hover";
import MNavDropdown from "components/common/m-nav-dropdown/m-nav-dropdown";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("MyButton",MyButton) // 自定义按钮
Vue.component("MHover", MHover) // 自定义悬浮窗
Vue.component("MNavDropdown", MNavDropdown) // 自定义悬浮窗

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
