<template>
  <div id="index">
    <m-index-header></m-index-header>
    <div class="bg">
      <img class="bg__img" src="@/assets/icon/index/logo.png" alt="" />
    </div>
    <div class="content">
      <div class="logo">
        <div class="name1">带得栏</div>
        <div class="name2">文档</div>
      </div>
      <div class="line1">
        <div
          class="line1__inner"
          v-for="(item, index) in '你的团队DDL平台'"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="line2">
        <div
          class="line1__inner"
          v-for="(item, index) in '肝DDL就上带得栏'"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="button">
        <div @click="toLogin" class="button__inner">
          立即体验
        </div>
      </div>
    </div>
    <div class="option">
      <div class="option-item">
        团队协作
      </div>
      <div class="option-div"></div>
      <div class="option-item">
        文档共享
      </div>
      <div class="option-div"></div>
      <div class="option-item">
        贴心交互
      </div>
    </div>
  </div>
</template>

<script>
import MIndexHeader from "components/content/m-index-header/m-index-header";
export default {
  name: "App",
  components: {
    MIndexHeader,
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: "/Login",
        query: {
          page: 1,
        },
      });
    },
  },
};
</script>

<style scoped>
#index {
  background-image: linear-gradient(to bottom, #f5faff, #cce6ff);
  height: 100vh;
  overflow: hidden;
}

.bg {
  height: 65vw;
  left: 120px;
  position: absolute;
  top: 20vh;
  width: 65vw;
  z-index: 0;
}

.bg__img {
  width: 100%;
  height: 100%;
}

.content {
  color: var(--color-main);
  left: 47vw;
  position: absolute;
  top: 30vh;
}

.logo {
  display: flex;
  align-items: flex-end;
}

.name1 {
  font-size: 140px;
  font-style: italic;
  font-weight: 550;
  letter-spacing: 5px;
}

.name2 {
  font-size: 110px;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 5px;
}

.line1,
.line2 {
  color: #8faadc;
  display: flex;
  font-size: 35px;
  font-weight: 530;
  justify-content: space-between;
  text-align: center;
  margin-top: 20px;
}

.line1 {
  margin-top: 30px;
}

.line2 {
  margin-top: 20px;
}

.button {
  color: #fff;
  display: flex;
  font-size: 28px;
  font-weight: 530;
  justify-content: center;
  margin-top: 30px;
}

.button__inner {
  background-color: #8faadc;
  cursor: pointer;
  text-align: center;
  letter-spacing: 5px;
  padding: 9px 9px 9px 14px;
}

.option {
  align-items: center;
  display: flex;
  margin: 770px auto 0;
  width: fit-content;
  position: relative;
  z-index: 10;
}

.option-item {
  color: #8faadc;
  font-size: 32px;
  font-weight: 530;
  letter-spacing: 20px;
  text-align: center;
}

.option-div {
  background-color: #8faadc;
  height: 20px;
  margin: 0 25px 0 5px;
  width: 3px;
}
</style>
