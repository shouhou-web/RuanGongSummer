<template>
  <div
    class="l-lcard"
    :class="[
      shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow',
      isSelected ? 'is-checked' : ''
    ]"
  >
    <div class="l-lcard__left" :class="isSelected ? 'still' : ''">
      <img :src="selectPath" class="l-lcard__select" @click="check" />
    </div>
    <img
      class="l-lcard__pic"
      alt="Picture Please!"
      @click="toEditor"
      src="https://assets.smcdn.cn/static/lizard-service-desktop/assets/doc_160_flat@2x.098efd4b.png"
    />
    <div class="l-lcard__body" :style="bodyStyle">
      {{ title }}
    </div>
    <div class="l-lcard__time" :style="bodyStyle">
      {{ time }}
    </div>
    <div class="l-lcard__creator" :style="bodyStyle">
      {{ creatorID }}
    </div>
    <div class="l-lcard__right" :class="isSelected ? 'still' : ''">
      <m-nav-dropdown
        position="middle"
        :triColor="tricolor"
        class="l-lcard__nav"
      >
        <div slot="show">
          <img class="l-lcard__setting" src="@/assets/icon/card/settings.png" />
        </div>
        <div slot="hide">
          <div class="l-lcard__hide-content">
            <slot name="hide-content"></slot>
          </div>
        </div>
      </m-nav-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "l-lcard",
  data() {
    return {
      tricolor: "#DCDFE6",
      selectPath: require("@/assets/icon/card/square.png"),
      isSelected: false
    };
  },
  methods: {
    check() {
      if (this.canCheck) {
        if (!this.isSelected) {
          this.selectPath = require("@/assets/icon/card/square-check.png");
          this.$emit("addDoc", this.ID);
        } else {
          this.selectPath = require("@/assets/icon/card/square.png");
          this.$emit("cancelDoc", this.ID);
        }
        this.isSelected = !this.isSelected;
      } else {
        return;
      }
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
  watch: {
    forceUnchecked: {
      handler: function(val, oldval) {
        console.log("yes");
        if (val == false && this.isSelected) {
          this.check();
        }
      }
    }
  },
  props: {
    bodyStyle: {},
    shadow: "",
    canCheck: {
      type: Boolean,
      default: true
    },
    title: "",
    time: "",
    creatorID: "",
    ID: "",
    forceUnchecked: false
  }
};
</script>

<style scoped>
.l-lcard {
  align-items: center;
  border-radius: 4px;
  color: #909399;
  display: flex;
  overflow: hidden;
  transition: 0.4s;
  width: 100%;
}

.l-lcard.is-checked {
  background-color: #e8eef8;
  box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
  color: #606266;
  transition: 0.4s;
}

.l-lcard:hover {
  background-color: #e8eef8;
  box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
  color: #606266;
  transition: 0.4s;
}

.l-lcard:hover .l-lcard__left {
  opacity: 1;
  transition: 0.4s;
}

.l-lcard:hover .l-lcard__right {
  opacity: 1;
  transition: 0.4s;
}

.l-lcard__left {
  opacity: 0;
  transition: 0.4s;
}

.l-lcard.is-always-shadow,
.l-lcard.is-hover-shadow:focus {
}

.l-lcard__nav {
  margin-right: 2px;
  margin-top: 2px;
}

.l-lcard__setting {
  height: 18px;
  width: 18px;
}

.l-lcard__select {
  margin-right: 2px;
  margin-top: 1px;
  height: 18px;
  width: 18px;
}

.l-lcard__pic {
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  width: 40px;
}

.l-lcard__body {
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
  width: 60%;
}

.l-lcard__time {
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  white-space: nowrap;
  width: 20%;
}

.l-lcard__creator {
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  white-space: nowrap;
  width: 15%;
}

.l-lcard__hide-content {
  background-color: #fafbfc;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 5px 8px;
}

.l-lcard__nav-btn {
  color: #3f536e;
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.l-lcard__nav-btn:hover {
  color: #3f536e;
}

.l-lcard__left.still {
  opacity: 1;
  transition: 0.4s;
}

.l-lcard__right {
  flex: 1;
  right: 0px;
  opacity: 0;
  text-align: center;
  transition: 0.4s;
}

.l-lcard__right.still {
  opacity: 1;
  transition: 0.4s;
}
</style>
