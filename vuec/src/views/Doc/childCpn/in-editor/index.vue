<template>
  <div>
    <ckeditor
      class="ck-content"
      :editor="editor"
      v-model="editorData"
      :disabled="editDisabled"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></ckeditor>
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "./core/ckeditor.js";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "./assets/content-styles.css";
import { tryEditDoc, completeEditDoc, editDoc } from "network/doc";

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
  },
  data() {
    return {
      // 编辑器组件需要获取编辑器实例
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // 可以控制编辑器的提示文本
        placeholder: this.placeholder,
      },
      editState: false, // 锁权限
    };
  },
  watch: {
    doc(val) {
      console.log("value", this.doc.docContent);
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
    this._initEdit();
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
      tryEditDoc(this.doc.docID).then((res) => {
        // console.log("聚焦事件返回:", res);
        if (res != 0) {
          this.editState = true;
          this.$message({
            message: "有人正在编辑文档，请稍后刷新重试",
            type: "warning",
          });
        }
      });
    },
    // 失焦事件
    onBlur() {
      // console.log("onBlur");
      completeEditDoc(this.$store.state.user.userID, this.doc.docID).then(
        (res) => {
          // console.log("失焦事件返回:", res);
          if (res == 0)
            this.$notify({
              title: "成功",
              message: "编辑记录保存成功",
              type: "success",
            });
          else
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试222~",
            });
        }
      );
    },
    _initEdit() {
      const appData = {
        // Users data.
        users: [
          {
            id: "user-1",
            name: "Joe Doe",
            // Note that the avatar is optional.
            avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg",
          },
          {
            id: "user-2",
            name: "Ella Harper",
            avatar: "https://randomuser.me/api/portraits/thumb/women/65.jpg",
          },
        ],

        // The ID of the current user.
        userId: "user-1",

        // Suggestions data.
        suggestions: [
          {
            id: "suggestion-1",
            type: "insertion",
            authorId: "user-2",
            createdAt: new Date(2019, 1, 13, 11, 20, 48),
          },
          {
            id: "suggestion-2",
            type: "deletion",
            authorId: "user-1",
            createdAt: new Date(2019, 1, 14, 12, 7, 20),
          },
          {
            id: "suggestion-3",
            type: "formatInline:886cqig6g8rf",
            authorId: "user-1",
            createdAt: new Date(2019, 2, 8, 10, 2, 7),
            data: {
              commandName: "bold",
              commandParams: [{ forceValue: true }],
            },
          },
        ],

        // Editor initial data.
        initialData: `<h2>
          Bilingual Personality Disorder
      </h2>
      <p>
          This may be the first time you hear about this
          <suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="start"></suggestion>
          made-up<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="end"></suggestion>
          disorder but it actually isn’t so far from the truth.
          As recent studies show, the language you speak has more effects on you than you realize.
          According to the studies, the language a person speaks affects their cognition,
          <suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="start"></suggestion>
          feelings, <suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="end"></suggestion>
          behavior, emotions and hence <strong>their personality</strong>.
      </p>
      <p>
          This shouldn’t come as a surprise
          <a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a>
          that different regions of the brain become more active depending on the activity.
          The structure, information and especially
          <suggestion id="suggestion-3:user-1" suggestion-type="formatInline:886cqig6g8rf" type="start"></suggestion>
          the culture of languages<suggestion id="suggestion-3:user-1" suggestion-type="formatInline:886cqig6g8rf" type="end"></suggestion>
          varies substantially
          and the language a person speaks is an essential element of daily life.
      </p>`,
      };

      class TrackChangesIntegration {
        constructor(editor) {
          this.editor = editor;
        }

        init() {
          const usersPlugin = this.editor.plugins.get("Users");
          const trackChangesPlugin = this.editor.plugins.get("TrackChanges");

          // Load the users data.
          for (const user of appData.users) {
            usersPlugin.addUser(user);
          }

          // Set the current user.
          usersPlugin.defineMe(appData.userId);

          // Load the suggestions data.
          for (const suggestion of appData.suggestions) {
            trackChangesPlugin.addSuggestion(suggestion);
          }

          // In order to load comments added to suggestions, you
          // should also configure the comments integration.
        }
      }

      ClassicEditor.create(document.querySelector("#editor"), {
        initialData: appData.initialData,
        extraPlugins: [TrackChangesIntegration],
        licenseKey: "BTwoN2FJuJIiGvx7Ro5jkvqKKgoTNDnl1CVyzZd8RxlOrhwXD2U5FW4=",
        sidebar: {
          container: document.querySelector("#sidebar"),
        },
        toolbar: {
          items: ["bold", "italic", "|", "trackChanges"],
        },
      }).catch((error) => console.error(error));
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 80vh;
}
</style>
