<template>
  <div>
    <editprofile-item icon="user" title="昵称" content="">
      <input class="input" type="text" v-model="userName" />
    </editprofile-item>
    <!-- 编辑密码 -->
    <editprofile-item icon="lock" title="密码" content="******">
      <my-button @click="clickPassword" type="primary" size="small">
        修改
      </my-button>
    </editprofile-item>
    <!-- 编辑邮箱 -->
    <editprofile-item icon="email" title="邮箱" :content="emailAddress">
      <my-button @click="clickEmail" type="primary" size="small">
        编辑
      </my-button>
    </editprofile-item>
    <!-- 阴影 -->
    <div
      :class="[open ? '' : 'page-hide']"
      @click="open = !open"
      class="page-mask"
    ></div>
    <div :class="[open ? 'hover' : 'page-hide']">
      <!-- 修改密码 -->
      <editprofile-hover
        @submit="submit"
        @cancel="changeOpen"
        v-if="editPwd"
        title="修改密码"
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
      </editprofile-hover>
      <!-- 编辑邮箱 -->
      <editprofile-hover
        @submit="submit"
        @cancel="changeOpen"
        v-else-if="editEmail"
        title="修改绑定邮箱"
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
          <my-button :disabled="isAddress(emailAddressNew)" type="text"
            >发送验证码</my-button
          >
        </div>
      </editprofile-hover>
      <!-- 安全验证 -->
      <editprofile-hover
        @submit="submit"
        @cancel="changeOpen"
        v-else
        title="安全验证"
      >
        <input
          class="hover-input"
          type="text"
          v-model="emailAddress"
          placeholder="当前邮箱"
        />
        <div class="group">
          <input
            class="hover-input--small"
            type="text"
            v-model="tokenCode"
            placeholder="验证码"
          />
          <my-button :disabled="isAddress(emailAddress)" type="text"
            >发送验证码</my-button
          >
        </div>
      </editprofile-hover>
    </div>
  </div>
</template>

<script>
import editprofileItem from "./childCpn/editprofile-item";
import editprofileHover from "./childCpn/editprofile-hover";
export default {
  name: "Home",
  data() {
    return {
      userName: "",
      userPassword: "",
      emailAddress: "",
      open: false, //  是否打开悬浮窗
      editPwd: false, // 悬浮窗状态
      editEmail: false, // 悬浮窗状态
      // 用于修改密码
      oldpwd: "",
      newpwd1: "",
      newpwd2: "",
      // 编辑邮箱
      token: "", // 是否安全验证
      tokenCode: "", // 安全验证的验证码
      newCode: "" // 新邮箱验证码
    };
  },
  components: {
    editprofileItem,
    editprofileHover
  },
  created() {
    this.userName = this.$store.state.user.userName;
    this.userPassword = this.$store.state.user.userPassword;
    // this.emailAddress = this.$store.state.user.emailAddress;
    this.emailAddress = "18373337@buaa.edu.cn";
  },
  methods: {
    changeOpen() {
      this.open = !this.open;
    },
    clickPassword() {
      this.changeOpen();
      this.editEmail = false;
      this.editPwd = true;
    },
    clickEmail() {
      this.changeOpen();
      if (!this.token) {
        this.editPwd = false;
        this.editEmail = false;
        return;
      }
      this.editPwd = false;
      this.editEmail = true;
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
      else if (this.oldpwd != this.userPassword)
        this.$message.error("原密码不正确");
      else if (this.newpwd1 != this.newpwd2)
        this.$message.error("两次密码填写不一致");
    //   else  发送修改密码
    },
    _checkTokenCode(){
        
    },
    _changeEmail(){

    },
    isAddress(e) {
      //   console.log(e.indexOf('@'));
      return e.indexOf("@") == -1;
    }
  }
};
</script>

<style scoped>
.page-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
}

.hover {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 4px;
  width: 375px;
  left: 40%;
  top: 20%;
  z-index: 4;
}

.page-hide {
  display: none;
}

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
</style>
