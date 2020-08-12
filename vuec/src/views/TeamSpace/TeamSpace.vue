<template>
  <div class="teamspace">
    <div class="teamspace-header">
      <img src="../../assets/image/Team.svg" style="margin-left: 3vh;padding-bottom: 1.5vh;padding-left: 1vh;margin-right: 10px">
      我的团队 | My Team
    </div>
    <div class="my-teams-space">
      <div v-for="(ateam,teamIndex) in myTeams" :key="teamIndex">
        <div class="one-team" @click="chooseTeam(ateam.teamID)" :class="{'one-team_chosen': (ateam.teamID == chosenPos)}">
          {{ateam.teamName}}
        </div>
      </div>
    </div>
    <div class="member-iden">

    </div>
    <div>
      <transition mode="out-in">
        <TeamDoc v-bind:TeamID="TeamID" class="fade-in"></TeamDoc>
      </transition>
    </div>
  </div>
</template>

<script>
import {getMyTeam, getTeamDocs, getUserIdentity} from "../../network/team.js";
import TeamDoc from "@/views/TeamSpace/TeamDoc";

export default {
  name: 'TeamSpace',
  data() {
    return {
      user: '',
      TeamID: '',
      myTeams: '',
      iden: 0,// 默认成员
      chosenPos: -1
    }
  },
  components: {
    'TeamDoc': TeamDoc
  },
  methods: {
    chooseTeam(teamID) {
      console.log('TeamSpace',teamID);
      this.TeamID = teamID;
      this.chosenPos = teamID;
      // this.$router.push({path: '/home/teamSpace/teamDoc?TeamID=' + teamID})
    }
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID){
      this.$message.error('请先登录');
      // this.$router.push({path: '/login?page=0'})
      return;
    }

    getMyTeam(this.user.userID)
      .then(res => {
        // console.log(res);
        this.myTeams = res
      })
      .catch(err => {
        this.$message.error("请检查网络 - 暂时无法获取你的团队")
      })
  },
  watch: {
    TeamID() {
      //0成员，1管理者，2创建者
      getUserIdentity(this.$store.state.user.userID,this.TeamID)
        .then(res => {
          console.log('Iden',res);
          this.iden = res;
        })
        .catch(err => {
          this.$notify(
            {
              title: "获取失败",
              message: "权限获取失败，请检查网络",
              type: "error"
            }
          );
          return;
        })
    }
  }
};
</script>

<style scoped>
.teamspace{
  height: 100%;
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
  box-shadow:2px 2px 5px #a5a5a5;
}

.one-team{
  margin: 1vh;
  padding: 8px;
  border: 1px solid #a1c4fd;
  background-color: white;
  border-radius: 5px;
  color: #000000;
  width: auto;
  height: auto;
  font-family: "JetBrains Mono";
  font-size: 13px;
}

.one-team:hover{
  cursor: pointer;
}

.one-team_chosen{
  box-shadow:2px 2px 5px #b5b5b5;
  background-color: #dee9fc;
}

.member-iden{
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

.v-enter{
  opacity: 0;
}

.v-enter-active{
  transition: 0.5s;
}

.v-enter-to{
  opacity: 1;
}

.v-leave{
  opacity: 1;
}

.v-leave-to{
  opacity: 1;
}

.v-leave-active{
  transition: 0.3s;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s;
}
</style>
