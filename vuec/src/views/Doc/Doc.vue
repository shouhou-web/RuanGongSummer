<template>
  <div id="doc">
    <div class="header">
      <m-doc-header :doc="doc"></m-doc-header>
    </div>
    <div class="editor">
      <in-editor></in-editor>
    </div>
  </div>
</template>

<script>
import MDocHeader from "@/components/content/m-doc-header/MDocHeader";
import inEditor from "./childCpn/in-editor/index";
import { getDoc } from "network/doc";

export default {
  name: "Doc",
  components: {
    inEditor,
    MDocHeader
  },
  data() {
    return {
      doc: {
        docID: "",
        docTitle: "无标题",
        docContent: ""
      }
    };
  },
  created() {
    // console.log("docID", this.$route.query.docID);
    // console.log("docTitle", this.$route.query.docTitle);
    // let userID = this.$store.state.user.userID;
    // let docID = this.$route.query.docID;
    // if (docTitle == "")
    //   // 新建文档
    //   this.doc.docID = docID;
    // else {
    //   getDoc(userID, docID)
    //     .then(res => {
    //       // 暂时直接赋值
    //       this.doc = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.$notify.error({
    //         title: "网络错误",
    //         message: "请稍后重试~"
    //       });
    //     });
    // }
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
