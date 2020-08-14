<template>
  <div>
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <system-message
          @delete="deleteItem(index)"
          :message="item"
        ></system-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSystemMsg } from "network/message";
import SystemMessage from "./childCpn/system-message";
export default {
  name: "Message",
  components: {
    SystemMessage,
  },
  data() {
    return {
      messageList: [
        {
          msgID: "",
          msgType: 3, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
        {
          msgID: "",
          msgType: 4, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
        {
          msgID: "",
          msgType: 5, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
        {
          msgID: "",
          msgType: 6, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
        {
          msgID: "",
          msgType: 7, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
        {
          msgID: "",
          msgType: 8, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
        {
          msgID: "",
          msgType: 11, // 消息类型
          name: "软工小学期", // 用户/团队/文档名称，行为主体
          createTime: "2020年8月9日 12:17", // 创建时间
        },
      ], // 消息列表
    };
  },
  created() {
    // getSystemMsg(this.$store.state.user.userID)
    //   .then((res) => {
    //     console.log("system message", res);
    //     // this.messageList = res;
    //   })
    //   .catch((err) => {
    //     this.$notify.error({
    //       title: "网络错误",
    //       message: "请稍后重试~",
    //     });
    //   });
  },
  methods: {
    deleteItem(index) {
      console.log("itemIndex", index);
      this.messageList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.message-list {
  border-radius: 4px;
  margin-bottom: 10px;
  height: calc(100vh - 128px);
}
</style>
