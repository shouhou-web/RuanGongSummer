<template>
  <div class="docs">
    <l-card class="doc" title="Test">
      <div slot="hide-content" class="hide-nav">
        <my-button type="text" class="nav-btn">打开</my-button>
        <my-button type="text" class="nav-btn">收藏</my-button>
        <my-button type="text" class="nav-btn">重命名</my-button>
        <my-button type="text" class="nav-btn">分享</my-button>
        <my-button type="text-danger" class="nav-btn">删除</my-button>
      </div>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "MyCollection"
};
</script>

<style scoped>
.docs {
  display: flex;
  flex-wrap: wrap;
}

.doc {
  margin-left: 30px;
  margin-right: 10px;
  margin-top: 20px;
}

.nav-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 10px 35px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
