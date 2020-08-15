<template>
  <div>
    <m-header bgColor="#f7f7f7">
      <template v-slot:left>
        <m-nav-dropdown position="right">
          <my-button slot="show" size="small">快速跳转</my-button>
          <div slot="hide">
            <div class="back-item">
              <div class="back-header">
                返回到
              </div>
              <router-link
                class="back-a"
                v-for="(item, index) in back"
                :to="item.href"
                :key="index"
              >
                <img class="back-a__icon" :src="item.iconSrc" alt="" />
                <div class="back-a__title">{{ item.title }}</div>
              </router-link>
            </div>
            <!-- 最近访问的文档。 -->
            <div v-if="recentDoc.length > 0" class="back-item">
              <div class="back-header">
                最近使用
              </div>
              <a
                @click="toRecent(item)"
                class="back-a"
                v-for="(item, index) in recentDoc"
                :key="index"
              >
                <img
                  class="back-a__icon"
                  src="@/assets/icon/doc/file.png"
                  alt=""
                />
                <div class="back-a__title">{{ item.docTitle }}</div>
              </a>
            </div>
          </div>
        </m-nav-dropdown>

        <!-- 标题 -->
        <div class="doc-title">
          <input
            @blur="submitDocTitle"
            class="doc-input"
            v-model="doc.docTitle"
            type="text"
          />
        </div>
      </template>
      <template v-slot:right>
        <div class="doc-right-nav">
          <div class="team">
            <my-button @click="openCooperation" size="small">协作</my-button>
          </div>
          <div class="share">
            <my-button size="small">分享</my-button>
          </div>
          <div class="other">
            <m-nav-dropdown position="middle">
              <my-button slot="show" size="small">其他操作</my-button>
              <div slot="hide">
                <ul class="other-list">
                  <li class="other-item">
                    收藏文档
                  </li>
                  <li class="other-item">
                    分享文档
                  </li>
                  <li class="other-item other-item--red">
                    删除文档
                  </li>
                </ul>
              </div>
            </m-nav-dropdown>
          </div>
        </div>

        <m-hover
          :onShow="isCooperation"
          assureBtn="确认"
          cancelBtn="取消"
          :width="350"
          @submit="submit"
          @cancel="cancel"
        >
          <div class="cooperation">
            <div class="cooperation-header">
              <span class="cooperation__header1">团队成员</span>
              <span class="cooperation__header2">其他用户</span>
            </div>
            <div class="cooperation-list">
              <ul>
                <li v-for="(item, index) in identityList" :key="index">
                  <my-button
                    class="item-wrapper"
                    type="text"
                    :active="item.docIdentity == docIdentity"
                  >
                    <label class="cooperation-item">
                      <input
                        name="type"
                        type="radio"
                        :value="item.docIdentity"
                        v-model="docIdentity"
                      />
                      <span
                        class="cooperation__name1"
                        :class="[
                          item.docIdentity == docIdentity ? 'name--blue' : '',
                        ]"
                        >{{ item.name1 }}</span
                      >
                      <span
                        class="cooperation__name1"
                        :class="[
                          item.docIdentity == docIdentity ? 'name--blue' : '',
                        ]"
                        >{{ item.name2 }}</span
                      >
                    </label>
                  </my-button>
                </li>
              </ul>
            </div>
          </div>
        </m-hover>
      </template>
    </m-header>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
import { editDocTitle } from "network/doc";
import { getRecentDocs } from "network/doc";
export default {
  name: "MDocHeader",
  components: {
    MHeader,
  },
  props: {
    doc: {
      // 文档对象
      type: Object,
      default: {},
    },
  },
  created() {
    getRecentDocs(this.$store.state.user.userID).then((res) => {
      this.recentDoc = res;
      if (res.length > 10) {
        this.recentDoc = res.slice(0, 9);
      }
    });
  },
  data() {
    return {
      isCooperation: false, // 是否编辑权限
      docIdentity: 0, // 文档权限
      identityList: [
        {
          docIdentity: 4,
          name1: "不可读",
          name2: "不可读",
        },
        {
          docIdentity: 3,
          name1: "不可读",
          name2: "可读",
        },
        {
          docIdentity: 2,
          name1: "不可读",
          name2: "可读写",
        },
        {
          docIdentity: 1,
          name1: "可读",
          name2: "可写",
        },
        {
          docIdentity: 0,
          name1: "可读",
          name2: "可读写",
        },
      ],
      // 返回跳转
      back: [
        {
          title: "工作台",
          iconSrc: require("@/assets/icon/doc/workspace.png"),
          href: {
            path: "/home/workSpace",
          },
        },
        {
          title: "团队空间",
          iconSrc: require("@/assets/icon/doc/teamspace.png"),
          href: {
            path: "/home/teamSpace",
          },
        },
        {
          title: "回收站",
          iconSrc: require("@/assets/icon/doc/desktop.png"),
          href: {
            path: "/home/trash",
          },
        },
      ],
      // 近期文档
      recentDoc: [],
    };
  },
  methods: {
    // 打开协作框
    openCooperation() {
      console.log(123);
      this.isCooperation = true;
    },
    // 监听确定事件
    submit() {},
    // 取消悬浮窗展示
    cancel() {
      this.isCooperation = false;
    },
    // 修改帖子标题
    submitDocTitle() {
      editDocTitle(
        this.$store.state.user.userID,
        this.doc.docID,
        this.doc.docTitle
      )
        .then((res) => {
          if (res == 1)
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    // 跳转到近期浏览
    toRecent(item) {
      this.$emit("toRecent", item);
    },
  },
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

.doc-right-nav {
  display: flex;
  justify-content: flex-end;
  width: 95%;
}

.team,
.share,
.other {
  margin-right: 20px;
}

.other-list {
  background-color: #fff;
  padding: 8px 0;
}

.other-item {
  align-items: center;
  color: #666;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  padding: 10px 25px;
}

.other-item:hover {
  background-color: #f4f4f4;
}

.other-item--red {
  color: var(--color-tint);
}

.cooperation-header {
  align-items: center;
  display: flex;
  padding: 0px 50px 0;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.cooperation__header1,
.cooperation__header2 {
  margin-left: 30px;
}

.cooperation-list {
  display: flex;
  flex-direction: column;
}

.item-wrapper {
  width: 100%;
}

.cooperation-item {
  align-items: center;
  cursor: pointer;
  display: flex;
  text-align: center;
  padding: 10px 0;
  width: 300px;
}

.cooperation-item input {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 50px;
}

.cooperation__name1,
.cooperation__name2 {
  color: #000;
  margin-left: 30px;
  width: 64px;
}

.name--blue {
  color: #409eff;
}
</style>
