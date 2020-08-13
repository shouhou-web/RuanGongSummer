<template>
  <div
    class="l-card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow'"
  >
    <div class="l-card__top">
      <img :src="selectPath" class="l-card__select" @click="check"></img>
      <m-nav-dropdown
        position="middle"
        :triColor="tricolor"
        class="l-card__nav"
      >
        <div slot="show">
          <img class="l-card__setting" src="@/assets/icon/card/settings.png" />
        </div>
        <div slot="hide">
          <div class="l-card__hide-content">
            <slot name="hide-content"></slot>
          </div>
        </div>
      </m-nav-dropdown>
    </div>
    <img
      class="l-card__pic"
      alt="Picture Please!"
      @click="toEditor"
      src="https://assets.smcdn.cn/static/lizard-service-desktop/assets/doc_160_flat@2x.098efd4b.png"
    />
    <div class="l-card__body" :style="bodyStyle">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "l-card",
  data() {
    return {
      tricolor: "#DCDFE6",
      selectPath: require("@/assets/icon/card/square.png"),
      isSelected: false
    };
  },
  methods: {
    check() {
      if(!this.isSelected)
        this.selectPath = require("@/assets/icon/card/square-check.png")
      else
        this.selectPath = require("@/assets/icon/card/square.png")
      this.isSelected = !this.isSelected
    },
    toEditor() {
      this.$router.push({
        path: "/doc",
        query: {
          docID: this.ID,
          docTitle: this.title
        }
      });
    }
  },
  props: {
    bodyStyle: {},
    shadow: {
      type: String
    },
    title: "",
    ID: ""
  },
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
  width: 120px;
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
  padding: 5px 20px;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
}

.l-card__hide-content {
  background-color: #fafbfc;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 130px;
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
