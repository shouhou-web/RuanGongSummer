<template>
  <div>
    <div v-if="docs.length == 0">
      <l-show-none></l-show-none>
    </div>
    <div class="my-team-details" v-else>
      <div class="docs-block" v-if="alignStyle">
        <div class="doc" v-for="(adoc, docIndex) in docs" :key="docIndex">
          <l-card
            :title="adoc.docTitle"
            :i-d="adoc.docID"
            :can-check="adoc.creatorID == $store.state.user.userID"
            @addDoc="addToChosen"
            @cancelDoc="cancelChosen"
          >
            <div slot="hide-content" class="hide-nav">
              <my-button size="text" class="nav-btn">打开</my-button>
              <my-button size="text" class="nav-btn">收藏</my-button>
              <my-button size="text" class="nav-btn">重命名</my-button>
              <my-button size="text" class="nav-btn" @click="shareDoc(adoc.docID,adoc.docTitle)">分享</my-button>
              <my-button size="text-danger" class="nav-btn">删除</my-button>
            </div>
          </l-card>
        </div>
      </div>
      <div class="docs-list" v-else>
        <div class="doc" v-for="(adoc, docIndex) in docs" :key="docIndex">
          <l-lcard
            :title="adoc.docTitle"
            :i-d="adoc.docID"
            :can-check="adoc.creatorID == $store.state.user.userID"
            :time="adoc.lastEditTime"
            :creator-i-d="adoc.creatorID"
            @addDoc="addToChosen"
            @cancelDoc="cancelChosen"
          >
            <div slot="hide-content" class="hide-nav">
              <my-button size="text" class="nav-btn">打开</my-button>
              <my-button size="text" class="nav-btn">收藏</my-button>
              <my-button size="text" class="nav-btn">重命名</my-button>
              <my-button size="text" class="nav-btn" @click="shareDoc(adoc.docID,adoc.docTitle)">分享</my-button>
              <my-button size="text-danger" class="nav-btn">删除</my-button>
            </div>
          </l-lcard>
        </div>
      </div>
    </div>

    <m-hover :on-show="openShare" title="分享此文档链接">
      <div>
        <input type="text"
               id="input"
               :value="shareSrc"
               class="input-share" readonly="">
        <br>
        <span v-clipboard:copy="shareSrc"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError" class="button-share">
          复制
        </span>
      </div>
    </m-hover>
  </div>
</template>

<script>
import { getTeamDocs, getUserIdentity, quitTeam, disbandTeam,} from "@/network/team";
import { docBatchDelete, docBatchFavorite } from "@/network/doc";
const qs = require("qs");

export default {
  name: "TeamDoc",
  data() {
    return {
      teamID: "",
      docs: "",
      docstyle: 0,
      chosenDocs: [],
      shareSrc: '',
      openShare: false,
      chosenNum: 0
    };
  },
  props: {
    TeamID: {
      type: String,
      require: true,
    },
    alignStyle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addToChosen(docID) {
      console.log(docID);
      this.chosenDocs.push(docID);
      console.log("被选中Doc", this.chosenDocs);
    },
    cancelChosen(docID) {
      for (var i = 0; i < this.chosenDocs.length; i++) {
        if (this.chosenDocs[i] == docID) {
          this.chosenDocs.splice(i, 1);
          console.log("被选中Doc(删除后)", this.chosenDocs);
          return;
        }
      }
    },
    batchDelete() {
      var chosen_Docs = qs.stringify(this.chosenDocs, { indices: false });
      docBatchDelete(chosen_Docs, this.$store.state.user.userID)
        .then((res) => {
          if (res == 0) {
            console.log(res);
            this.$notify.success("批量删除成功");
            this.$router.go(0);
          } else {
            this.$notify.error("请检查网络，删除失败");
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("请检查网络，删除失败");
          return;
        });
    },
    batchFavorite() {
      var chosen_Docs = qs.stringify(this.chosenDocs, { indices: false });
      console.log(chosen_Docs);
      docBatchFavorite(chosen_Docs, this.$store.state.user.userID)
        .then((res) => {
          if (res == 0) {
            this.$notify.success("批量收藏成功");
            this.$router.go(0);
          } else {
            this.$notify.error("请检查网络，收藏失败");
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("请检查网络，收藏失败");
          return;
        });
    },
    shareDoc(docID,docTitle) {
      var toDoc = window.location.href;
      toDoc = toDoc.substring(0,toDoc.length - 15);
      toDoc = toDoc + '/doc?docID=' + docID + '&docTitle=' + docTitle;
      console.log(toDoc);
      this.shareSrc = toDoc;
      this.openShare = true;
    },
    cancelShare() {
      this.openShare = false;
    },
    onCopy() {
      this.$message.success('复制成功！');
      this.openShare = false;
    },
    onCopyError() {
      this.$message.error('复制失败');
    }
  },
  watch: {
    TeamID() {
      // console.log('TeamDoc',this.TeamID);
      // console.log(this.$store.state.user.userID);
      //this.$router.push({path: "/home/teamSpace?teamID=1"})
      if (this.chosenDocs.length != 0) this.$notify.info("批量操作已刷新");
      this.chosenDocs = []; //清除数据
      this.chosenNum = 0;
      getTeamDocs(this.TeamID)
        .then((docs) => {
          console.log("docs", docs);
          this.docs = docs;
        })
        .catch((err) => {
          // console.log('wrong');
          this.$message.error("请检查网络 - 暂时还无法获取团队文档");
          return;
        });
    },
    chosenDocs() {
      this.chosenNum = this.chosenDocs.length;
      // console.log(this.chosenNum);
      this.$emit('chosen-change',this.chosenNum);
    }
  },
};
</script>

<style scoped>
.nav-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 10px 35px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.my-team-details {
  margin: auto;
  height: 70vh;
  border-radius: 5px;
  overflow: auto;
}

.team-docs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  border-radius: 5px;
}

.doc {
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.doc--img {
  width: 80%;
  margin-left: 10%;
  margin-top: -10%;
}

.doc--name {
  width: auto;
  height: auto;
  text-align: center;
  font-family: "JetBrains Mono";
  font-size: 12px;
}

.l-card {
  align-items: center;
  color: #303133;
  transition: 0.3s;
  overflow: hidden;
  -webkit-transition: 0.3s;
}

.l-card__nav {
  align-self: flex-end;
  margin-right: 2px;
  margin-top: 2px;
}

.l-card__setting {
  height: 18px;
  width: 18px;
}

.l-card__pic {
  width: 80px;
  height: 80px;
}

.l-card__body {
  margin: 10px 20px;
}

.l-card__hide-main {
  margin: auto;
  background-color: #fafbfc;
  display: flex;
  flex-direction: column;
}

.l-card__nav-btn {
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.l-card__nav-btn:hover {
}

.opt {
  float: right;
  height: 10px;
  margin-top: 5px;
  margin-right: 10px;
}

.more-opt{
  position: fixed;
  margin-top: -70px;
  margin-left: -10%;
}

.input-share{
  border: 1px solid #91c4f1;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
}

.button-share{
  position: fixed;
  margin-top: 10px;
  margin-left: 120px;
  background: #ffffff;
  border: 1px solid #d8e3ec;
  border-radius: 7px;
  color: #60a5dd;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  padding: 12px 20px;
  text-align: center;
  transition: ease-in-out 0.5s;
}

.button-share:hover{
  color: #25374f;
  border-color: #c6e2ff;
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.docs-block {
  display: flex;
  flex-wrap: wrap;
}

.docs-list {
  display: flex;
  flex-direction: column;
}
</style>
