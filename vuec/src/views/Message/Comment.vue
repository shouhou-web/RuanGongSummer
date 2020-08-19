<template>
  <div>
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <comment-message
          @delete="deleteItem(index)"
          :message="item"
        ></comment-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCommentMsg, getAllMsgNum } from "network/message";
import CommentMessage from "./childCpn/comment-message";
export default {
  name: "Application",
  created() {
    console.log(this.$store.state.user.userID);
    getCommentMsg(this.$store.state.user.userID)
      .then((res) => {
        console.log("res", res);
        this.messageList = res;
      })
      .then(
        getAllMsgNum(this.$store.state.user.userID).then((res) => {
          this.$store.commit("setAllMsgNum", res);
        })
      );
  },
  methods: {
    deleteItem(index) {
      console.log("itemIndex", index);
      this.messageList.splice(index, 1);
    },
  },
  data() {
    return {
      messageList: [
        {
          msgID: "123465",
          userID: "123456",
          userName: "守候123",
          imagePath:
            "https://assets.smcdn.cn/static/unmd5/default-avatar-moke.2.png",
          createTime: "21小时前",
          ID: "",
          content: "这里是评论内容",
          isRead: false,
        },
      ], // 消息列表
    };
  },
  components: {
    CommentMessage,
  },
};
</script>

<style scoped>
.message-list {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  margin-bottom: 10px;
  overflow: auto;
  padding: 0 16px;
  height: calc(100vh - 128px);
}
</style>
