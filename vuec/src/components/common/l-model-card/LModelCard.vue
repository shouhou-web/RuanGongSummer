<template>
  <div
    class="l-card"
    :class="[
      shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow',
    ]"
  >
    <span class="l-card__main">
      <img
        class="l-card__pic"
        alt="Picture Please!"
        src="https://assets.smcdn.cn/static/lizard-service-desktop/assets/doc_160_flat@2x.098efd4b.png"
      />
    </span>
    <div class="l-card__body" :style="bodyStyle">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LModelCard",
  props: {
    bodyStyle: {},
    shadow: "",
  }
};
</script>

<style scoped>
.l-card {
  align-items: center;
  border-radius: 4px;
  color: #909399;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.4s;
  width: 120px;
}

.l-card.is-checked {
  background-color: #e8eef8;
  box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
  color: #606266;
  transition: 0.4s;
}

.l-card:hover {
  background-color: #e8eef8;
  box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
  color: #606266;
  transition: 0.4s;
}

.l-card.is-always-shadow,
.l-card.is-hover-shadow:focus {
}

.l-card__nav {
  margin-right: 2px;
  margin-top: 2px;
}

.l-card__setting {
  height: 18px;
  width: 18px;
}

.l-card__main {
  position: relative;
}

.l-card__pic {
  height: 80px;
  margin-top: 20px;
  width: 80px;
}

.l-card__body {
  overflow: hidden;
  padding: 5px 20px;
  white-space: nowrap;
  word-break: break-all;
}
</style>
