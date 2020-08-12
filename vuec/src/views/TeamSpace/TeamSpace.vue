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
    <div class="member-iden" :class="{'member-iden--member':(iden == 0),'member-iden--manager':(iden == 1),'member-iden--creater':(iden == 2)}">
      {{iden_message}}
    </div>
    <div style="margin-top: 10px;margin-left: 5px" v-if="iden != 2">
      <my-button size="small"
                 style="margin-right: 10px;margin-top: 10px"
                 @click="readyToQuit">退出团队</my-button>
    </div>
    <div style="margin-top: 10px;margin-left: 5px" v-if="iden == 2">
      <my-button size="small"
                 style="margin-right: 10px;margin-top: 10px"
                 @click="readyToDisband">解散团队</my-button>
    </div>

    <!-- 悬浮窗 -->
    <m-hover :on-show="isQuit"
             title="是否确定要退出该团队"
             assure-btn="确定"
             cancel-btn="手滑了"
             @submit="toQuitTeam"
             @cancel="cancelQuit">
      <div style="font-family: 'JetBrains Mono';margin: 20px">
        注意：退出该团体后，将无法参与团体文档的编写和查看
      </div>
    </m-hover>
    <m-hover :on-show="isDisband"
             title="是否确定要解散该团队"
             assure-btn="确定"
             cancel-btn="手滑了"
             @submit="toDisbandTeam"
             @cancel="cancelDisband">
      <div style="font-family: 'JetBrains Mono';margin: 20px">
        注意：解散该团体后，所有团队文件将彻底销毁
      </div>
    </m-hover>

    <div>
      <transition mode="out-in">
        <TeamDoc v-bind:TeamID="TeamID" class="fade-in"></TeamDoc>
      </transition>
    </div>
  </div>
</template>

<script>
import {disbandTeam, getMyTeam, getTeamDocs, getUserIdentity, quitTeam} from "../../network/team.js";
import TeamDoc from "@/views/TeamSpace/TeamDoc";

export default {
  name: 'TeamSpace',
  data() {
    return {
      user: '',
      TeamID: '',
      myTeams: '',
      iden: 0,// 默认成员
      chosenPos: -1,
      iden_message: '普通成员',
      isQuit: false,
      isDisband: false
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
    },
    readyToQuit() {
      this.isQuit = true;
    },
    cancelQuit() {
      this.isQuit = false;
    },
    toQuitTeam() {
      console.log(this.$store.state.user.userID);
      console.log(this.TeamID);

      quitTeam(this.$store.state.user.userID,this.TeamID)
        .then(res => {
          console.log(res);
          if (res == 0){
            this.$notify.success("退出团体成功");
            this.$router.push({path: "/home/teamSpace"});
            this.isQuit = false;
          }else {
            this.$notify.error("网络出现问题，无法退出，请检查网络情况")
            this.isQuit = false;
          }
        })
    },
    readyToDisband() {
      this.isDisband = true;
    },
    cancelDisband() {
      this.isDisband = false;
    },
    toDisbandTeam() {
      console.log(this.$store.state.user.userID);
      console.log(this.TeamID);

      disbandTeam(this.TeamID)
        .then(res => {
          console.log(res);
          if (res == 0){
            this.$notify.success("解散团体成功");
            this.$router.push({path: "/home/teamSpace"});
            this.isDisband = false;
          }else {
            this.$notify.error("网络出现问题，无法解散，请检查网络情况")
            this.isDisband = false;
          }
        })
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
          if (res == 0){
            this.iden = 0;
            this.iden_message = '普通成员';
          }else if (res == 1){
            this.iden = 1;
            this.iden_message = '管理员';
          }else{
            this.iden = 2;
            this.iden_message = '创建者';
          }
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
  border: 1px solid #dedede;
  border-radius: 5px;
  margin-top: 30px;
  margin-left: 5px;
  width: 100px;
  height: 40px;
  font-family: "JetBrains Mono";
  box-shadow:2px 2px 5px #b5b5b5;
  padding-top: 10px;
  padding-left: 15px;
}

.member-iden--member{
  background-color: #fafafa;
}

.member-iden--manager{
  padding-left: 20px;
  background-color: #eefdd6;
  border: 1px solid #acfaac;
}

.member-iden--creater{
  padding-left: 20px;
  background-color: #d9f6f6;
  border: 1px solid #85ddfa;
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
