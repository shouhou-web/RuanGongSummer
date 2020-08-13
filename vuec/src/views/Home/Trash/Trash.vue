<template>
  <div class="docs">
    <l-card class="doc">Title here</l-card>
    <l-card class="doc">Title here</l-card>
    <l-card class="doc">Title here</l-card>
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
</style>
