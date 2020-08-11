<template>
  <div>
    <m-header bgColor="#fff">
      <template v-slot:left>
        <div class="back">
          <my-button size="small">快速跳转</my-button>
        </div>
        <div class="back--show">
          <div class="back-item">
            <div class="back-header">
              返回到
            </div>
            <a class="back-a" v-for="(item, index) in back" :key="index">
              <img class="back-a__icon" :src="item.iconSrc" alt="" />
              <div class="back-a__title">{{ item.title }}</div>
            </a>
          </div>
          <!-- 最近访问的文档。 -->
          <div class="back-item">
            <div class="back-header">
              返回到
            </div>
            <a class="back-a" v-for="(item, index) in recentDoc" :key="index">
              <img class="back-a__icon" src="@/assets/icon/doc/file.png" alt="" />
              <div class="back-a__title">{{ item.docTitle }}</div>
            </a>
          </div>
        </div>
      </template>
      <template v-slot:right> </template>
    </m-header>
  </div>
</template>

<script>
import MHeader from "./MHeader.vue";
export default {
  name: "MDocHeader",
  components: {
    MHeader
  },
  data() {
    return {
      back: [
        {
          title: "工作台",
          iconSrc: require("@/assets/icon/doc/workspace.png")
        },
        {
          title: "团队空间",
          iconSrc: require("@/assets/icon/doc/teamspace.png")
        },
        {
          title: "我的桌面",
          iconSrc: require("@/assets/icon/doc/desktop.png")
        }
      ],
      recentDoc: [
        {
          docID: 1,
          docTitle: "这里放近期的文档"
        },
        {
          docID: 1,
          docTitle: "欧拉欧拉欧拉欧拉欧拉欧拉欧拉"
        },
        {
          docID: 2,
          docTitle: "木大木大木大木大木大木大木大"
        }
      ]
    };
  },
  props: {}
};
</script>
<style scoped>
.back--show {
  background-color: #fff;
  position: absolute;
  padding: 20px 0;
  width: 220px;
}

.back-header {
  color: #a5a5a5;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 8px;
  padding: 0 25px;
}

.back-a {
  align-items: center;
  color: #666;
  cursor: pointer;
  display: flex;
  height: 32px;
  line-height: 32px;
  padding: 0 25px;
}

.back-a:hover {
  background-color: #f4f4f4;
}

.back-a__icon {
  width: 20px;
  height: 20px;
}

.back-a__title {
  margin-left: 10px;
}
</style>
