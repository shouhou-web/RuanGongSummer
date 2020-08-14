<template>
  <div>
    <div class="message">
      <div class="message-main">
        <!-- 第一行 -->
        <div class="message-line1">
          <span class="message__title">
            {{ messageType }}
          </span>
          <span class="message__time">
            {{ message.createTime }}
          </span>
        </div>
        <!-- 第二行 -->
        <div class="message-line2">
          <span class="message__content">
            {{ messageContent }}
          </span>
        </div>
      </div>
      <div @click="open('delete')" class="message-aside">
        <img
          class="message-aside__img"
          src="@/assets/icon/message/delete.png"
          alt=""
        />
        <div class="message-aside__text">删除该消息</div>
      </div>
    </div>
    <div class="message__div"></div>
    <m-hover
      title="删除"
      :onShow="openAssure"
      assureBtn="确定"
      cancelBtn="取消"
      @submit="deleteMsg"
      @cancel="cancel"
    >
      删除该条消息后将无法恢复，是否继续？
    </m-hover>
  </div>
</template>

<script>
import { deleteMsg } from "network/message";
export default {
  name: "CommentMessage",
  props: {
    message: {
      // message消息内容
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      openAssure: false, // 是否打开确认框
    };
  },
  computed: {},
  methods: {
    open() {
      // 打开悬浮窗
      this.openAssure = true;
    },
    cancel() {
      // 关闭悬浮窗
      this.openAssure = false;
    },
    deleteMsg() {
      // 删除消息
      console.log(this.message.msgID);
      deleteMsg(this.message.msgID)
        .then((res) => {
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "删除消息成功",
              type: "success",
            });
            this.$emit("delete");
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
  },
};
</script>

<style scoped>
.message:hover .message-aside {
  opacity: 1;
}

.message-aside {
  align-items: center;
  color: #999;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 48px;
  opacity: 0;
  width: 100px;
}

.message-aside__img {
  height: 24px;
  width: 24px;
}

.message-aside__text {
  font-size: 12px;
  margin-top: 10px;
}
</style>
