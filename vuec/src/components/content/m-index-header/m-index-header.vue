<template>
  <div>
    <m-header bgColor="#a1c4fd">
      <template v-slot:left>
        <div class="welcome">
          <img class="welcome__img" src="@/assets/image/logo.png" alt="" />
        </div>
      </template>
      <template v-slot:right>
        <div class="nav-right-index">
          <div class="item">
            <a @click="toLogin(0)" class="item__inner">登录</a>
          </div>
          <div class="item">
            <a @click="toLogin(1)" class="item__inner">注册</a>
          </div>
        </div>
      </template>
    </m-header>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
export default {
  name: "MIndexHeader",
  components: {
    MHeader,
  },
  props: {},
  methods: {
    toLogin(e) {
      this.$router.push({
        path: "/Login",
        query: {
          page: e,
        },
      });
    },
  },
};
</script>
<style scoped>
.welcome {
  height: 32px;
  width: 160px;
  min-width: 160px;
}

.welcome__img {
  height: 100%;
  width: 100%;
}

.nav-right-index {
  display: flex;
  justify-content: flex-end;
  width: 45%;
}

.item {
  display: flex;
  position: relative;
  margin-left: 25px;
  cursor: pointer;
}

.item__inner {
  color: #fff;
  display: inline-block;
  height: 30px;
}
</style>
