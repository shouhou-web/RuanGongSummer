<template>
  <div class="comment-body">
    <div class="historys">
      <div v-for="(acomment, commentIndex) in comments" :key="commentIndex">
        <div :id="acomment.commentID" class="a-comment">
          <div style="display: flex; flex-direction: row;">
            <img :src="acomment.imagePath" class="user-img" @click="toUserProfile(acomment.userID)"/>
            <div class="comment-header">
              <div class="user-name">{{ acomment.userName }}</div>
              <div class="comment-date">
                <div>
                  {{ acomment.createTime }}
                </div>
                <a
                  :href="'#' + acomment.replyID"
                  v-if="acomment.replyID != null"
                  class="return"
                >
                  <img
                    src="../../../../assets/image/return.svg"
                    class="return-img"
                  />
                  <div style="padding-top: 1px;">
                    {{ acomment.reply.userName }}
                  </div>
                </a>
              </div>
            </div>
            <div class="reply" title="引用/回复">
              <img
                src="../../../../assets/image/reply.svg"
                class="reply-img"
                @click="
                  readyToReply(
                    acomment.commentID,
                    acomment.userName,
                    acomment.imagePath
                  )
                "
              />
            </div>
          </div>
          <div class="comment-text">
            {{ acomment.commentContent }}
          </div>
        </div>
      </div>
    </div>
    <div class="send-comment" @click="readyToComment(0)">
      发送评论
    </div>

    <m-hover
      :on-show="openSendComment"
      :width="350"
      title="发送/回复评论"
      assure-btn="发送评论"
      cancel-btn="取消发送"
      @submit="sendComment"
      @cancel="cancelToComment"
    >
      <div style="margin: auto;">
        <div
          style="color: #a5a5a5; font-size: 15px; margin-top: 5px;"
          v-if="replyID != 0"
        >
          回复
        </div>
        <div v-if="replyID != 0" class="reply-header">
          <img :src="toUserImgPath" class="user-img" />
          <div style="padding: 5px;">{{ toUserName }}</div>
        </div>
        <textarea
          v-model="commentContent"
          rows="8"
          cols="28"
          style="padding: 10px;"
        >
        </textarea>
      </div>
    </m-hover>
  </div>
</template>

<script>
import { addComment, getDocComment, deleteComment } from "@/network/comment";

export default {
  name: "docComment",
  props: {
    doc: {
      // 文档对象
      type: Object,
      default: {},
    },
    flag: false,
  },
  data() {
    return {
      comments: "",
      openSendComment: false,
      commentContent: "",
      replyID: 0,
      toUserName: "",
      toUserImgPath: "",
    };
  },
  methods: {
    readyToComment(commentID) {
      this.replyID = commentID;
      this.openSendComment = true;
      this.$emit('openComment')
    },
    readyToReply(commentID, userName, userImg) {
      this.replyID = commentID;
      this.openSendComment = true;
      this.toUserName = userName;
      this.toUserImgPath = userImg;
      this.$emit('openComment')
    },
    cancelToComment() {
      this.openSendComment = false;
      this.$emit('openComment')
    },
    sendComment() {
      // console.log("replyID send only", this.replyID);
      if (this.commentContent == "") {
        this.$message.warning("评论字数不许小于0");
        return;
      }
      this.$emit('openComment')
      // console.log(
      //   "send ONLY",
      //   this.doc.docID,
      //   this.$store.state.user.userID,
      //   this.commentContent,
      //   this.replyID
      // );

      addComment(
        this.doc.docID,
        this.$store.state.user.userID,
        this.commentContent,
        this.replyID
      )
        .then((res) => {
          if (res == 0) {
            this.$message.success("评论发送成功");
            this.openSendComment = false;
            this.commentContent = "";

            // 刷新
            getDocComment(this.doc.docID)
              .then((newres) => {
                // console.log("return comment", newres);
                // console.log(this.$store.state.user);
                this.comments = newres;
              })
              .catch((err) => {
                this.$message.error("获取评论失败，请检查网络!");
              });
          } else {
            console.log("err", res);
            this.$message.error("评论发送失败，请检查网络");
            this.openSendComment = false;
          }
        })
        .catch((err) => {
          this.$message.error("评论发送失败，请检查网络");
          this.openSendComment = false;
        });
    },
    replyComment() {
      // console.log("replyID", this.replyID);
      if (this.commentContent == "") {
        this.$message.warning("评论字数不许小于0");
        return;
      }

      // console.log(
      //   "addcomment",
      //   this.doc.docID,
      //   this.$store.state.user.userID,
      //   this.commentContent,
      //   this.replyID
      // );

      addComment(
        this.doc.docID,
        this.$store.state.user.userID,
        this.commentContent,
        this.replyID
      )
        .then((res) => {
          if (res == 0) {
            this.$message.success("评论发送成功");
            this.openSendComment = false;
            this.replyID = 0;
            this.commentContent = "";

            // 刷新
            getDocComment(this.doc.docID)
              .then((res) => {
                this.comments = res;
              })
              .catch((err) => {
                this.$message.error("获取评论失败，请检查网络!");
              });
          } else {
            // console.log("err", res);
            this.$message.error("评论发送失败，请检查网络");
            this.openSendComment = false;
          }
        })
        .catch((err) => {
          this.$message.error("评论发送失败，请检查网络");
          this.openSendComment = false;
        });
    },
    toUserProfile(userID) {
      this.$router.push({ path: '/profile', query: { userID } });
    }
  },
  created() {
    // console.log("CREATED", this.doc);
    getDocComment(this.doc.docID)
      .then((res) => {
        // console.log("return comment created", res);
        // console.log(this.$store.state.user);
        this.comments = res;
      })
      .catch((err) => {
        this.$message.error("获取评论失败，请检查网络!");
      });
  },
  watch: {
    doc() {
      getDocComment(this.doc.docID)
        .then((res) => {
          // console.log("return comment", res);
          // console.log(this.$store.state.user);
          this.comments = res;
        })
        .catch((err) => {
          this.$message.error("获取评论失败，请检查网络!");
        });
    },
    flag() {
      // console.log("FLAG USE 评论");
      getDocComment(this.doc.docID)
        .then((res) => {
          // console.log("评论", res);
          // console.log(this.$store.state.user);
          this.comments = res;
        })
        .catch((err) => {
          this.$message.error("获取评论失败，请检查网络!");
        });
    },
  },
};
</script>

