<template>
  <div id="doc">
    <div class="header">
      <m-doc-header></m-doc-header>
    </div>
    <div class="editor">
      <in-editor></in-editor>
    </div>
  </div>
</template>

<script>
import MDocHeader from "@/components/content/m-doc-header/MDocHeader"
import inEditor from "./childCpn/in-editor/index";
export default {
  name: "Doc",
  components: {
    inEditor,
    MDocHeader
  }
};
</script>

<style scoped>
.editor {
  margin: 50px auto 0;
  width: 80vw;
  height: 80vh;
}

.ck {
  height: 80vh;
}
</style>
