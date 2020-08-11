<template>
  <div class="wrapper">
    <div class="icon">
      <img :src="iconSrc" alt="" />
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div v-if="content" class="content">
      {{ content }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    icon: String,
    title: String,
    content: String
  },
  computed: {
    iconSrc() {
      return require("@/assets/icon/profile/" + this.icon + ".png");
    }
  }
};
</script>

<style scoped>
.wrapper {
  align-items: center;
  display: flex;
  font-size: 14px;
  height: 74px;
  line-height: 14px;
  padding: 20px 40px;
}

.icon {
  width: 20px;
  height: 20px;
  text-align: center;
}

.icon img {
  width: 100%;
  height: 100%;
}

.title {
  color: #333;
  margin-left: 20px;
  width: 96px;
}

.content {
  width: 256px;
}

.slot {
  flex: 1;
  justify-items: flex-end;
}
</style>
