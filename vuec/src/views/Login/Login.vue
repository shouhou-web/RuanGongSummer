<template>
  <div>
    <m-app-header></m-app-header>
    <div class="login">
      <input
        class="checkbox"
        id="reg-log"
        name="reg-log"
        type="checkbox"
      />
      <label for="reg-log"></label>
      <div class="card-wrap">
        <div class="card-wrapper">
          <div v-if="this.$route.query.page == 1">
            <!--Login-->
            <div class="card-back">
              <div class="center-wrap">
                <div>
                  <div class="login-header">
                    <h2>登录</h2>
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
                  <div class="forget">
                    <a class="forget-text" href="#">
                      <div>
                        <img src="../../assets/image/forget.svg" style="height: 15px;">
                      </div>
                      ··· 忘记密码？
                    </a>
                  </div>
                  <a @click="loginSubmit" class="btn">Log in</a>
                </div>
                <div class="otherway-login">
                  <div style="text-align: center">
                    第三方登录
                  </div>
                  <div class="otherway-icons">
                    <a href="#" style="margin-left: 25%" title="微信登录">
                      <img src="../../assets/image/wechat.svg">
                    </a>
                    <a href="#" style="margin-left: 10%" title="QQ登录">
                      <img src="../../assets/image/qq.svg">
                    </a>
                    <a href="#" style="margin-left: 10%" title="github登录">
                      <img src="../../assets/image/github.svg" style="width: 25px">
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!--register-->
            <div class="card-front">
              <div class="center-wrap">
                <div>
                  <div class="login-header">
                    <h2>注册</h2>
                  </div>
                  <div class="login-main">
                    <div class="form-group">
                      <input autocomplete="off"
                             class="form-style"
                             id="logname"
                             name="logname"
                             placeholder="Username"
                             type="text"
                             v-model="username">
                    </div>
                    <div class="form-group">
                      <input autocomplete="off"
                             class="form-style"
                             id="logpass"
                             name="logpass"
                             placeholder="Password"
                             type="password"
                             v-model="password">
                    </div>
                    <div class="form-group">
                      <input autocomplete="off"
                             class="form-style"
                             id="logpassagain"
                             name="logpassagain"
                             placeholder="Password Confirm"
                             type="password"
                             v-model="password_again">
                    </div>
                    <div class="form-group">
                      <input @focus="email_info = 0"
                             autocomplete="off"
                             id="logemail"
                             name="logeamil"
                             placeholder="Your email"
                             type="email"
                             v-bind:class="{ 'form-style' : (email_info == 0), 'error-style' : (email_info == 2) }"
                             v-model="email">
                    </div>
                    <div style="display: flex;flex-direction: row">
                      <input @focus="code_info = 0"
                             id="logcode"
                             name="logcode"
                             placeholder="邮箱验证码"
                             type="text"
                             v-bind:class="{ 'code-style' : (code_info == 0), 'error-code-style' : (code_info == 2), 'empty-code-style' : (code_info == 3) }"
                             v-model="code">
                      <div @click="sendCode" class="send-code">发送验证码</div>
                    </div>
                  </div>
                  <a @click="registerSubmit" class="btn">Sign up</a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <!--Login-->
            <div class="card-front">
              <div class="center-wrap">
                <div>
                  <div class="login-header">
                    <h2>登录</h2>
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
                  <div class="forget">
                    <router-link class="forget-text" to="/forgetPwd">
                      <div>
                        <img src="../../assets/image/forget.svg" style="height: 15px;">
                      </div>
                      ··· 忘记密码？
                    </router-link>
                  </div>
                  <a @click="loginSubmit" class="btn">Log in</a>
                </div>
                <div class="otherway-login">
                  <div style="text-align: center">
                    第三方登录
                  </div>
                  <div class="otherway-icons">
                    <a href="#" style="margin-left: 25%" title="微信登录">
                      <img src="../../assets/image/wechat.svg">
                    </a>
                    <a href="#" style="margin-left: 10%" title="QQ登录">
                      <img src="../../assets/image/qq.svg">
                    </a>
                    <a href="#" style="margin-left: 10%" title="github登录">
                      <img src="../../assets/image/github.svg" style="width: 25px">
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!--register-->
            <div class="card-back">
              <div class="center-wrap">
                <div>
                  <div class="login-header">
                    <h2>注册</h2>
                  </div>
                  <div class="login-main">
                    <div class="form-group">
                      <input autocomplete="off"
                             class="form-style"
                             id="logname"
                             name="logname"
                             placeholder="Username"
                             type="text"
                             v-model="username">
                    </div>
                    <div class="form-group">
                      <input autocomplete="off"
                             class="form-style"
                             id="logpass"
                             name="logpass"
                             placeholder="Password"
                             type="password"
                             v-model="password">
                    </div>
                    <div class="form-group">
                      <input autocomplete="off"
                             class="form-style"
                             id="logpassagain"
                             name="logpassagain"
                             placeholder="Password Confirm"
                             type="password"
                             v-model="password_again">
                    </div>
                    <div class="form-group">
                      <input @focus="email_info = 0"
                             autocomplete="off"
                             id="logemail"
                             name="logeamil"
                             placeholder="Your email"
                             type="email"
                             v-bind:class="{ 'form-style' : (email_info == 0), 'error-style' : (email_info == 2) }"
                             v-model="email">
                    </div>
                    <div style="display: flex;flex-direction: row">
                      <input @focus="code_info = 0"
                             id="logcode"
                             name="logcode"
                             placeholder="邮箱验证码"
                             type="text"
                             v-bind:class="{ 'code-style' : (code_info == 0), 'error-code-style' : (code_info == 2), 'empty-code-style' : (code_info == 3) }"
                             v-model="code">
                      <input @click="sendCode" class="send-code" :disabled="countFlag" :value="btnMsg"/>
                    </div>
                  </div>
                  <a @click="registerSubmit" class="btn">Sign up</a>
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
import MAppHeader from "components/content/m-app-header/MAppHeader";
import {emailVerification, login, register} from "../../network/user.js";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      password_again: '',
      email: '',
      code: '',
      code_confirm: '012345',
      email_info: 0,//存放email的状态 0正常/1已存在/2未填写
      code_info: 0,//存放code的状态 0正常/1通过/2错误/3未填写
      countNum: 50,
      countFlag: false,
      timer: null,
      btnMsg: '发送验证码'
    }
  },
  components:{
    MAppHeader
  },
  methods: {
    registerSubmit() {
      if (!this.username || !this.password || !this.password_again || !this.email) {
        this.$message.warning('用户名 · 密码 · 邮箱不能为空')
        if (!this.email) this.email_info = 2;
        return;
      } else if (!this.code) {
        this.code_info = 3;
        this.$message.warning('请填写验证码');
        return;
      } else if (!(this.code == this.code_confirm)) {
        this.code_info = 2;
        this.$message.error('验证码错误');
        return;
      }

      console.log('this is ok');

      register(this.username, this.password, this.password_again, this.email)
        .then(res => {
          console.log(res);
          if (res === 1) {
            this.$message.error("邮箱不合法");
            return;
          } else if (res === 2) {
            this.$message.error("密码不一致");
            return;
          } else if (res == 3) {
            this.$message.error("密码应至少由两种形式的字符组成，长度在6-18位之间");
            return;
          } else if (res == 4) {
            this.$message.error("邮箱已注册");
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

              this.$router.push({path: '/home'});
            }
          })
        .catch(err => {
          this.$message.error("请检查网络");
          return;
        });
    },
    sendCode() {
      if (!this.email) {
        this.email_info = 2;
        this.$message.error('请填写邮箱以获取验证码');
        return;
      }

      emailVerification(this.email)
      .then(res => {
        console.log(this.email)
        console.log('验证码：',res);

        if (res === 0){
          this.$message.error('验证码返回错误，请检查网络');
        } else {
          this.code_confirm = res;

          // 处理倒计时问题
          this.countFlag = !this.countFlag;
          this.timer = setInterval(
            () => {
              if (this.countNum > 0 && this.countNum <= 50) {
                this.btnMsg = this.countNum + 's';
                this.countNum --;
              } else {
                this.countFlag = false;
                clearInterval(this.timer);
                this.timer = null;
                this.btnMsg = '发送验证码';
                this.countNum = 50;
              }
            }, 1000
          )

        }
      })
      .catch(err => {
        this.$message.error('验证码返回错误，请检查网络');
        return;
      })

    },
    countDown() {},
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

.login {
  margin-top: 30px
}

.login-header {
  color: #4a4a4c;
  margin-top: 0;
}

.login-main {
  margin-top: 30px;
}

.forget {
  margin-left: 35%;
  margin-top: 55px;
}

.forget-text {
  display: flex;
  flex-direction: row;
  font-family: "JetBrains Mono";
  font-size: 13px;
}

.forget-text:hover {
  color: #a1c4fd;
}

.otherway-login {
  border: 2px dashed #a1c4fd;
  border-radius: 10px;
  color: #4a4a4c;
  font-family: "JetBrains Mono";
  height: 20%;
  margin-top: 40px;
  padding: 10px;
}

.otherway-icons {
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
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
  align-content: center;
  background-color: #a1c4fd;
  border: 2px solid #4b97b8;
  border-radius: 50%;
  color: #f8f7f5;
  content: ''; /*这里显示有问题*/
  display: block;
  font-family: 'unicons';
  font-size: 24px;
  height: 26px;
  left: -10px;
  line-height: 36px;
  position: absolute;
  text-align: center;
  top: -5px;
  transition: all 0.5s ease;
  width: 26px;
  z-index: 20;
}

.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}

