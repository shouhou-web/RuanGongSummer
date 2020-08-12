<template>
  <div>
    <div class="message">
      <div class="message-header">
        <img :src="message.userImagePath" alt="" />
      </div>
      <div class="message-main">
        <div class="message__line1">
          <span class="message__name">
            {{ message.userName }}
          </span>
          <span class="message__type">
            申请加入你的团队
          </span>
        </div>
        <div class="message__line2">
          {{ message.content }}
        </div>
        <div class="message__line3">
          <div class="message__time">
            {{ message.createTime }}
          </div>
          <my-button class="my-button" type="text" size="small">
            同意
          </my-button>
          <my-button class="my-button" type="text" size="small">
            拒绝
          </my-button>
        </div>
      </div>
      <div class="message-aside">
        {{ message.teamName }}
      </div>
    </div>
    <div class="message__div"></div>
  </div>
</template>

<script>
export default {
  name: "TeamMessage",
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  components: {}
};
</script>

<style scoped>
.message {
  display: flex;
  padding-bottom: 24px;
}

.message-header {
  width: 60px;
  height: 46px;
}

.message-header img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
}

.message-main {
  flex: 1;
}

.message__line1 {
  color: #505050;
  font-size: 14px;
  line-height: 15px;
  margin-bottom: 10px;
}

.message__name {
  color: #222;
  margin-right: 8px;
  font-weight: bold;
}

.message__line2 {
  color: #222;
  font-size: 14px;
  margin-bottom: 10px;
}

.message__line3 {
  align-items: center;
  color: #999;
  display: flex;
  font-size: 12px;
  line-height: 22px;
}

.my-button {
  margin-left: 10px;
  padding: 5px;
}

.message-aside {
  color: #999;
  height: 60px;
  font-size: 14px;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60px;
}

.message__div {
  border-bottom: 1px solid #e5e9ef;
  height: 1px;
  margin: 0 auto;
  position: relative;
  width: calc(100% - 44px);
}
</style>
