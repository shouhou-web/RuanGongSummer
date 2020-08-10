<template>
  <div>
    <div>
      <input
        class="checkbox"
        id="reg-log"
        name="reg-log"
        type="checkbox"
      />
      <label for="reg-log"></label>
      <div class="card-wrap">
        <div class="card-wrapper">
          <div v-if="choice == 0">
            <!--login-->
            <div class="card-front">
              <div class="center-wrap">
                <div>
                  <div class="login-header">
                    <h2>Log In·登录</h2>
                  </div>
                  <div class="login-main">
                    <div class="form-group">
                      <input autocomplete="off" class="form-style" name="logemail" placeholder="Username"
                             type="text" v-model="username">
                    </div>
                    <div class="form-group mt-2">
                      <input autocomplete="off" class="form-style" name="logpass" placeholder="Password"
                             type="password" v-model="password">
                    </div>
                  </div>
                  <a @click="loginSubmit" class="btn">Log in</a>
                  <div>
                    <p>
                      <a class="link" style="margin-left: 30%" href="#">Forgot your password?</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!--login-->
            <div class="card-back">
              <div class="center-wrap">
                <div>
                  <div class="login-header">
                    <h2>Sign Up·注册</h2>
                  </div>
                  <div class="login-main">
                    <div class="form-group">
                      <input autocomplete="off" class="form-style" id="logname" name="logname"
                             placeholder="Username"
                             type="text" v-model="username">
                    </div>
                    <div class="form-group">
                      <input autocomplete="off" class="form-style" id="logemail" name="logemail"
                             placeholder="Password"
                             type="password" v-model="password">
                    </div>
                  </div>
                  <div class="form-group">
                    <input autocomplete="off" class="form-style" id="logpass" name="logpass"
                           placeholder="Password Confirm" type="password" v-model="password_again">
                  </div>
                  <a @click="registerSubmit" class="btn" href="#">Sign up</a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <!--login-->
            <div class="card-back">
              <div class="center-wrap">
                <div>
                  <h2>Log In·登录</h2>
                  <div class="form-group">
                    <input autocomplete="off" class="form-style" name="logemail" placeholder="Username"
                           type="text" v-model="username">
                  </div>
                  <div class="form-group mt-2">
                    <input autocomplete="off" class="form-style" name="logpass" placeholder="Password"
                           type="password" v-model="password">
                  </div>
                  <a @click="loginSubmit" class="btn">Log in</a>
                  <div>
                    <p>
                      <a class="link" style="margin-left: 30%" href="#">Forgot your password?</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!--login-->
            <div class="card-front">
              <div class="center-wrap">
                <div>
                  <h2>Sign Up·注册</h2>
                  <div class="form-group">
                    <input autocomplete="off" class="form-style" id="logname" name="logname"
                           placeholder="Username"
                           type="text" v-model="username">
                  </div>
                  <div class="form-group">
                    <input autocomplete="off" class="form-style" id="logemail" name="logemail"
                           placeholder="Password"
                           type="password" v-model="password">
                  </div>
                  <div class="form-group">
                    <input autocomplete="off" class="form-style" id="logpass" name="logpass"
                           placeholder="Password Confirm" type="password" v-model="password_again">
                  </div>
                  <a @click="registerSubmit" class="btn" href="#">Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, register} from "../../network/user.js";

export default {
  name: "Register",
  props: ['choice'],
  data() {
    return {
      username: '',
      password: '',
      password_again: ''
    }
  },
  methods: {
    registerSubmit() {
      if (!this.username || !this.password || !this.password_again) {
        this.$message({
          message: "用户名或密码不能为空",
          type: "warning"
        });
        return;
      }
      register(this.username, this.password, this.password_again)
        .then(res => {
          console.log(res);
          if (res === 1) {
            this.$message.error("用户名已存在");
            return;
          } else if (res === 2) {
            this.$message.error("两次密码不等");
            return;
          } else if (res == 3) {
            this.$message.error("密码应至少由两种形式的字符组成，长度在6-18位之间");
            return;
          } else {
            this.$message({
              message: "注册成功,请登录",
              type: "success"
            });
          }
        })
        .catch(err => {
          this.$message.error("注册失败了~请检查网络并再次尝试");
          return;
        });
    },
    loginSubmit() {
      console.log(this.username);
      console.log(this.password);
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
            if (res == null || res == "") {
              this.$message.error("用户名与密码不匹配");
              return;
            } else {
              // 存储数据
              sessionStorage.setItem("user", JSON.stringify(res));

              this.$store.commit("login", res);
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });

              this.username = "";
              this.password = "";
            }
          })
        .catch(err => {
          this.$message.error("请检查网络");
          return;
        });
    },
  },
  computed: {},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

