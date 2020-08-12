import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store/index";
import "element-ui/lib/theme-chalk/index.css";

import MAppHeader from "components/content/m-app-header/MAppHeader";
import MyButton from "components/common/l-app-button/MyButton";
import MHover from "components/common/m-hover/m-hover";
import MNavDropdown from "components/common/m-nav-dropdown/m-nav-dropdown";
import LCard from "components/common/l-card/l-card";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.component("MAppHeader", MAppHeader); // 全局导航栏
Vue.component("MyButton", MyButton); // 自定义按钮
Vue.component("MHover", MHover); // 自定义悬浮窗
Vue.component("MNavDropdown", MNavDropdown); // 自定义悬浮窗
Vue.component("LCard",LCard) // 自定义文档卡片

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
