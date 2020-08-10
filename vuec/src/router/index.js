import Vue from "vue";
import VueRouter from "vue-router";

// 首页相关组件
const Home = () => import("views/Home/Home.vue");
// 登陆注册
const Login = () => import("views/login/login.vue");
// 个人界面
const Profile = () => import("views/Profile/Profile.vue");

//1.安装插件
Vue.use(VueRouter);

//创建router
const routes = [
  {
    path: "/",
    // redirect重定向
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/login/:choice",
    name: "Login",
    component: Login,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  // 这里是修改名字的全局守护路由，暂不应用
  // document.title = to.matched[0].meta.title;
  next();
});

export default router;
