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
  name: "SystemMessage",
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
  computed: {
    messageType() {
      switch (this.message.msgType) {
        case 3:
          return "申请通过";
        case 4:
          return "申请失败";
        case 5:
          return "邀请成功";
        case 6:
          return "邀请失败";
        case 7:
          return "退出团队";
        case 8:
          return "踢出团队";
        case 11:
          return "文档删除";
      }
    },
    messageContent() {
      switch (this.message.msgType) {
        case 3:
          return "恭喜！您已成功加入团队" + this.message.name + "！";
        case 4:
          return "很遗憾，" + this.message.name + "团队拒绝了你的申请";
        case 5:
          return this.message.name + "同意了你的邀请，已经加入团队了~";
        case 6:
          return this.message.name + "拒绝了你的团队邀请";
        case 7:
          return this.message.name + "退出了你的团队";
        case 8:
          return "管理员已将你踢出团队" + this.message.name;
        case 11:
          return "管理员删除了你的文档" + this.message.name;
      }
    },
  },
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
.message {
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  display: flex;
  margin-bottom: 10px;
  padding: 24px 16px;
}

.message-main {
  flex: 1;
  width: 670px;
}

.message-line1 {
  font-size: 14px;
  line-height: 24px;
}

.message__title {
  color: #333;
  font-weight: 700;
}

.message__time {
  color: #999;
  font-size: 12px;
  line-height: 22px;
  margin-left: 10px;
}

.message-line2 {
  color: #666;
  font-size: 14px;
  line-height: 24px;
  padding-left: 8px;
}

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