.card-wrap {
  color: #a1c4fd;
  height: 400px;
  margin: auto;
  margin-top: 20px;
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
  height: 600px;
  left: 0;
  opacity: 0.85;
  position: absolute;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  width: 100%;
}

.card-back {
  transform: rotateY(180deg);
}

.checkbox:checked ~ .card-wrap .card-wrapper {
  transform: rotateY(180deg);
}

.center-wrap {
  display: block;
  height: 80%;
  left: 0;
  padding: 0 35px;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  width: 100%;
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

.error-style {
  background-color: #f6a3a3;
  border: 2px solid #fc7f7f;
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

.code-style {
  background-color: #ffffff;
  border: 2px solid #a1c4fd;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #646161;
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
  width: 50%;
}

.error-code-style {
  background-color: #f5b9b9;
  border: 2px solid #f17785;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #646161;
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
  width: 50%;
}

.empty-code-style {
  background-color: #f8c37f;
  border: 2px solid #f89c5e;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #646161;
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
  width: 50%;
}

.send-code {
  background-color: #e5e2e2;
  border: none;
  border: 2px solid #a1c4fd;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #514c4c;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  height: 48px;
  letter-spacing: 3px;
  line-height: 45px;
  margin-left: 20%;
  margin-top: 20px;
  outline: none;
  padding-left: 10px;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  width: 30%;
}

.form-style:focus,
.form-style:active {
  border: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  outline: none;
}

.code-style:focus::-webkit-input-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
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
