<template>
  <div class="docs">
    <div class="doc">
      <img src="@/assets/icon/header/icon-litst.png" class="doc-icon" />
      <span>Test Document</span>
    </div>
    <div class="doc">
      <img src="@/assets/icon/header/icon-litst.png" class="doc-icon" />
      <span>Test Document</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recent",
};
</script>

<style scoped>
.docs {
  display: flex;
  margin: 20px;
}

.doc {
  align-items: center;
  display: flex;
  width: 300px;
  height: 80px;
  background-color: #e1e2e4;
  margin: 20px;
}

.doc-icon {
  height: 60px;
  margin: 10px;
}
</style>