import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import { getCollaboratorInfo } from "network/doc";

// 欢迎页
const Index = () => import("views/Index.vue");

// 首页相关组件
const Home = () => import("views/Home/Home.vue");

// 登陆注册
const Login = () => import("views/Login/Login.vue");
const ForgetPwd = () => import("views/ForgetPwd/ForgetPwd.vue");

// 个人界面
const Profile = () => import("views/Profile/Profile.vue");
// const EditProfile = () => import("views/Profile/EditProfile.vue");

// 工作台二级导航栏
const WorkSpace = () => import("views/Home/WorkSpace/WorkSpace.vue");
const TeamSpace = () => import("views/TeamSpace/TeamSpace.vue");

const Recent = () => import("views/Home/WorkSpace/Recent/Recent.vue"); // 最近浏览界面
const IMade = () => import("views/Home/WorkSpace/IMade/IMade.vue"); // 我的创建界面
const MyCollection = () =>
  import("views/Home/WorkSpace/MyCollection/MyCollection.vue"); // 我的收藏界面

// 回收站界面
const Trash = () => import("views/Trash/Trash.vue");

// 文档编辑
const Doc = () => import("views/Doc/Doc.vue");

// 消息组件
const Message = () => import("views/Message/Message.vue");
const Invitation = () => import("views/Message/Invitation.vue");
const Application = () => import("views/Message/Application.vue");
const System = () => import("views/Message/System.vue");
const Comment = () => import("views/Message/Comment.vue");

//1.安装插件
Vue.use(VueRouter);

//创建router
const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
    // redirect重定向
    // redirect: "/home/workSpace"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/home/workSpace",
    children: [
      {
        path: "/home/workSpace",
        name: "WorkSpace",
        component: WorkSpace,
        children: [
          {
            path: "/home/workSpace",
            // redirect重定向
            redirect: "/home/workSpace/recent"
          },
          {
            path: "/home/workSpace/recent",
            name: "Recent",
            component: Recent
          },
          {
            path: "/home/workSpace/iMade",
            name: "IMade",
            component: IMade
          },
          {
            path: "/home/workSpace/myCollection",
            name: "MyCollection",
            component: MyCollection
          }
        ]
      },
      {
        path: "/home/trash",
        name: "Trash",
        component: Trash
      },
      {
        path: "/home/teamSpace",
        name: "TeamSpace",
        component: TeamSpace
      }
    ]
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
    // children: [
    //   {
    //     path: "/",
    //     // redirect重定向
    //     redirect: "/profile/editProfile"
    //   },
    //   {
    //     path: "/profile/editProfile",
    //     name: "EditProfile",
    //     component: EditProfile
    //   }
    // ]
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/forgetPwd",
    name: "ForgetPwd",
    component: ForgetPwd
  },
  {
    path: "/doc",
    name: "Doc",
    component: Doc
  },
  {
    path: "/message",
    name: "Message",
    component: Message,
    children: [
      {
        path: "/",
        // redirect重定向
        redirect: "/message/application"
      },
      {
        path: "/message/application",
        name: "Application",
        component: Application
      },
      {
        path: "/message/invitation",
        name: "Invitation",
        component: Invitation
      },
      {
        path: "/message/system",
        name: "System",
        component: System
      },
      {
        path: "/message/comment",
        name: "System",
        component: Comment
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  getCollaboratorInfo(0).then(res => {
    store.commit("setDocCol", res);
    store.commit("login", { userID: 1 });
  });
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  // 这里是修改名字的全局守护路由，暂不应用
  // document.title = to.matched[0].meta.title;
  if (to.path === "/home/workSpace/recent") {
    store.commit("homeleftnav", 1);
    store.commit("homemidnav", 1);
  } else if (to.path === "/home/workSpace/iMade") {
    store.commit("homeleftnav", 1);
    store.commit("homemidnav", 2);
  } else if (to.path === "/home/workSpace/myCollection") {
    store.commit("homeleftnav", 1);
    store.commit("homemidnav", 3);
  } else if (to.path === "/home/trash") store.commit("homeleftnav", 2);
  else if (to.path === "/home/teamSpace") store.commit("homeleftnav", 3);
  next();
});

export default router;
