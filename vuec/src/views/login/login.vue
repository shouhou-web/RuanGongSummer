<template>
  <div class="login-main">
    <div class="intro"></div>
    <div class="div-line"></div>
    <div class="login">
      <div class="card-main">
        <h1>Login · 登录</h1>
        <div class="div-raw"></div>
        <div class="username-main">
          <div
            class="name"
            :class="{'name-hover':active_username,'name-back':back_username}">用户名</div>
          <input
            v-model="username"
            @focus="active_username = true, back_username = false"
            @blur="active_username = false || hasUsername, back_username = true && !hasUsername"
          ></input>
          <div
            class="active-div"
            :class="{'active-div-hover':active_username,'active-div-back':back_username}"></div>
          <!--      <div class="active-div" style="margin-top: -2px"></div>-->
        </div>
        <div class="password-main">
          <div
            class="name"
            :class="{'name-hover':active_password,'name-back':back_password}">密码</div>
          <input
            type="password"
            v-model="password"
            @focus="active_password = true, back_password = false"
            @blur="active_password = false || hasPassword, back_password = true && !hasPassword"
          ></input>
          <div
            class="active-div"
            :class="{'active-div-hover':active_password,'active-div-back':back_password}"></div>
          <!--      <div class="active-div" style="margin-top: -2px"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../../network/user.js';
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      active_username: false,
      back_username: false,
      has_username: false,

      active_password: false,
      back_password: false,
      has_password: false,
    }
  },
  methods: {
    loginSubmit() {
      if (!this.username || !this.password) {
        this.$message({
            message: "用户名或密码不能为空",
            type: "warning"
          });
        return;
      }

      login(this.username, this.password)
        .then(
          res => {
            console.log(res);
            if (res == null || res == "")
            {
              this.$message.error("用户名与密码不匹配");
              return;
            }
            else
            {
              sessionStorage.setItem("user", JSON.stringify(res));
              console.log("本地缓存", sessionStorage.getItem("user"));

              this.$store.commit("login", res);
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });

              this.username = "";
              this.password = "";
            }
          })
        .catch(
          err => {
            this.$message.error("请检查网络");
            return;
          });
    },
  },
  computed: {
    hasUsername: function (){
      this.has_username = (this.username !== null) && (this.username !== '');
      return (this.username !== null) && (this.username !== '');
    },

    hasPassword: function (){
      this.has_password = (this.password !== null) && (this.password !== '');
      return (this.password !== null) && (this.password !== '');
    }
  }
};
</script>
<style>
*{
  font-family: "JetBrains Mono",SimHei;
}

.intro{
  width: 50%;
  border: 2px solid red;
}

.div-line{
  width: 2px;
  margin-left: 20px;
  height: inherit;
  background-color: #999999;
}

.div-raw{
  width: 400px;
  height: 2px;
  background-color: #ff8198;
}

.login-main{
  display: flex;
  flex-direction: row;
}

.login{
  height: 720px;
  margin-left: 80px;
  margin-top: 80px;
}

.username-main{
  margin-top: 30px;
  margin-left: 10%;
  /*position: absolute;*/
}

.password-main{
  margin-top: 30px;
  margin-left: 10%;
}

.active-div{
  background-color: #949494;
  width: 300px;
  height: 2px;
}

.active-div-hover{
  background-color: #ff8198;
  transition: 0.3s ease;
}

.active-div-back{
  transform: translateY(-50%);
  transition: 0.3s ease;
}

input{
  width: 300px;
  height: 40px;
  background-color:transparent;
  border:0;
  border-radius: 10px;
}

.name{
  position: absolute;
  margin-top: 8px;
  margin-left: 0px;
  font-size: 18px;
  z-index: -1;
}

.name-state{
  margin-top: 20px;
}

.name-hover{
  /*transform: translateY(-200%);*/
  color: #ff8198;
  transform: scale(0.7) translateY(-200%) translateX(-20%);
  transition: 0.3s ease;
}

.name-back{
  transform: scale(1/0.7) translateY(200%);
  transition: 0.3s ease;
}

.card-main{
  border: 2px dashed #949090;
  border-radius: 10px;
  width: 500px;
  height: 500px;
  padding-left: 50px;
}
</style>

