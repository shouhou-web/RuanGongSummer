<template>
<div>
  <div class="docs">

  </div>
</div>
</template>

<script>
import { getFavoriteDocs } from "../../../../network/workspace.js";

export default {
  name: "Recent",
  data() {
    return {

    };
  },
  created() {

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
