<template>
  <div>
    <div class="wrapper--son">
      <div class="header">
        <div class="avator">
          <img class="avator__inner" :src="user.imagePath" alt="" />
          <a @click="editImage = true" class="avator__hide" title="上传新头像">
            <img class="avator__inner--small" src="@/assets/icon/profile/edit.png" alt="">
          </a>
        </div>
        <div class="name">
          {{ user.userName }}
        </div>
      </div>
      <!-- 右侧信息展示 -->
      <div class="main">
        <div class="main-item">
          <div class="num">
            3
          </div>
          <div class="label">
            团队
          </div>
        </div>
        <div class="main-item border-left">
          <div class="num">
            1
          </div>
          <div class="label">
            已完成
          </div>
        </div>
        <div class="main-item border-left">
          <div class="num">
            15
          </div>
          <div class="label">
            协作成员
          </div>
        </div>
      </div>
    </div>
    <m-hover
      @submit="submit"
      @cancel="close"
      :onShow="editImage"
      title="选择头像"
      assureBtn="选择"
      cancelBtn="取消"
    >
      <ul class="avator-list">
        <li
          class="avator-item"
          :class="[item == imagePath ? 'avator-item--active' : '']"
          v-for="(item, index) in image"
          :key="index"
        >
          <img @click="imgClick(item)" :src="item" alt="" />
        </li>
      </ul>
    </m-hover>
  </div>
</template>

<script>
import MHover from "components/common/m-hover/m-hover";
import { setImagePath } from "network/profile";
export default {
  name: "ProfileHeader",
  components: {
    MHover
  },
  data() {
    return {
      imagePath: "",
      editImage: false, // 编辑头像
      image: [
        "https://img-static.mihoyo.com/communityweb/upload/0e16987863d21f5344d4d1d85af4f665.png",
        "https://img-static.mihoyo.com/communityweb/upload/6b0f081237dd42848c2337a1654b6834.png",
        "https://img-static.mihoyo.com/communityweb/upload/ac0e91166369b32514591a3fa8696533.png",
        "https://img-static.mihoyo.com/communityweb/upload/d728c63133906a6e155985edeba52a91.png",
        "https://img-static.mihoyo.com/communityweb/upload/00889bcad86a4ca6b2b3423c186a5277.png",
        "https://img-static.mihoyo.com/communityweb/upload/ef068eb6f4cc679fd744c7fc5a985de7.png",
        "https://img-static.mihoyo.com/communityweb/upload/133b0fea749a4eab2ff2aa776fb6552f.png",
        "https://img-static.mihoyo.com/communityweb/upload/e362041b0d2b67b8ecea72372d1dfd77.png",
        "https://img-static.mihoyo.com/communityweb/upload/b051698fcf40c6b0bc3c156ccd1169b4.png",
        "https://img-static.mihoyo.com/communityweb/upload/0b31dfc7a1078bc0950f94ba3b757613.png",
        "https://img-static.mihoyo.com/communityweb/upload/2adac6e4e0195c39d90696955f9a7902.png",
        "https://img-static.mihoyo.com/avatar/avatar30003.png",
        "https://img-static.mihoyo.com/avatar/avatar30044.png",
        "https://img-static.mihoyo.com/avatar/avatar30045.png",
        "https://img-static.mihoyo.com/avatar/avatar30017.png",
        "https://img-static.mihoyo.com/communityweb/upload/d3183774d0d6f7a41d670e7dbc4654e3.png",
        "https://img-static.mihoyo.com/communityweb/upload/820f461e107e17f11d8fa8c5e45d5289.png",
        "https://img-static.mihoyo.com/communityweb/upload/fbdf7f523c1dd6626d2c5f03ee3f6f98.png",
        "https://img-static.mihoyo.com/communityweb/upload/57b90e40dc9dc200b5edd78dee9c2229.png",
        "https://img-static.mihoyo.com/communityweb/upload/1ef39940f7b29521ec1eddd2e7dec95f.png",
        "https://img-static.mihoyo.com/communityweb/upload/f50dd4023f740340b1c54141c7b6c1be.png",
        "https://img-static.mihoyo.com/communityweb/upload/de22b6827f169102f4cf860462d92feb.png",
        "https://img-static.mihoyo.com/communityweb/upload/323cc51093b9f86722bb20482508bf3d.png",
        "https://img-static.mihoyo.com/communityweb/upload/696cf7f6443df04eccf6ebb2e241ee74.png",
        "https://img-static.mihoyo.com/communityweb/upload/b6bbc725a4afd2369827782d537b24d4.png",
        "https://img-static.mihoyo.com/communityweb/upload/cae78e205c56da101fb44b13554a949b.png",
        "https://img-static.mihoyo.com/communityweb/upload/da411f6525512811eba03bfbad9633a6.png",
        "https://img-static.mihoyo.com/communityweb/upload/b847b9027dc47246d1e2b11b172764b4.png",
        "https://img-static.mihoyo.com/communityweb/upload/3462ba26d0721ebc099410fd28a97edd.png",
        "https://img-static.mihoyo.com/communityweb/upload/7cb31635bc3a1d70aaa318815da7da52.png",
        "https://img-static.mihoyo.com/communityweb/upload/d081a9ec7c36973cfdd05c65868e64db.png",
        "https://img-static.mihoyo.com/communityweb/upload/04bec71668213f8415e2f70a658f7052.png",
        "https://img-static.mihoyo.com/communityweb/upload/d5ec3a882e86840aa8a89977ff6027ff.png",
        "https://img-static.mihoyo.com/communityweb/upload/8b93fdb528544b275c55738b12c75ffe.png",
        "https://img-static.mihoyo.com/communityweb/upload/3853cac2e164aaef0e113156a059b811.png",
        "https://img-static.mihoyo.com/communityweb/upload/cdc6ca1158d4ae532ca3a7f4224d22cc.png",
        "https://img-static.mihoyo.com/communityweb/upload/247bf074f83f9e2de0f61402c269669f.png",
        "https://img-static.mihoyo.com/communityweb/upload/2872edd31066251e2430110fea06152a.png",
        "https://img-static.mihoyo.com/communityweb/upload/222b847170feb3f2babcc1bd4f0e30dd.png",
        "https://img-static.mihoyo.com/communityweb/upload/43c2bf44e066f3f763d0456100d6c2a6.png",
        "https://img-static.mihoyo.com/communityweb/upload/b1493c45ae9c4c47877e5e8297046f90.png",
        "https://img-static.mihoyo.com/communityweb/upload/8075f7c3db21e5325281aa7a7d2fe6de.png",
        "https://img-static.mihoyo.com/communityweb/upload/a57113d5e6173a05f7980c978c5a2bd6.png",
        "https://img-static.mihoyo.com/communityweb/upload/38a67cbf6a0bf5feadde8bde74025041.png",
        "https://img-static.mihoyo.com/communityweb/upload/ec4e226f47a169749d96433dd63f391e.png",
        "https://img-static.mihoyo.com/communityweb/upload/52de23f1b1a060e4ccaa8b24c1305dd9.png"
      ]
    };
  },
  methods: {
    submit() {
      setImagePath(this.user.userID, this.imagePath)
        .then(res => {
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "修改头像成功",
              type: "success"
            });
            this.$store.commit("setImagePath", this.imagePath);
            this.close();
          } else
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~"
            });
        })
        .catch(err => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
        });
    },
    close() {
      this.editImage = false;
    },
    imgClick(src) {
      this.imagePath = src;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.imagePath = this.$store.state.imagePath;
  }
};
</script>

