<template>
  <div id="message">
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <team-message :message="item"></team-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCommonMsg } from "network/message";
import teamMessage from "./childCpn/team-message";
export default {
  name: "Message",
  created() {
    console.log(this.$store.state.user.userID)
    getCommonMsg(1, this.$store.state.user.userID).then((res) => {
      console.log("res", res);
      this.messageList = res;
    });
  },
  data() {
    return {
      messageList: [
        {
          userImagePath:
            "https://img-static.mihoyo.com/communityweb/upload/0e16987863d21f5344d4d1d85af4f665.png",
          userName: "守候",
          content: "我特别特别相加你的团队！！万望同意orz",
          createTime: "2020年8月9日 12:17",
          teamName: "北航软工",
        },
      ],
    };
  },
  components: {
    teamMessage,
  },
};
</script>

<style scoped>
.message-list {
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 0 16px 24px;
  height: calc(100vh - 152px);
}
</style>
