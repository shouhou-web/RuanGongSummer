<template>
<div class="docs">
    <l-card class="doc" title="Test1">
      <div slot="hide-content" class="hide-nav">
        <my-button type="text" class="nav-btn">打开</my-button>
        <my-button type="text-danger" class="nav-btn">彻底删除</my-button>
      </div>
    </l-card>
    <l-card class="doc" title="Test2">
      <div slot="hide-content" class="hide-nav">
        <my-button type="text" class="nav-btn">打开</my-button>
        <my-button type="text-danger" class="nav-btn">彻底删除</my-button>
      </div>
    </l-card>
    <l-card class="doc" title="Test3">
      <div slot="hide-content" class="hide-nav">
        <my-button type="text" class="nav-btn">打开</my-button>
        <my-button type="text-danger" class="nav-btn">彻底删除</my-button>
      </div>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "Trash",
  created() {
    this.$store.state.hasTeam = false;
    this.$store.state.nowTeamID = -1;
  }
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
  padding: 10px 25px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
