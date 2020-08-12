<template>
  <div>
    <m-header bgColor="#f7f7f7">
      <template v-slot:left>
        <m-nav-dropdown position="left">
          <template v-slot:show>
            <my-button size="small">快速跳转</my-button>
          </template>
          <template v-slot:hide>
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
                最近使用
              </div>
              <a class="back-a" v-for="(item, index) in recentDoc" :key="index">
                <img
                  class="back-a__icon"
                  src="@/assets/icon/doc/file.png"
                  alt=""
                />
                <div class="back-a__title">{{ item.docTitle }}</div>
              </a>
            </div>
          </template>
        </m-nav-dropdown>

        <!-- 标题 -->
        <div class="doc-title">
          <input class="doc-input" v-model="Doc.docTitle" type="text" />
        </div>
      </template>
      <template v-slot:right>
        <div class="team">
          <my-button size="small">协作</my-button>
        </div>
        <div class="share">
          <my-button size="small">分享</my-button>
        </div>
        <div class="other">
          <my-button size="small">其他操作</my-button>
        </div>
      </template>
    </m-header>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
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
      ],
      Doc: {
        docID: 1,
        docTitle: "欧拉欧拉欧拉欧拉欧拉欧拉欧拉"
      }
    };
  },
  props: {}
};
</script>
<style scoped>
.triangle {
  border: 8px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  margin-left: 50px;
  width: 8px;
}

.back-item {
  background-color: #fff;
  padding: 8px 0;
  width: 188px;
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
  font-size: 12px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doc-input {
  background-color: transparent;
  border: 0px;
  color: #111;
  padding: 5px 0px;
  font-size: 15px;
  line-height: 1.5;
  margin-left: 20px;
}

.doc-input:focus {
  border-bottom: 1px solid var(--color-main);
}

.team,
.share,
.other {
  margin-right: 10px;
}

/* ---------------隐藏层动效---------------- */
.back--hide:hover,
.back:hover + .back--hide {
  display: block;
  animation: slowin 0.5s ease forwards;
}

@keyframes slowin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
