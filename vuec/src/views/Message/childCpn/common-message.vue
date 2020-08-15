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
            {{ typeContent }}
          </span>
          <span class="message__teamname">
            {{ message.teamName }}
          </span>
        </div>
        <div class="message__line2">
          {{ message.content }}
        </div>
        <div class="message__line3">
          <div class="message__time">
            {{ message.createTime }}
          </div>
          <div v-if="message.isRead == 2" class="message__isread">
            已同意
          </div>
          <div v-else-if="message.isRead == 3" class="message__isread">
            已拒绝
          </div>
          <div v-else>
            <my-button
              @click="open('accept')"
              class="my-button"
              type="text"
              size="small"
            >
              同意
            </my-button>
            <my-button
              @click="open('refuse')"
              class="my-button"
              type="text"
              size="small"
            >
              拒绝
            </my-button>
          </div>
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
      :title="assureTitle"
      :onShow="openAssure"
      assureBtn="确定"
      cancelBtn="取消"
      @submit="submit"
      @cancel="cancel"
    >
      {{ assureContent }}?</m-hover
    >
  </div>
</template>

<script>
import {
  deleteMsg,
  acceptMember,
  refuseMember,
  joinTeam,
  refuseTeam,
} from "network/message";
export default {
  name: "CommonMessage",
  props: {
    message: {
      // message消息内容
      type: Object,
      default: {},
    },
    type: {
      // 消息类型
      type: String,
      default: "application",
    },
  },
  computed: {
    typeContent() {
      if (this.type == "application") return "申请加入你的团队";
      else return "邀请你加入团队";
    },
  },
  data() {
    return {
      openAssure: false, // 是否打开确认框
      openType: "", // 确认框类型
      assureTitle: "", // 确认框标题
      assureContent: "", // 确认框内容
    };
  },
  watch: {
    openType(openType) {
      console.log("watch:", openType);
      switch (openType) {
        case "accept":
          this.assureTitle = "同意";
          if (this.type == "application")
            this.assureContent = "是否确定同意该申请";
          else this.assureContent = "是否确定同意该邀请";
          break;
        case "refuse":
          this.assureTitle = "拒绝";
          if (this.type == "application")
            this.assureContent = "是否确定拒绝该申请";
          else this.assureContent = "是否确定拒绝该邀请";
          break;
        case "delete":
          this.assureTitle = "删除";
          this.assureContent = "删除该条消息后将无法恢复，是否继续";
      }
    },
  },
  methods: {
    open(type) {
      console.log(type);
      // 打开悬浮窗
      this.openType = type;
      this.openAssure = true;
    },
    cancel() {
      // 关闭悬浮窗
      this.openAssure = false;
      this.openType = "";
    },
    submit() {
      switch (this.openType) {
        case "accept":
          this.assureTitle = "同意";
          if (this.type == "application") this._acceptMember();
          else this._joinTeam();
          break;
        case "refuse":
          this.assureTitle = "拒绝";
          if (this.type == "application") this._refuseMember();
          else this._refuseTeam();
          break;
        case "delete":
          this._deleteMsg();
          break;
      }
    },
    _refuseTeam() {
      // 拒绝邀请
      refuseTeam(
        this.$store.state.user.userID,
        this.message.userID,
        this.message.teamID,
        this.message.msgID
      )
        .then((res) => {
          this.cancel();
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "已拒绝对方的邀请",
              type: "success",
            });
            this.message.isRead = 3;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    _refuseMember() {
      // 拒绝申请
      refuseMember(
        this.$store.state.user.userID,
        this.message.userID,
        this.message.teamID,
        this.message.msgID
      )
        .then((res) => {
          this.cancel();
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "已拒绝申请",
              type: "success",
            });
            this.message.isRead = 3;
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    _joinTeam() {
      // 接受邀请
      joinTeam(
        this.$store.state.user.userID,
        this.message.userID,
        this.message.teamID,
        this.message.msgID
      )
        .then((res) => {
          this.cancel();
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "已加入团队",
              type: "success",
            });
            this.message.isRead = 2;
          } else {
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    _acceptMember() {
      // 接受申请
      acceptMember(
        this.$store.state.user.userID,
        this.message.userID,
        this.message.teamID,
        this.message.msgID
      )
        .then((res) => {
          this.cancel();
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "已通过该申请",
              type: "success",
            });
            this.message.isRead = 2;
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    _deleteMsg() {
      // 删除消息
      console.log(this.message.msgID);
      deleteMsg(this.message.msgID)
        .then((res) => {
          this.cancel();
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
  display: flex;
  padding-top: 24px;
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

.message__teamname {
  color: skyblue;
  font-weight: 600;
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

.message__time {
  min-width: 50px;
}

.my-button {
  margin-left: 5px;
  padding: 5px;
}

.message__isread {
  margin-left: 20px;
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
  justify-content: center;
  height: 60px;
  opacity: 0;
  width: 100px;
}

.message-aside__img {
  height: 30px;
  width: 30px;
}

.message-aside__text {
  font-size: 12px;
  margin-top: 10px;
}

.message__div {
  border-bottom: 1px solid #e5e9ef;
  height: 1px;
  margin: 0 auto;
  position: relative;
  width: calc(100% - 44px);
}
</style>
