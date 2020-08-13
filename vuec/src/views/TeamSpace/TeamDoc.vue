<template>
  <div>
    <div class="my-team-details">
      <div class="team-docs">
        <div class="doc" v-for="(adoc,docIndex) in docs" :key="docIndex">
          <l-card :title="adoc.docTitle" :i-d="adoc.docId">
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

export default {
  name: "TeamDoc",
  data() {
    return {
      teamID: '',
      docs: '',
      docstyle: 0
    }
  },
  props: {
    TeamID: {
      type: String,
      require: true
    }
  },
  methods: {

  },
  watch: {
    TeamID(){
      // console.log('TeamDoc',this.TeamID);
      // console.log(this.$store.state.user.userID);
      //this.$router.push({path: "/home/teamSpace?teamID=1"})
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
</style>
