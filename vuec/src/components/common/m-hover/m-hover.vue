<template>
  <div id="suspended">
    <!-- 阴影 -->
    <div :class="[onShow ? '' : 'hide']" @click="cancel" class="mask"></div>
    <div :class="[onShow ? 'show' : 'hide']" :style="{ left: left }">
      <div class="wrapper">
        <div v-if="title" class="title">
          {{ title }}
        </div>
        <div class="main">
          <slot></slot>
        </div>
        <div class="footer">
          <my-button v-if="assureBtn" @click="submit" size="small">
            {{ assureBtn }}
          </my-button>
          <my-button v-if="cancelBtn" @click="cancel" type="info" size="small">
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
      default: false,
    },
    width: {
      // 如果自己不能居中，需要传入宽度
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: null,
    }, // 标题
    assureBtn: {
      type: String,
      default: null,
    }, // 确定按钮文字
    cancelBtn: {
      type: String,
      default: null,
    }, // 取消按钮文字
  },
  computed: {
    left() {
      if (this.width != 0) return "calc(50% - " + this.width / 2 + "px)";
      else return "auto";
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.title);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
#suspended {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#suspended .show {
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 350px;
  opacity: 1;
  position: fixed;
  top: 20%;
  z-index: 1629;
}

#suspended .mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
  z-index: 1628;
}

#suspended .hide {
  position: fixed;
  opacity: 0;
  z-index: -1629;
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
  padding: 20px;
}

#suspended .footer {
  display: flex;
  justify-content: space-around;
  margin: 20px 30px;
}
</style>