<style scoped>
textarea {
  border: 1px solid var(--color-main);
  border-radius: 4px;
  margin-top: 20px;
  outline: none;
  resize: none;
}

:target {
  background-color: var(--color-main) !important;
  color: #fff !important;
  transition: transform 0.2s ease;
}

:target .user-name,
:target .comment-date {
  color: #fff;
}

.comment-body {
  right: 40px;
  width: 34vh;
  height: 80vh;
  border-radius: 5px;
  position: absolute;
}

.historys {
  border-radius: 5px;
  border: 1px solid #bcbcbc;
  height: 75vh;
  overflow: auto;
  background-color: white;
  padding-top: 10px;
}

.historys::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.historys::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #a1c4fd;
}

.historys::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(236, 186, 186, 0.2);
  background: none;
  border-radius: 10px;
}

.send-comment {
  padding-top: 1.5vh;
  background-color: #a1c4fd;
  text-align: center;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 5vh;
  transition: 0.5s;
}

.send-comment:hover {
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.a-comment {
  margin: auto;
  border-radius: 10px;
  padding: 5px;
  width: 94%;
  height: auto;
  background-color: #e6f3ff;
  margin-bottom: 8px;
  transition: 0.5s;
}

.a-comment:hover {
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.user-img {
  width: 30px;
  border: 1px solid #a8d8ee;
  border-radius: 50%;
  cursor: pointer;
}

.user-name {
  color: #a5a5a5;
  font-size: 12px;
  margin-left: 1vh;
  height: 15px;
}

.comment-text {
  padding: 10px;
  font-size: 12px;
  color: #333;
  line-height: 18px;
}

.comment-date {
  align-items: center;
  color: #a5a5a5;
  font-size: 12px;
  line-height: 12px;
  margin-left: 1vh;
  font-family: Consolas;
  height: 15px;
  display: flex;
  flex-direction: row;
}

.comment-header {
  display: flex;
  flex-direction: column;
}

.reply {
  width: 30px;
  height: 30px;
  margin-left: auto;
  cursor: pointer;
}

.reply-img {
  padding-top: 5px;
  width: 20px;
}

.reply-header {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  color: #a5a5a5;
  font-size: 14px;
  font-family: Consolas;
}

.return {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  margin-left: 20px;
  color: #667c99;
  width: auto;
  background-color: #ffffff;
  padding-right: 10px;
}

.return-img {
  width: 12px;
  margin-left: 5px;
  margin-right: 3px;
}
</style>
