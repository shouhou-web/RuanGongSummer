<template>
  <div>
    <m-app-header></m-app-header>
    <div class="login">
      <div class="card-wrap">
        <div class="card-wrapper">
          <div class="card-front">
            <div class="center-wrap">
              <div>
                <div class="login-header">
                  <h2>{{headerText}}</h2>
                </div>
                <div class="login-main">
                  <div class="form-group">
                    <input autocomplete="off"
                           name="logemail"
                           placeholder="email"
                           type="email"
                           v-model="email"
                           v-bind:class="{ 'form-style' : (email_info == 0), 'error-style' : (email_info == 2) }"
                           @focus="email_info = 0">
                  </div>
                  <div v-show="isShow" style="display: flex;flex-direction: row">
                    <input @focus="code_info = 0"
                           id="logcode"
                           name="logcode"
                           placeholder="邮箱验证码"
                           type="text"
                           v-bind:class="{ 'code-style' : (code_info == 0), 'success-code-style' : (code_info == 1), 'error-code-style' : (code_info == 2), 'empty-code-style' : (code_info == 3) }"
                           v-model="code">
<!--                    <input v-show="isShow" @click="sendCode" :disabled="countFlag" class="send-code" :value="btnMsg" />-->
                  </div>
                  <my-button type="disabled" v-if="!email" @click="warnEmail">发送验证码</my-button>
                  <my-button type="timer"
                             :count="countNum"
                             style="margin-top: 15px"
                             @click="sendCode"
                             v-if="email">{{btnMsg}}</my-button>
                  <a v-show="isShow" @click="confirmCode" class="btn">confirm</a>
                </div>
                <div v-show="!isShow">
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
                  <a @click="resetPassword" class="btn">reset</a>
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
import {login, register, resetPwd, emailVerification} from "@/network/user";
import MAppHeader from "components/content/m-app-header/MAppHeader";

export default {
  name: 'ForgetPassword',
  components:{
    MAppHeader
  },
  data() {
    return {
      headerText: '忘记密码',
      email: '',
      code: '',
      code_confirm: '',
      password: '',
      password_again: '',
      email_info: 0,//存放email的状态 0正常/1已存在/2未填写
      code_info: 0,//存放code的状态 0正常/1通过/2错误/3未填写
      isShow: true,
      countNum: 50,
      countFlag: false,
      timer: null,
      btnMsg: '发送验证码'
    }
  },
  methods: {
    sendCode() {
      if (!this.email) {
        this.email_info = 2;
        this.$message.error('请填写邮箱以获取验证码');
        return;
      }

      emailVerification(this.email)
      .then(res => {
        console.log('验证码：',res);
        this.btnMsg = '';
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
    confirmCode() {
      if (!this.code){
        this.code_info = 3;
        this.$message.warning('请填写验证码');
      } else if (this.code != this.code_confirm){
        this.code_info = 2;
        this.$message.error('验证码错误');
      } else{
        this.code_info = 1;
        this.$message.success('验证成功，请重置密码');
        this.isShow = false;
        this.headerText = '重置密码'
      }
    },
    resetPassword() {
      if (!this.email || !this.code || !this.password || !this.password_again) {
        this.$message.warning('请填写相关项');
        return;
      }

      resetPwd(this.email,this.password,this.password_again)
      .then(res => {
        console.log('重置密码:',res);
        if (res == 1){
          this.$notify.warning('请确保邮箱格式正确');
          return;
        }else if (res == 2){
          this.$notify.warning('两次密码不一致');
          return;
        }else if (res == 3){
          this.$notify.warning('密码格式不合法');
          return;
        }else if (res == 4){
          this.$notify.error('邮箱暂未注册');
          return;
        }else {
          this.$notify.success('密码修改成功');
          this.$router.push({path: "/login?page=0"})
        }
      })
    },
    warnEmail() {
      this.$notify.info('请填写邮箱后获取验证码');
    }
  },
  props: {},
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

p {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
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
  margin-top: 80px;
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
  height: 450px;
  left: 0;
  opacity: 0.85;
  position: absolute;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  width: 100%;
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
  width: 100%;
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
  width: 100%;
}

.empty-code-style {
  background-color: #faddb8;
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
  width: 100%;
}

.success-code-style {
  background-color: #d8fada;
  border: 2px solid #4eae1b;
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
  width: 100%;
}

.send-code {
  background-color: #e5e2e2;
  border: none;
  border: 2px solid #a1c4fd;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #514c4c;
  cursor: pointer;
  font-size: 14px;
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

.send-code:hover {
  background-color: #749ee7;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
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
  margin-left: 33%;
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
</style>
