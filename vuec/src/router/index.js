import Vue from "vue";
import VueRouter from "vue-router";

// 首页相关组件
const Home = () => import("views/Home/Home.vue");

// 登陆注册
const Login = () => import("views/Login/Login.vue");
const ForgetPwd = () => import("views/ForgetPwd/ForgetPwd.vue");

// 个人界面
const Profile = () => import("views/Profile/Profile.vue");
const EditProfile = () => import("views/Profile/EditProfile.vue");

// 工作台二级导航栏
const WorkSpace = () => import("views/Home/WorkSpace/WorkSpace.vue");
const Recent = () => import("views/Home/WorkSpace/Recent/Recent.vue"); // 最近浏览界面
const IMade = () => import("views/Home/WorkSpace/IMade/IMade.vue"); // 我的创建界面
const MyCollection = () =>
  import("views/Home/WorkSpace/MyCollection/MyCollection.vue"); // 我的收藏界面

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
    component: Home,
    children: [
      {
        path: "workspace",
        name: "WorkSpace",
        component: WorkSpace,
        children: [
          {
            path: "recent",
            name: "Recent",
            component: Recent
          },
          {
            path: "imade",
            name: "IMade",
            component: IMade
          },
          {
            path: "mycollection",
            name: "MyCollection",
            component: MyCollection
          }
        ]
      }
    ]
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    children: [
      {
        path: "/",
        // redirect重定向
        redirect: "/profile/editProfile"
      },
      {
        path: "/profile/editProfile",
        name: "EditProfile",
        component: EditProfile
      }
    ]
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forgetPwd",
    name: "ForgetPwd",
    component: ForgetPwd
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
