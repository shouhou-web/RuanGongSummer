<template>
  <div class="wrapper">
    <div class="title">
      {{ title }}
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <my-button @click="submit" size="small">
        {{assureBtn}}
      </my-button>
      <my-button @click="cancel" type="info" size="small">
        {{cancelBtn}}
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProfileHover",
  props: {
    title: String, // 标题
    content: String, // 按钮
    assureBtn:String, // 确定按钮文字
    cancelBtn:String, // 取消按钮文字
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
.wrapper {
  background-color: #fff;
  padding: 0 30px;
}

.title {
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0;
}

.main {
  display: flex;
  flex-direction: column;
}

.footer {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 20px;
}
</style>
