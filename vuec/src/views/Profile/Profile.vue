<template>
  <div>
    <div class="profile-header">THIS IS PROFILE</div>
    <div class="tools">
      <div class="a-tool" @click="openLogin">登录</div>
      <div class="a-tool" @click="openRegister">注册</div>
    </div>
    <div>
      <div v-if="divtype === 1" class="input-container">
        <input class="a-input" placeholder="username" v-model="username"></input>
        <input class="a-input" placeholder="password" v-model="password" type="password"></input>
        <div @click="loginSubmit" class="fake-button-submit">submit</div>
      </div>
      <div v-else-if="divtype === 2" class="input-container">
        <input class="a-input" placeholder="username" v-model="username"></input>
        <input class="a-input" placeholder="password" v-model="password" type="password"></input>
        <input class="a-input" placeholder="password again" v-model="password2"></input>
        <div @click="registerSubmit" class="fake-button-submit">submit</div>
      </div>
    </div>
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
      if (!this.username || !this.password){
        this.$message(
          {
            message: '用户名/密码不可为空',
            type: 'warning'
          }
        );
        return ;
      }

      login(this.username,this.password)
      .then(
        res => {
          // 输出res
          console.log("result",res)

          sessionStorage.setItem("user",JSON.stringify(res));
          console.log("session",sessionStorage.getItem("user"))


          if (res === null || res === ""){
            this.$message.error("登录失败，请检查用户名和密码")
          }else {
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

    registerSubmit: function (){
      if (!this.username || !this.password || !this.password2) {
        this.$message({
          message: "用户名或密码不能为空",
          type: "warning"
        });
        return;
      }

      register(this.username,this.password,this.password2)
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
.profile-header{
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

.tools{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.a-tool{
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 50px;
  border: 2px dashed #f1c6c6;
  border-radius: 10px;

  margin: 10px;
}

.a-tool:hover{
  background: #f3cbd3;
  cursor: pointer;
}

.input-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.a-input{
  margin: 10px;

  border: 2px dashed #e3d2d2;
  border-radius: 5px;
}

input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
  text-align: center;
  color: #cbc9c9;
}

input:-moz-placeholder,textarea:-moz-placeholder{
  text-align: center;
  color: #cbc9c9;
}

input::-moz-placeholder,textarea::-moz-placeholder{
  text-align: center;
  color: #cbc9c9;
}


input:-ms-input-placeholder,textarea:-ms-input-placeholder{
  text-align: center;
  color: #cbc9c9;
}

.fake-button-submit{
  border: 2px solid #efbaba;
  border-radius: 5px;
  text-align: center;
  width: 100px;
}

.fake-button-submit:hover{
  border: 2px solid #ec8b8b;
  background: #f3d3d9;
  cursor: pointer;
}
</style>
