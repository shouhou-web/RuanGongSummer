<template>
  <div class="docs">
    <l-card class="doc">Title here</l-card>
  </div>
</template>

<script>
export default {
  name: "MyCollection",
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