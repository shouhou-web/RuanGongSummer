<template>
  <div id="doc">
    <div class="editor">
      <in-editor></in-editor>
    </div>
  </div>
</template>

<script>
import inEditor from "./childCpn/inEditor";
export default {
  name: "Doc",
  components: {
    inEditor
  }
};
</script>

<style scoped>
#doc {
  background-color: orange;
}

.editor {
  margin: 50px auto 0;
  width: 80vw;
}

#doc p::before {
  content: "123";
  position: absolute;
  left: -9px;
}
</style>
