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
    <div class="doc">
      <img src="@/assets/icon/header/icon-litst.png" class="doc-icon" />
      <span>Test Document</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trash"
};
</script>

<style scoped>
.docs {
  display: flex;
  margin: 20px;
}

.doc {
  align-items: center;
  background-color: #e1e2e4;
  display: flex;
  height: 80px;
  margin: 20px;
  width: 300px;
}

.doc-icon {
  height: 60px;
  margin: 10px;
}
</style>
