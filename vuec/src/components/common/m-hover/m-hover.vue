<template>
  <div id="suspended">
    <!-- 阴影 -->
    <div :class="[onShow ? '' : 'hide']" @click="cancel" class="mask"></div>
    <div :class="[onShow ? 'show' : 'hide']">
      <div class="wrapper">
        <div class="title">
          {{ title }}
        </div>
        <div class="main">
          <slot></slot>
        </div>
        <div class="footer">
          <my-button @click="submit" size="small">
            {{ assureBtn }}
          </my-button>
          <my-button @click="cancel" type="info" size="small">
            {{ cancelBtn }}
          </my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MHover",
  props: {
    onShow: {
      type: Boolean,
      default: false
    },
    title: String, // 标题
    assureBtn: String, // 确定按钮文字
    cancelBtn: String // 取消按钮文字
  },
  methods: {
    submit() {
      this.$emit("submit", this.title);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
#suspended {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#suspended .show {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 4px;
  top: 20%;
  z-index: 4;
}

#suspended .mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
}

#suspended .hide {
  display: none;
}

#suspended .wrapper {
  background-color: #fff;
}

#suspended .title {
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 20px 30px;
}

#suspended .main {
  display: flex;
  flex-direction: column;
}

#suspended .footer {
  display: flex;
  justify-content: space-around;
  margin: 10px 30px 20px;
}
</style>
