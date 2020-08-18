<template>
  <div id="message">
    <m-app-header></m-app-header>
    <div class="main">
      <div class="aside">
        <div class="aside-header">
          消息中心
        </div>
        <ul>
          <li
            class="aside-item"
            @click="toChild(index)"
            :class="[currentIndex == index ? 'aside-item--active' : '']"
            v-for="(item, index) in navList"
            :key="index"
          >
            <div class="pointer"></div>
            <div class="aside__inner">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content-header">
          <div class="content-title">
            {{ navList[currentIndex].name }}
          </div>
        </div>
        <div class="content-main">
          <!-- 页面主组件 -->
          <div class="content-main--inner">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllMsgNum } from "network/message";
export default {
  name: "Message",
  data() {
    return {
      navList: [
        {
          name: "加入申请",
          router: "application",
        },
        {
          name: "团队邀请",
          router: "invitation",
        },
        {
          name: "回复我的",
          router: "comment",
        },
        {
          name: "系统通知",
          router: "system",
        },
      ],
    };
  },
  methods: {
    toChild(index) {
      let target = this.navList[index].router;
      this.$router.push("/message/" + target);
    },
  },
  computed: {
    currentIndex() {
      getAllMsgNum(this.$store.state.user.userID).then((res) => {
        this.$store.commit("setAllMsgNum", res);
      });
      switch (this.$route.path) {
        case "/message/application":
          return 0;
        case "/message/invitation":
          return 1;
        case "/message/comment":
          return 2;
        case "/message/system":
          return 3;
      }
    },
  },
};
</script>

<style scoped>
#message {
  background-color: var(--color-background-main);
}

#message ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

#message ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #a1c4fd;
}

#message ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(236, 186, 186, 0.2);
  background: none;
  border-radius: 10px;
}

.main {
  display: flex;
  height: calc(100vh - 56px);
  margin: 0 auto;
  max-width: 1143px;
}

.aside {
  background-color: rgba(255, 255, 255, 0.8);
  width: 140px;
  height: calc(100vh - 56px);
}

.aside-header {
  align-items: center;
  color: #333;
  display: flex;
  font-style: 14px;
  font-weight: 600;
  justify-content: center;
  height: 62px;
}

.aside-item {
  align-items: center;
  color: #6b757b;
  display: flex;
  padding-left: 20px;
}

.aside-item--active,
.aside-item:hover {
  color: #2faee3;
}

.pointer {
  border: 4px solid currentColor;
  border-radius: 50%;
  margin-right: 10px;
}

.aside__inner {
  cursor: pointer;
  font-style: 14px;
  line-height: 40px;
}

.content {
  background-color: rgba(255, 255, 255, 0.5);
  flex: 1;
}

.content-header {
  padding: 10px 10px 0;
  width: 100%;
}

.content-title {
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  border-radius: 4px;
  color: #666;
  display: flex;
  font-size: 15px;
  height: 42px;
  padding-left: 16px;
}

.content-main {
  padding: 10px 10px 0;
}

.content-main--inner {
  border-radius: 4px;
}
</style>
