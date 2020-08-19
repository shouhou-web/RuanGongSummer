<template>
  <div>
    <ckeditor
      class="ck-content"
      :editor="editor"
      :config="editorConfig"
      v-model="editorData"
      :disabled="editDisabled"
      @input="onInput"
      @focus="onFocus"
    ></ckeditor>
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "./core/ckeditor.js";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "./assets/content-styles.css";
import { tryEditDoc, completeEditDoc, editDoc } from "network/doc";
import { addSuggestion, getSuggestion, updateSuggestion } from "network/doc";

export default {
  name: "inEditor",
  props: {
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    doc: {
      type: Object,
      default: {},
    },
    imagePath: {
      type: String,
      defaualt: "",
    },
  },
  data() {
    return {
      // 编辑器组件需要获取编辑器实例
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // 可以控制编辑器的提示文本
        placeholder: this.placeholder,
        // 上传图片
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: "http://39.99.154.244:8080/uploadImage",
        },
      },
      editState: false, // 锁权限
    };
  },
  watch: {
    doc(val) {
      // console.log("value", this.doc.docContent);
      if (!this.editor) {
        return;
      }

      // 外部内容发生变化时，将新值赋予编辑器
      if (val && val !== this.editorData) {
        this.editorData = this.doc.docContent;
      }
    },
    editorData(val) {
      if (val && val !== this.value) {
        // 编辑器内容发生变化时，告知外部，实现 v-model 双向监听效果
        this.$emit("input", val);
      }
    },
  },
  created() {
    // 编辑器组件创建时将外部传入的值直接赋予编辑器
    if (this.editState) {
      this.onBlur();
    }
    this.editorData = this.doc.docContent;
    window.addEventListener("beforeunload", (e) => {
      this._onBlur();
    });
    // this._initEdit();
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
    this._onBlur();
  },
  mounted() {
    window.addEventListener("beforeunload", function (e) {});
  },
  components: {
    // 编辑器组件的局部注册方式
    ckeditor: CKEditor.component,
  },
  computed: {
    editDisabled() {
      return this.disabled || this.editState;
    },
  },
  methods: {
    onInput() {
      // console.log(this.value);
      editDoc(this.doc.docID, this.editorData).then((res) => {
        // console.log("编辑状态", res);
        if (res == 1) {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        }
      });
    },
    // 聚焦事件
    onFocus() {
      // console.log("onFocus");
      if (!this.$store.state.editState)
        tryEditDoc(this.doc.docID).then((res) => {
          console.log("聚焦事件返回:", res);
          if (res != 0) {
            this.editState = true;
            this.$message({
              message: "有人正在编辑文档，请稍后刷新重试",
              type: "warning",
            });
          } else {
            this.$store.commit("setEditState");
          }
        });
    },
    // 放锁事件
    _onBlur() {
      if (this.$store.state.editState) {
        console.log("放锁");
        completeEditDoc(this.$store.state.user.userID, this.doc.docID).then(
          (res) => {
            console.log("返回", res);
          }
        );
        this.$store.commit("loseEditState");
      }
    },
    _initEdit() {},
  },
};
</script>

<style scoped></style>
