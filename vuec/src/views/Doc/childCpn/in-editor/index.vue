<template>
  <ckeditor :editor="editor" :value="editorData"></ckeditor>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "inEditor",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    }
  },
  data() {
    return {
      // 编辑器组件需要获取编辑器实例
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // 可以控制编辑器的提示文本
        placeholder: this.placeholder
      }
    };
  },
  watch: {
    value(val) {
      if (!this.editor) {
        return;
      }

      // 外部内容发生变化时，将新值赋予编辑器
      if (val && val !== this.editorData) {
        this.editorData = this.value;
      }
    },
    editorData(val) {
      if (val && val !== this.value) {
        // 编辑器内容发生变化时，告知外部，实现 v-model 双向监听效果
        this.$emit("input", val);
      }
    }
  },
  created() {
    // 编辑器组件创建时将外部传入的值直接赋予编辑器
    this.editorData = this.value;
  },
  components: {
    // 编辑器组件的局部注册方式
    ckeditor: CKEditor.component
  }
};
</script>

<style scoped>
p {
  color: orange;
}
</style>
