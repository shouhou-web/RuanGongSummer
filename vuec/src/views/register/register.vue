<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row full-height justify-content-center">
          <div class="col-12 text-center align-self-center py-5">
            <div class="section pb-5 pt-5 pt-sm-2 text-center">
              <div class="choose-tab">
                <h4>
                  <span>Log_In</span>
                  <span class="tab-span">Sign_Up</span>
                </h4>
              </div>
              <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
              <label for="reg-log"></label>
              <div class="card-3d-wrap mx-auto">
                <div class="card-3d-wrapper">
                  <div class="card-front">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h2 class="mb-4 pb-3">Log In·登录</h2>
                        <div class="form-group">
                          <input type="text" name="logemail" class="form-style" placeholder="Username" id="logemail" autocomplete="off" v-model="username">
                        </div>
                        <div class="form-group mt-2">
                          <input type="password" name="logpass" class="form-style" placeholder="Password" id="logpass" autocomplete="off" v-model="password">
                        </div>
                        <a class="btn mt-4" @click="loginSubmit">Log in</a>
                        <div>
                          <p class="mb-0 mt-4 text-center">
                            <a href="#" class="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-back">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h2 class="mb-4 pb-3">Sign Up·注册</h2>
                        <div class="form-group">
                          <input type="text" name="logname" class="form-style" placeholder="Username" id="logname" autocomplete="off" v-model="username">
                        </div>
                        <div class="form-group mt-2">
                          <input type="passsword" name="logemail" class="form-style" placeholder="Password" id="logemail" autocomplete="off" v-model="password">
                        </div>
                        <div class="form-group mt-2">
                          <input type="password" name="logpass" class="form-style" placeholder="Password Confirm" id="logpass" autocomplete="off" v-model="password_again">
                        </div>
                        <a href="#" class="btn mt-4" @click="registerSubmit">Sign up</a>
                      </div>
                    </div>
                  </div>
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
import { login, register } from "../../network/user.js";
export default {
  name: "Register",
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
            if (res == null || res == "")
            {
              this.$message.error("用户名与密码不匹配");
              return;
            }
            else
            {
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
  computed: {

  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

body{
  font-family: "JetBrains Mono", SimHei;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  color: #626262;
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
  color: #d08881;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
}
h6 span{
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.full-height{
  min-height: 100vh;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #cfccc7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #f8f7f5;
  background-color: #8c8a8a;
  font-family: 'unicons';
  content: '···';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}


.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
  margin-left: 36%;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  background-color: #cdcdd0;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}


.form-group{
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #6d6d70;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
  margin-top: 20px;
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #6e6e69;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.btn{
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #949490;
  color: #eaeaea;
  box-shadow: 0 8px 24px 0 rgba(245, 241, 228, 0.2);
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 30%;
}
.btn:active,
.btn:focus{
  background-color: #222121;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{
  background-color: #403f3f;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}

.choose-tab{
  font-family: "JetBrains Mono", KaiTi;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 45%;
}

.tab-span{
  margin-left: 20px;
}

.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}
.logo img {
  height: 26px;
  width: auto;
  display: block;
}
</style>
