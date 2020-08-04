<template>
  <div>
    <div class="profile-header">THIS IS PROFILE</div>
  </div>
</template>

<script>
import {login, register} from "@/network/user";

export default {
  name: "Profile",
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      divtype: 1,
      isLoaded: false
    }
  },
  methods: {
    openLogin: function () {
      this.divtype = 1;
    },

    openRegister: function () {
      this.divtype = 2;
    },

    loginSubmit: function () {
      if (!this.username || !this.password) {
        this.$message(
          {
            message: '用户名/密码不可为空',
            type: 'warning'
          }
        );
        return;
      }

      login(this.username, this.password)
        .then(
          res => {
            // 输出res
            console.log("result", res)

            sessionStorage.setItem("user", JSON.stringify(res));
            console.log("session", sessionStorage.getItem("user"))


            if (res === null || res === "") {
              this.$message.error("登录失败，请检查用户名和密码")
            } else {
              this.$message.success("登录成功，欢迎 " + this.username + " !")
            }
          }
        )
        .catch(
          err => {
            console.log("err:" + err);
            this.$message.error("网络错误！")
          }
        )
    },

    registerSubmit: function () {
      if (!this.username || !this.password || !this.password2) {
        this.$message({
          message: "用户名或密码不能为空",
          type: "warning"
        });
        return;
      }

      register(this.username, this.password, this.password2)
        .then(
          res => {
            console.log("res:" + res);
          }
        )
        .catch(
          err => {
            console.log(err);
          }
        )
    }
  },
  props: {},
};
</script>

<style>
.profile-header {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
