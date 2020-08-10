<template>
  <div class="wrapper--son">
    <div class="header">
      <div class="avator">
        <img class="avator__inner" :src="user.imagePath" alt="" />
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
</template>

<script>
export default {
  name: "ProfileHeader",
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
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
}

.avator img {
  border-radius: 50%;
  border: 1px solid #ebebeb;
  height: 100%;
  width: 100%;
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
</style>
