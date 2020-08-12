<template>
  <div>
    <div class="my-team-details">
      <div style="margin-top: 10px;margin-left: 10px">
        <my-button size="small" style="margin-right: 10px">新建doc</my-button>
        <my-button size="small">退出团队</my-button>
      </div>
      <div class="team-docs">
        <div class="doc" v-for="(adoc,docIndex) in docs" :key="docIndex">
          <input type="checkbox"></input>
          <div><img src="../../assets/image/file.svg" class="doc--img"></div>
          <div class="doc--name">{{adoc.docID}}:{{adoc.docName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTeamDocs} from "@/network/team";

export default {
  name: "TeamDoc",
  data() {
    return {
      teamID: '',
      docs: '',
    }
  },
  props: {
    TeamID: {
      type: Number,
      require: true
    }
  },
  methods: {

  },
  created() {
    console.log(this.TeamID);
    getTeamDocs(this.TeamID)
      .then(docs => {
        console.log(docs);
        this.docs = docs;
      })
      .catch(err => {
        this.$message.error("请检查网络 - 暂时还无法获取团队文档")
      })
  },
}
</script>

<style scoped>
.teamspace{
  height: 100vh;
  border-left: 2px solid #a1c4fd;
  padding-left: 30px;
}

.teamspace-header{
  display: flex;
  flex-direction: row;
  margin: 5px;
  height: 6vh;
  width: 45vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 5px;
  background-color: #a1c4fd;
  font-size: 20px;
  padding-top: 1.5vh;
  text-align: center;
  color: white;
  font-family: "JetBrains Mono";
  box-shadow:2px 2px 5px #838282;
}

.my-teams-space{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px;
  height: auto;
  width: 90vh;
  border-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: white;
  margin-top: 1.5vh;
  box-shadow:2px 2px 5px #838282;
}

.one-team{
  margin: 1vh;
  padding: 8px;
  border: 2px solid #a1c4fd;
  background-color: white;
  border-radius: 5px;
  color: #000000;
  width: auto;
  height: auto;
  font-family: "JetBrains Mono";
  font-size: 13px;
  box-shadow:2px 2px 5px #d7d7d7;
}

.one-team_chosen{
  background-color: #c8dbfa;
}

.my-team-details{
  margin: 5px;
  margin-top: 30px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #a1c4fd;
  background-color: #ffffff;
}

.team-tools{
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: 30vh;
  height: 6vh;
  border-radius: 5px;
  justify-content: space-around;
  background-color: #ffffff;
  padding-top: 2px;
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
