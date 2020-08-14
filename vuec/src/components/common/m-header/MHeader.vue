<template>
  <div>
    <div class="nav" :style="{ 'background-color': bgColor }">
      <div class="wrap">
        <div class="nav-left">
          <slot name="left"></slot>
        </div>
        <div class="nav-right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MHeader",
  props: {
    bgColor: {
      type: String,
      default: "var(--color-main)",
    },
  },
};
</script>
<style scoped>
.nav {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  font-size: 16px;
  padding: 0 auto;
}

.wrap {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  margin: 0 auto;
  padding: 10px 0;
  width: 100%;
}

.nav-left,
.nav-right {
  align-items: center;
  display: flex;
  height: 36px;
}

.nav-left {
  min-width: 345px;
  justify-content: flex-end;
}

.nav-right {
  min-width: 510px;
  justify-content: flex-start;
}
</style>
