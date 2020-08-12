<template>
  <div>
    <editprofile-item icon="license" title="账号ID" :content="user.userID">
    </editprofile-item>
    <editprofile-item icon="user" title="昵称" content="">
      <input
        @blur="editUserName"
        class="input"
        type="text"
        v-model="userName"
      />
    </editprofile-item>
    <!-- 编辑密码 -->
    <editprofile-item icon="lock" title="密码" content="******">
      <my-button @click="clickPassword" type="primary" size="small">
        修改
      </my-button>
    </editprofile-item>
    <!-- 编辑邮箱 -->
    <editprofile-item icon="email" title="邮箱" :content="user.emailAddress">
      <my-button @click="clickEmail" type="primary" size="small">
        编辑
      </my-button>
    </editprofile-item>
    <!-- 悬浮窗部分 -->
    <!-- 修改密码 -->
    <m-hover
      @submit="submit"
      @cancel="closeAll"
      :onShow="editPwd"
      title="修改密码"
      assureBtn="确定修改"
      cancelBtn="暂不修改"
    >
      <input
        class="hover-input"
        type="password"
        v-model="oldpwd"
        placeholder="当前密码"
      />
      <input
        class="hover-input"
        type="password"
        v-model="newpwd1"
        placeholder="新密码"
      />
      <input
        class="hover-input"
        type="password"
        v-model="newpwd2"
        placeholder="确认新密码"
      />
    </m-hover>
    <!-- 编辑邮箱 -->
    <m-hover
      @submit="submit"
      @cancel="closeAll"
      :onShow="editEmail"
      title="修改绑定邮箱"
      assureBtn="确定修改"
      cancelBtn="暂不修改"
    >
      <input
        class="hover-input"
        type="text"
        v-model="emailAddressNew"
        placeholder="新邮箱地址"
      />
      <div class="group">
        <input
          class="hover-input--small"
          type="text"
          v-model="newCode"
          placeholder="验证码"
        />
        <my-button
          class="group-button"
          @click="sendCode(emailAddressNew)"
          :disabled="isAddress(emailAddressNew)"
          type="text"
          >发送验证码</my-button
        >
      </div>
    </m-hover>
    <!-- 安全验证 -->
    <m-hover
      @submit="submit"
      @cancel="closeAll"
      :onShow="editToken"
      title="安全验证"
      assureBtn="验证"
      cancelBtn="取消"
    >
      <input
        class="hover-input"
        type="text"
        v-model="user.emailAddress"
        placeholder="当前邮箱"
      />
      <div class="group">
        <input
          class="hover-input--small"
          type="text"
          v-model="tokenCode"
          placeholder="验证码"
        />
        <my-button
          class="group-button"
          @click="sendCode(user.emailAddress)"
          :disabled="isAddress(user.emailAddress)"
          type="text"
          >发送验证码</my-button
        >
      </div>
    </m-hover>
  </div>
</template>

<script>
import editprofileItem from "./childCpn/editprofile-item";
import MHover from "components/common/m-hover/m-hover";
import {
  setUserName,
  setUserPassword,
  setEmailAddress
} from "network/profile.js";
import { emailVerification } from "network/user.js";
export default {
  name: "Home",
  data() {
    return {
      userName: "", // 页面临时数据，避免直接修改vuex
      emailAddressNew: "",
      open: false, //  是否打开悬浮窗
      editPwd: false, // 悬浮窗状态
      editEmail: false, // 悬浮窗状态
      editToken: false, // 悬浮窗状态
      token: false, // 是否安全验证
      // 用于修改密码
      oldpwd: "",
      newpwd1: "",
      newpwd2: "",
      // 编辑邮箱
      tokenCode: "", // 安全验证的验证码
      newCode: "" // 新邮箱验证码
    };
  },
  components: {
    editprofileItem,
    MHover
  },
  created() {
    this.userName = this.$store.state.user.userName;
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    closeAll() {
      this.editToken = false;
      this.editPwd = false;
      this.editEmail = false;
    },
    editUserName() {
      setUserName(this.user.userID, this.userName)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "修改昵称成功",
            type: "success"
          });
          // 更新信息
          this.$store.commit("setUserName", this.userName);
        })
        .catch(err => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
        });
    },
    clickPassword() {
      this.editEmail = false;
      this.editPwd = true;
    },
    clickEmail() {
      if (!this.token) {
        this.editToken = true;
        this.editPwd = false;
        this.editEmail = false;
        return;
      }
      this.editToken = false;
      this.editPwd = false;
      this.editEmail = true;
    },
    // 发送验证码
    sendCode(e) {
      emailVerification(e)
        .then(res => {
          this.code = res;
          this.$notify({
            title: "成功",
            message: "验证码发送成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$notify.error({
            title: "未知错误",
            message: "请稍后重试~"
          });
        });
    },
    submit(e) {
      console.log(e);
      if (e == "修改密码") this._changePwd();
      else if (e == "修改绑定邮箱") this._changeEmail();
      else this._checkTokenCode();
    },
    _changePwd() {
      if (this.oldpwd == "" || this.newpwd1 == "" || this.newpwd2 == "")
        this.$message.error("请完整填写三个字段~");
      else if (this.oldpwd != this.user.userPassword)
        this.$message.error("原密码不正确");
      else if (this.newpwd1 != this.newpwd2)
        this.$message.error("两次密码填写不一致");
      // 发送修改密码
      else
        setUserPassword(this.user.userID, this.newpwd1).then(res => {
          this.$notify({
            title: "成功",
            message: "修改密码成功",
            type: "success"
          });
          // 更新信息
          this.$store.commit("setPassword", this.newpwd1);
          this.open = false;
        });
    },
    _checkTokenCode() {
      if (this.code == this.tokenCode) {
        this.$notify({
          title: "成功",
          message: "安全验证成功",
          type: "success"
        });
        this.token = true;
        this.editEmail = true;
      } else {
        this.$notify.error({
          title: "错误",
          message: "验证码不正确~"
        });
      }
    },
    _changeEmail() {
      if (this.code == this.newCode) {
        setEmailAddress(this.user.userID, this.emailAddressNew)
          .then(res => {
            if (res == 0) {
              this.$notify({
                title: "成功",
                message: "邮箱注册成功",
                type: "success"
              });
              // 更新信息
              this.$commit("setEmailAddress", this.emailAddressNew);
              this.open = false;
            } else if (res == 1) {
              this.$notify({
                title: "邮箱已注册",
                message: "该邮箱已经被注册过",
                type: "warning"
              });
            } else
              this.$notify.error({
                title: "未知错误",
                message: "请稍后重试~"
              });
          })
          .catch(err => {
            this.$notify.error({
              title: "未知错误",
              message: "请稍后重试~"
            });
          });
      }
    },
    isAddress(e) {
      //   console.log(e);
      return e.indexOf("@") == -1;
    }
  }
};
</script>

<style scoped>
.input,
.hover-input,
.hover-input--small {
  border: 0px;
  color: #111;
}

.input {
  padding: 15px 0;
}

.hover-input,
.hover-input--small {
  border: 0px;
  color: #111;
  padding: 15px 20px;
  font-size: 15px;
  line-height: 1.5;
}

.hover-input {
  margin-bottom: 10px;
  width: 360px;
}

.input:focus,
.hover-input--small:focus,
.hover-input:focus {
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.group {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.group-button {
  margin-right: 20px;
}
</style>