<style scoped>
.wrapper--son {
  align-items: center;
  display: flex;
  justify-content: space-around;
  padding: 20px 50px;
}

.header {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.avator {
  width: 90px;
  height: 90px;
  position: relative;
}

.avator__inner {
  border-radius: 50%;
  border: 1px solid #ebebeb;
  height: 100%;
  width: 100%;
}

.avator__inner--small {
  border-radius: 50%;
  height: 40%;
  width: 40%;
}

.avator__hide {
  align-items: center;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.avator:hover .avator__hide {
  opacity: 1;
  cursor: pointer;
}

.name {
  color: #333;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  margin-top: 10px;
}

.main {
  align-items: center;
  display: flex;
  height: 50px;
}

.main-item {
  font-size: 14px;
  min-width: 100px;
  padding: 0 20px;
  text-align: center;
}

.border-left {
  border-left: 1px solid #f0f0f0;
}

.num {
  color: #666;
  font-size: 20px;
}

.label {
  color: #ccc;
}

/* --------------------悬浮窗的代码----------------------- */

.avator-list {
  padding: 0px 0 0 25px;
  width: 490px;
  height: 470px;
  overflow: auto;
}

.avator-item {
  display: inline-block;
  vertical-align: top;
  width: 90px;
  height: 90px;
  padding: 4px;
  border: 1px solid transparent;
  margin: 0 20px 20px 0;
  border-radius: 100%;
  cursor: pointer;
}

.avator-item img {
  border: 1px solid #f0f0f0;
  border-radius: 100%;
  height: 100%;
  width: 100%;
}

.avator-item--active {
  border-color: #4cc3ff;
}
</style>
