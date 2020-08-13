<template>
  <div
    class="l-card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow'"
  >
    <div class="l-card__top">
      <img src="@/assets/icon/card/square.png" class="l-card__select"></img>
      <m-nav-dropdown
        position="middle"
        :triColor="tricolor"
        class="l-card__nav"
      >
        <div slot="show">
          <img class="l-card__setting" src="@/assets/icon/card/settings.png" />
        </div>
        <div slot="hide">
          <div class="l-card__hide-main">
            <my-button type="text" class="l-card__nav-btn">button1</my-button>
            <my-button type="text" class="l-card__nav-btn">button2</my-button>
            <my-button type="text" class="l-card__nav-btn">button3</my-button>
            <my-button type="text" class="l-card__nav-btn">button4</my-button>
          </div>
        </div>
      </m-nav-dropdown>
    </div>
    <img
      class="l-card__pic"
      alt="Picture Please!"
      src="https://assets.smcdn.cn/static/lizard-service-desktop/assets/doc_160_flat@2x.098efd4b.png"
    />
    <div class="l-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "l-card",
  data() {
    return {
      tricolor: "#DCDFE6"
    };
  },
  props: {
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
};
</script>

<style scoped>
.l-card {
  align-items: center;
  border-radius: 4px;
  background-color: #rgba(255, 255, 255, 0.8);
  color: #909399;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.4s;
}

.l-card:hover {
  background-color: #e8eef8;
  box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
  color: #606266;
  transition: 0.4s;
}

.l-card:hover .l-card__top {
  opacity: 1;
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

.l-card__select {
  margin-right: 2px;
  margin-top: 1px;
  height: 18px;
  width: 18px;
}

.l-card__pic {
  width: 80px;
  height: 80px;
}

.l-card__body {
  margin: 10px 20px;
}

.l-card__hide-main {
  align-items: center;
  background-color: #fafbfc;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 110px;
}

.l-card__nav-btn {
  color: #3f536e;
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.l-card__nav-btn:hover {
  color: #3f536e;
}

.l-card__top {
  align-items: center;
  justify-content: space-between;
  display: flex;
  opacity: 0;
  width: 100%;
}
</style>
