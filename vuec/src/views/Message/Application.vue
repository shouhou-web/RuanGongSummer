<template>
  <div>
    <ul class="message-list">
      <li v-for="(item, index) in messageList" :key="index">
        <common-message
          :message="item"
          @delete="deleteItem(index)"
        ></common-message>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCommonMsg } from "network/message";
import commonMessage from "./childCpn/common-message";
export default {
  name: "Application",
  created() {
    console.log(this.$store.state.user.userID);
    getCommonMsg(1, this.$store.state.user.userID).then((res) => {
      console.log("res", res);
      this.messageList = res;
    });
  },
  methods: {
    deleteItem(index) {
      console.log("itemIndex", index);
      this.messageList.splice(index,1)
    },
  },
  data() {
    return {
      messageList: [], // 消息列表
    };
  },
  components: {
    commonMessage,
  },
};
</script>

<style scoped>
.message-list {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 0 16px;
  height: calc(100vh - 128px);
}
</style>
