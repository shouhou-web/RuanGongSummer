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
import { getSystemMsg, getAllMsgNum } from "network/message";
import SystemMessage from "./childCpn/system-message";
export default {
  name: "Message",
  components: {
    SystemMessage,
  },
  data() {
    return {
      messageList: [], // 消息列表
    };
  },
  created() {
    getSystemMsg(this.$store.state.user.userID)
      .then((res) => {
        console.log("system message", res);
        this.messageList = res;
      })
      .then(
        getAllMsgNum(this.$store.state.user.userID).then((res) => {
          this.$store.commit("setAllMsgNum", res);
        })
      )
      .catch((err) => {
        this.$notify.error({
          title: "网络错误",
          message: "请稍后重试~",
        });
      });
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
  overflow: auto;
}
</style>
