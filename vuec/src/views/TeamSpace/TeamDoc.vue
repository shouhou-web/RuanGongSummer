<template>
  <div>
    <div v-if="docs.length == 0">
      <l-show-none></l-show-none>
    </div>
    <div class="my-team-details" v-else>
      <div class="opt" v-if="chosenDocs.length > 0">
        <m-nav-dropdown position="left" class="l-card__nav">
          <div slot="show">
            <img class="l-card__setting" src="@/assets/image/teamopt.svg">
          </div>
          <div slot="hide" style="border: 1px solid #ececec;border-radius: 5px;background-color: white">
            <div class="l-card__hide-main">
              <my-button type="text-danger"
                         size="medium"
                         class="l-card__nav-btn"
                         @click="batchDelete">删除 {{chosenDocs.length}} 个文档</my-button>
              <my-button type="text"
                         size="medium"
                         class="l-card__nav-btn"
                         @click="batchFavorite">收藏 {{chosenDocs.length}} 个文档</my-button>
            </div>
          </div>
          <input/>
        </m-nav-dropdown>
      </div>
      <div class="team-docs">
        <div class="doc" v-for="(adoc,docIndex) in docs" :key="docIndex">
          <l-card :title="adoc.docTitle"
                  :i-d="adoc.docID"
                  :can-check="adoc.creatorID == $store.state.user.userID"
                  @addDoc="addToChosen"
                  @cancelDoc="cancelChosen">
            <div slot="hide-content" class="hide-nav">
              <my-button size="text" class="nav-btn">打开</my-button>
              <my-button size="text" class="nav-btn">收藏</my-button>
              <my-button size="text" class="nav-btn">重命名</my-button>
              <my-button size="text" class="nav-btn">分享</my-button>
              <my-button size="text-danger" class="nav-btn">删除</my-button>
            </div>
          </l-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTeamDocs,getUserIdentity,quitTeam,disbandTeam} from "@/network/team";
import {docBatchDelete,docBatchFavorite} from "@/network/doc";

export default {
  name: "TeamDoc",
  data() {
    return {
      teamID: '',
      docs: '',
      docstyle: 0,
      chosenDocs: []
    }
  },
  props: {
    TeamID: {
      type: String,
      require: true
    }
  },
  methods: {
    addToChosen(docID) {
      console.log(docID);
      this.chosenDocs.push(docID);
      console.log('被选中Doc',this.chosenDocs);
    },
    cancelChosen(docID) {
      for (var i = 0;i < this.chosenDocs.length;i++) {
        if (this.chosenDocs[i] == docID){
          this.chosenDocs.splice(i,1);
          console.log('被选中Doc(删除后)',this.chosenDocs);
          return;
        } else {
          this.$notify.warning("数据错误");
        }
      }
    },
    batchDelete() {
      console.log(this.chosenDocs);
      docBatchDelete(this.chosenDocs,this.$store.state.user.userID)
        .then(res => {
          if (res == 0) {
            this.$notify.success("批量删除成功");
            this.$router.go(0);
          } else {
            this.$notify.error("请检查网络，删除失败");
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify.error("请检查网络，删除失败");
          return;
        })
    },
    batchFavorite() {
      docBatchFavorite(this.chosenDocs,this.$store.state.user.userID)
        .then(res => {
          if (res == 0) {
            this.$notify.success("批量收藏成功");
            this.$router.go(0);
          } else {
            this.$notify.error("请检查网络，收藏失败");
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify.error("请检查网络，收藏失败");
          return;
        })
    }
  },
  watch: {
    TeamID(){
      // console.log('TeamDoc',this.TeamID);
      // console.log(this.$store.state.user.userID);
      //this.$router.push({path: "/home/teamSpace?teamID=1"})
      if (this.chosenDocs.length != 0)
        this.$notify.info("批量操作已刷新")
      this.chosenDocs = []; //清除数据
      getTeamDocs(this.TeamID)
        .then(docs => {
          console.log('docs',docs);
          this.docs = docs;
        })
        .catch(err => {
          // console.log('wrong');
          this.$message.error("请检查网络 - 暂时还无法获取团队文档");
          return;
        })
    }
  },
}
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

.my-team-details{
  margin: auto;
  margin-top: 30px;
  height: 70vh;
  border-radius: 5px;
  border: 1px solid #eaf3fd;
  background-color: #ffffff;
  overflow: auto;
  margin-right: 30px;
}


.team-docs{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 15px;
  height: auto;
  background-color: white;
  border-radius: 5px;
}

.doc{
  width: 130px;
  height: 160px;
  margin: 10px;
  padding: 5px;
}

.doc--img{
  width: 80%;
  margin-left: 10%;
  margin-top: -10%;
}

.doc--name{
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
  background-color: #FAFBFC;
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

.opt{
  float: right;
  height: 10px;
  margin-top: 5px;
  margin-right: 10px;
}

</style>