body {
  color: #626262;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}

a {
  cursor: pointer;
  transition: all 200ms linear;
}

a:hover {
  text-decoration: none;
}

.link {
  color: #4a4a4c;
}

.link:hover {
  color: #a1c4fd;
}

p {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
}

.container {
  display: flex;
  flex-direction: row;
  height: inherit;
}

.login-header{
  margin-top: 0;
}

.login-main{
  margin-top: 30px;
}

.login-btn{

}

/*
.container__intro {
  height: inherit;
  margin-bottom: 1%;
  width: 50%;
}

.container__intro__words {
  background: #a1c4fd;
  border: 1px solid #a1c4fd;
  border-radius: 20px;
  height: 80%;
  margin-left: 15%;
  margin-top: 20%;
  opacity: 0.85;
  width: 70%;
}

.container__slice {
  background-color: #a1c4fd;
  border-radius: 5px;
  height: inherit;
  margin-bottom: 1%;
  margin-left: 1%;
  width: 2px;
}
*/

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  left: -9999px;
  position: absolute;
}

.checkbox:checked + label,
.checkbox:not(:checked) + label {
  background-color: #ffffff;
  border: 2px solid #b3b0b0;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  height: 20px;
  margin: 10px auto;
  padding: 0px;
  position: relative;
  text-align: center;
  width: 60px;
}

.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before {
  background-color: #a1c4fd;
  border: 2px solid #4b97b8;
  border-radius: 50%;
  color: #f8f7f5;
  content: '';/*这里显示有问题*/
  display: block;
  font-family: 'unicons';
  font-size: 24px;
  height: 36px;
  left: -10px;
  line-height: 36px;
  position: absolute;
  text-align: center;
  top: -10px;
  transition: all 0.5s ease;
  width: 36px;
  z-index: 20;
  align-content: center;
}

.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}

.card-wrap {
  color: #a1c4fd;
  height: 400px;
  margin-left: 35%;
  margin-top: 50px;
  max-width: 100%;
  perspective: 800px;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  width: 440px;
}

.card-wrapper {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
  width: 100%;
}

.card-front, .card-back {
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: #ffffff;
  /*background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');*/
  background-image: url('../../assets/image/lines.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  border: 2px solid #a1c4fd;
  border-radius: 20px;
  height: 500px;
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  width: 100%;
  opacity: 0.85;
}

.card-back {
  transform: rotateY(180deg);
}

.checkbox:checked ~ .card-wrap .card-wrapper {
  transform: rotateY(180deg);
}

.center-wrap {
  display: block;
  left: 0;
  padding: 0 35px;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  width: 100%;
  height: 80%;
  z-index: 20;
}

.form-group {
  display: block;
  margin: 0;
  padding: 0;
  position: relative;
}

.form-style {
  background-color: #a1c4fd;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  letter-spacing: 0.5px;
  line-height: 22px;
  margin-top: 20px;
  outline: none;
  padding: 13px 20px;
  padding-left: 55px;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  width: 100%;
}

.form-style:focus,
.form-style:active {
  border: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  outline: none;
}

.form-group input:-ms-input-placeholder {
  color: #ffffff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input::-moz-placeholder {
  color: #ffffff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input:-moz-placeholder {
  color: #fcfcfc;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input::-webkit-input-placeholder {
  color: #ffffff;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input:focus:-ms-input-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input:focus::-moz-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input:focus:-moz-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input:focus::-webkit-input-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.btn {
  -moz-align-items: center;
  -ms-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  background-color: #a1c4fd;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #ffffff;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  font-size: 13px;
  font-weight: 600;
  height: 44px;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  letter-spacing: 1px;
  margin-bottom: 30px;
  margin-left: 35%;
  margin-top: 30px;
  padding: 0 30px;
  text-align: center;
  text-transform: uppercase;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.btn:active,
.btn:focus {
  background-color: #404856;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #ffffff;
}

.btn:hover {
  background-color: #404856;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #ffffff;
}

.switch-tab {
  margin-bottom: 20px;
  margin-top: 10px;
}

.switch-tab__span {
  margin-left: 25px;
}

/*动效*/
.container__div--active {
  font-size: 0;
  height: 280px;
  left: 50%;
  perspective: 100px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  width: 280px;
  z-index: -2;
}

.square {
  background: #aaa;
  border: 2px solid gray;
  border-radius: 10px;
  display: inline-block;
  height: 90px;
  margin: 1px;
  transition: all 0.25s;
  width: 90px;
}

.square:nth-child(1) {
  background: #BA68C8;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(2) {
  background: #8E24AA;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(3) {
  background: #4A148C;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(5) {
  background: #4FC3F7;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(6) {
  background: #039BE5;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(7) {
  background: #01579B;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(9) {
  background: #81C784;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(10) {
  background: #43A047;
  filter: blur(2px);
  opacity: 0.7;
}

.square:nth-child(11) {
  background: #33691E;
  filter: blur(2px);
  opacity: 0.7;
}

.words {
  background-color: white;
  border-radius: 10px;
  color: #4a4a4c;
  height: 96%;
  margin-left: 2%;
  margin-top: 2%;
  width: 96%;
}
</style>
