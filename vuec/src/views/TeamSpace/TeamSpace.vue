<template>
  <div class="teamspace">
    <!--    <div class="teamspace-header">-->
    <!--      <img src="../../assets/image/Team.svg" style="margin-left: 3vh;padding-bottom: 1.5vh;padding-left: 1vh;margin-right: 10px">-->
    <!--      我的团队 | My Team-->
    <!--    </div>-->
    <div class="teamspace-header--father">
      <div class="my-teams-space">
        <div v-for="(ateam, teamIndex) in myTeams" :key="teamIndex">
          <div
            class="one-team"
            @click="chooseTeam(ateam.teamID, ateam.teamName)"
            :class="{ 'one-team_chosen': ateam.teamID == chosenPos }"
          >
            {{ ateam.teamName }}
          </div>
        </div>
      </div>

      <div class="opt">
        <div v-if="openMoreOpt" style="margin-right: 10px;">
          <m-nav-dropdown position="left" class="l-card__nav more-opt">
            <div slot="show">
              <div>
                <my-button size="medium" type="primary" style="padding: 5px;"
                  >批量操作</my-button
                >
              </div>
            </div>
            <div
              slot="hide"
              style="
                border: 1px solid #e7e7e7;
                border-radius: 5px;
                background-color: white;
              "
            >
              <div class="l-card__hide-main">
                <my-button
                  type="text-danger"
                  size="medium"
                  class="l-card__nav-btn"
                  @click="useBatchDelete"
                  >删除{{ chosenCount }}个文档</my-button
                >
              </div>
            </div>
            <input />
          </m-nav-dropdown>
        </div>
        <m-nav-dropdown triColor="#DCDFE6" position="left" class="l-card__nav">
          <div slot="show">
            <img class="l-card__setting" src="@/assets/image/teamopt.svg" />
          </div>
          <div
            slot="hide"
            v-if="chosenPos != -1"
            style="
              border: 1px solid #ececec;
              border-radius: 5px;
              background-color: white;
            "
          >
            <div class="l-card__hide-main">
              <my-button
                type="text-danger"
                class="l-card__nav-btn"
                @click="readyToQuit"
                v-if="iden != 2"
                >退出团队</my-button
              >
              <my-button
                type="text-danger"
                class="l-card__nav-btn"
                @click="readyToDisband"
                v-if="iden == 2"
                >解散团队</my-button
              >
              <my-button
                type="text"
                class="l-card__nav-btn"
                @click="readyToCooperate"
                >协作权限</my-button
              >
              <my-button
                type="text"
                class="l-card__nav-btn"
                @click="readyTosearch_0"
                >搜索并邀请</my-button
              >
              <my-button
                type="text"
                class="l-card__nav-btn"
                @click="readyTosearch_1"
                >搜索团队成员</my-button
              >
              <my-button
                type="text"
                class="l-card__nav-btn"
                @click="readyReNameTeam"
                v-if="this.$store.state.user.userID == this.teamCreatorID"
              >团队重命名</my-button
              >
            </div>
          </div>
          <input />
        </m-nav-dropdown>
        <img
          src="@/assets/icon/home/block.svg"
          class="icon-style"
          @click="toBlock"
        />
        <img
          src="@/assets/icon/home/list.svg"
          class="icon-style"
          @click="toList"
        />
      </div>
    </div>
    <!--    <div class="member-iden" :class="{'member-iden&#45;&#45;member':(iden == 0),'member-iden&#45;&#45;manager':(iden == 1),'member-iden&#45;&#45;creater':(iden == 2)}">-->
    <!--      {{iden_message}}-->
    <!--    </div>-->

    <!-- 悬浮窗 -->
    <m-hover
      :on-show="isQuit"
      title="是否确定要退出该团队"
      assure-btn="确定"
      cancel-btn="手滑了"
      @submit="toQuitTeam"
      @cancel="cancelQuit"
    >
      <div style="font-family: 'JetBrains Mono'; margin: 20px;">
        注意：退出该团体后，将无法参与团体文档的编写和查看
      </div>
    </m-hover>
    <m-hover
      :on-show="isDisband"
      title="是否确定要解散该团队"
      assure-btn="确定"
      cancel-btn="手滑了"
      @submit="toDisbandTeam"
      @cancel="cancelDisband"
    >
      <div style="font-family: 'JetBrains Mono'; margin: 20px;">
        注意：解散该团体后，所有团队文件将彻底销毁
      </div>
    </m-hover>
    <m-hover
      :on-show="openCooperation"
      :title="'团队协作:' + TeamName"
      cancel-btn="X"
      @cancel="cancelCooperate"
      style="font-family: 'JetBrains Mono';"
    >
      <div class="member-header">
        <div class="member-name-header">团队组员</div>
      </div>
      <div class="cooperation-member">
        <div
          class="member-header"
          v-for="(member, memberIndex) in members"
          :key="memberIndex"
        >
          <div>
            <img :src="member.imagePath" class="user-img" @click="toUserProfile(member.userID)"/>
          </div>
          <div class="member-name-main">{{ member.userName }}</div>
          <div class="member-email-main">{{ member.emailAddress }}</div>
          <div class="member-iden-main">
            <div v-if="member.userIdentity == 1">
              <my-button size="mini" type="success">管理员</my-button>
            </div>
            <div v-if="member.userIdentity == 2">
              <my-button size="mini" type="primary">创建人</my-button>
            </div>
            <my-button
              size="small"
              type="text"
              v-if="(member.userIdentity == 0) && (iden == 2)"
              @click="setUserIden(member.userID, TeamID, 1)"
            >
              +加入管理员
            </my-button>
          </div>
        </div>
      </div>
      <div class="member-header">
        <div class="member-name-header">管理员</div>
      </div>
      <div class="cooperation-admin">
        <div
          class="member-header"
          v-for="(member, memberIndex) in members"
          v-if="member.userIdentity > 0"
          :key="memberIndex"
        >
          <div>
            <img :src="member.imagePath" class="user-img" @click="toUserProfile(member.userID)"/>
          </div>
          <div class="member-name-main">{{ member.userName }}</div>
          <div class="member-email-main">{{ member.emailAddress }}</div>
          <div class="member-iden-main" v-if="member.userIdentity > 0">
            <div v-if="member.userIdentity == 1">
              <my-button size="mini" type="success">管理员</my-button>
            </div>
            <div v-if="member.userIdentity == 2">
              <my-button size="mini" type="primary">创建人</my-button>
            </div>
            <my-button
              size="mini"
              type="text-danger"
              v-if="(member.userIdentity == 1) && (iden == 2)"
              @click="setUserIden(member.userID, TeamID, 0)"
              style="margin-left: 5px;"
            >
              - 取消管理权限</my-button
            >
          </div>
        </div>
      </div>
    </m-hover>
    <m-hover
      :on-show="openSearch"
      :title="searchTitle"
      cancel-btn="X"
      @cancel="cancelSearch"
    >
      <div class="userSearch">
        <div>
          <!-- 0-邀请 1-查找-->
          <input
            class="cooperation-search"
            v-model="searchOutsideMsg"
            placeholder="输入用户名称/邮箱"
            v-if="searchType == 0"
            style="padding-left: 5px;"
          />
          <input
            class="cooperation-search"
            v-model="searchMemberMsg"
            placeholder="输入用户名称/邮箱"
            v-if="searchType == 1"
            style="padding-left: 5px;"
          />
        </div>

        <div class="member-header">
          <div class="member-name-header">搜索结果</div>
        </div>
        <div class="userRes">
          <!--TODO:添加分类-->
          <div
            class="member-header"
            v-for="(userRes, resIndex) in searchOutRes"
            :key="resIndex"
            v-if="searchType == 0"
          >
            <div>
              <img :src="userRes.imagePath" class="user-img" @click="toUserProfile(userRes.userID)"/>
            </div>
            <div class="member-name-main">{{ userRes.userName }}</div>
            <div class="member-email-main">{{ userRes.emailAddress }}</div>
            <my-button
              type="info"
              size="mini"
              style="height: 25px; margin-left: 10px;"
              @click="inviteMemberToTeam(userRes.userID)"
              >邀请</my-button
            >
          </div>
          <div
            class="member-header"
            v-for="(userRes, resIndex) in searchRes"
            :key="resIndex"
            v-if="searchType == 1"
          >
            <div>
              <img :src="userRes.imagePath" class="user-img" @click="toUserProfile(userRes.userID)"/>
            </div>
            <div class="member-name-main">{{ userRes.userName }}</div>
            <div class="member-email-main">{{ userRes.emailAddress }}</div>
            <div class="member-iden-main">
              <div v-if="userRes.userIdentity == 1">
                <my-button size="mini" type="success">管理员</my-button>
              </div>
              <div v-if="userRes.userIdentity == 2">
                <my-button size="mini" type="primary">创建人</my-button>
              </div>
              <my-button
                size="mini"
                type="text-danger"
                v-if="userRes.userIdentity == 1"
                @click="setUserIden(userRes.userID, TeamID, 0)"
                style="margin-left: 5px;"
                >- 取消管理权限</my-button
              >
              <my-button
                size="mini"
                type="text"
                v-if="userRes.userIdentity == 0"
                @click="setUserIden(userRes.userID, TeamID, 1)"
                >+ 添加管理权限</my-button
              >
            </div>
          </div>
        </div>
      </div>
    </m-hover>
    <m-hover :on-show="openReNameTeam"
             title="团队重命名"
             cancel-btn="取消"
             assure-btn="确定"
             @cancel="closeReNameTeam"
             @submit="reNameTeam">
      <div>
        <input
          class="cooperation-search"
          v-model="teamName"
          placeholder="输入新团队名称"
          style="padding-left: 5px;"
        />
      </div>
    </m-hover>

    <div style="margin: 20px;">
      <transition mode="out-in">
        <TeamDoc
          v-bind:TeamID="TeamID"
          class="fade-in"
          :align-style="listOrBlock"
          :iden="iden"
          @chosen-change="changeMoreOpt"
          ref="teamdoc"
        >
        </TeamDoc>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  disbandTeam,
  getMyTeam,
  getTeamDocs,
  getUserIdentity,
  quitTeam,
  setAdmin,
  getTeamMembers,
  setTeamName
} from "@/network/team";
import { searchOutsideUser, searchTeamMember } from "@/network/search";
import TeamDoc from "@/views/TeamSpace/TeamDoc";
import LButton from "@/components/common/l-app-button/MyButton";
import { inviteMember } from "@/network/message";

export default {
  name: "TeamSpace",
  data() {
    return {
      user: "",
      TeamID: "",
      TeamName: "",
      myTeams: "",
      members: "", // 团队成员
      iden: 0, // 默认成员
      chosenPos: -1,
      iden_message: "普通成员",
      isQuit: false,
      isDisband: false,
      openCooperation: false,
      searchMemberMsg: "",
      searchOutsideMsg: "",
      searchRes: "",
      searchOutRes: "",
      showRes: false,
      openSearch: false,
      searchType: 0, //0 搜非团队成员，1 搜团队成员
      searchTitle: "",
      listOrBlock: true,
      openMoreOpt: false,
      chosenCount: 0,
      teamName: '',
      openReNameTeam: false,
      teamCreatorID: ''
    };
  },
  components: {
    LButton,
    TeamDoc: TeamDoc,
  },
  methods: {
    useBatchDelete() {
      this.$refs.teamdoc.batchDelete();
    },
    changeMoreOpt(data) {
      console.log("子传父", data);
      this.chosenCount = data;
      if (data > 0) {
        this.openMoreOpt = true;
      } else {
        this.openMoreOpt = false;
      }
    },
    toBlock() {
      this.listOrBlock = true;
    },
    toList() {
      this.listOrBlock = false;
    },
    chooseTeam(teamID, teamName) {
      // console.log('TeamSpace',teamID);
      this.TeamID = teamID;
      this.TeamName = teamName;
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
      // console.log(this.$store.state.user.userID);
      // console.log(this.TeamID);

      quitTeam(this.$store.state.user.userID, this.TeamID)
        .then((res) => {
          // console.log(res);
          if (res == 0) {
            this.$notify.success("退出团体成功");
            this.getMyTeamInPage();
            this.isQuit = false;
          } else {
            this.$notify.error("网络出现问题，无法退出，请检查网络情况");
            this.isQuit = false;
          }
        })
        .catch((err) => {
          this.$notify.error("网络出现问题，无法退出，请检查网络情况");
          this.isQuit = false;
          return;
        });
    },
    readyToDisband() {
      this.isDisband = true;
    },
    cancelDisband() {
      this.isDisband = false;
    },
    toDisbandTeam() {
      // console.log(this.$store.state.user.userID);
      // console.log(this.TeamID);

      disbandTeam(this.TeamID)
        .then((res) => {
          // console.log(res);
          if (res == 0) {
            this.$notify.success("解散团体成功");
            this.getMyTeamInPage();
            this.isDisband = false;
            this.$router.go(0);
          } else {
            this.$notify.error("网络出现问题，无法解散，请检查网络情况");
            this.isDisband = false;
          }
        })
        .catch((err) => {
          this.$notify.error("网络出现问题，无法解散，请检查网络情况");
          this.isDisband = false;
          return;
        });
    },
    readyToCooperate() {
      this.openCooperation = true;
    },
    cancelCooperate() {
      this.openCooperation = false;
    },
    setUserIden(userID, teamID, userIden) {
      console.log("userID", userID);
      console.log("teamID", teamID);
      console.log("userIden", userIden);

      setAdmin(userID, teamID, userIden)
        .then((res) => {
          if (res == 0) {
            this.$notify.success("权限已修改");
            getTeamMembers(teamID).then((res) => {
              console.log(res);
              this.members = res;
            });
          } else {
            this.$notify.error("出现错误，请检查网络，权限修改失败");
          }
        })
        .catch((err) => {
          this.$notify.error("出现错误，请检查网络，权限修改失败");
        });
    },
    readyTosearch_0() {
      this.openSearch = true;
      this.searchType = 0;
      this.searchTitle = "搜索/邀请用户";
    },
    readyTosearch_1() {
      this.openSearch = true;
      this.searchType = 1;
      this.searchTitle = "搜索团队成员";
    },
    cancelSearch() {
      this.openSearch = false;
    },
    inviteMemberToTeam(targetUserID) {
      var msg = this.$store.state.user.userName + "邀请你加入" + this.TeamName;
      inviteMember(
        this.$store.state.user.userID,
        this.TeamID,
        targetUserID,
        msg
      )
        .then((res) => {
          if (res == 0) {
            this.$notify.success("邀请已发送");
          } else {
            this.$notify.error("请检查网络情况，邀请发送失败");
          }
        })
        .catch((err) => {
          this.$notify.error("请检查网络情况，邀请发送失败");
        });
    },
    getMyTeamInPage() {
      getMyTeam(this.$store.state.user.userID)
        .then((res) => {
          // console.log(res);
          this.myTeams = res;
          // this.chosenPos = 0;
          console.log(this.myTeams);
          console.log(this.myTeams.length);
          // this.chosenPos = res[0].teamID;
          if (this.myTeams.length == 0) this.$store.commit("setHasTeam", false);
          else {
            this.$store.commit("setHasTeam", true);
            // this.chosenPos = res[0].teamID;
            this.chooseTeam(res[0].teamID, res[0].teamName);
          }
        })
        .catch((err) => {
          this.$message.error("请检查网络 - 暂时无法获取你的团队");
        });
    },
    toUserProfile(userID) {
      this.$router.push({ path: '/profile', query: { userID } });
    },
    readyReNameTeam() {
      this.openReNameTeam = true;
    },
    closeReNameTeam() {
      this.openReNameTeam = false;
    },
    reNameTeam() {
      setTeamName(this.TeamID,this.teamName)
        .then(res => {
          if (res == 0) {
            this.$message.success('团队名称修改成功');
            this.openReNameTeam = false;
            this.teamName = '';
            getMyTeam(this.user.userID)
              .then((res) => {
                // console.log(res);
                this.myTeams = res;
                // this.chosenPos = 0;
                console.log(this.myTeams);
                console.log(this.myTeams.length);
                // this.chosenPos = res[0].teamID;
                if (this.myTeams.length == 0) this.$store.commit("setHasTeam", false);
                else {
                  this.$store.commit("setHasTeam", true);
                  // this.chosenPos = res[0].teamID;
                  this.chooseTeam(res[0].teamID, res[0].teamName);
                  this.teamCreatorID = res[0].creatorID;
                }
              })
              .catch((err) => {
                this.$message.error("请检查网络 - 暂时无法获取你的团队");
              });
          }
          else {
            this.$message.error('团队名称修改失败，请检查网络');
          }
        })
    }
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      // this.$router.push({path: '/login?page=0'})
      return;
    }

    getMyTeam(this.user.userID)
      .then((res) => {
        // console.log(res);
        this.myTeams = res;
        // this.chosenPos = 0;
        console.log(this.myTeams);
        console.log(this.myTeams.length);
        // this.chosenPos = res[0].teamID;
        if (this.myTeams.length == 0) this.$store.commit("setHasTeam", false);
        else {
          this.$store.commit("setHasTeam", true);
          // this.chosenPos = res[0].teamID;
          this.chooseTeam(res[0].teamID, res[0].teamName);
          this.teamCreatorID = res[0].creatorID;
        }
      })
      .catch((err) => {
        this.$message.error("请检查网络 - 暂时无法获取你的团队");
      });
  },
  watch: {
    TeamID() {
      this.searchOutsideMsg = "";
      this.searchMemberMsg = "";
      //0成员，1管理者，2创建者
      getUserIdentity(this.$store.state.user.userID, this.TeamID)
        .then((res) => {
          // console.log('Iden',res);
          this.iden = res;
          if (res == 0) {
            this.iden = 0;
            this.iden_message = "普通成员";
            this.teamCreatorID = '';
          } else if (res == 1) {
            this.iden = 1;
            this.iden_message = "管理员";
            this.teamCreatorID = '';
          } else {
            this.iden = 2;
            this.iden_message = "创建者";
            this.teamCreatorID = this.$store.state.user.userID;
          }
        })
        .catch((err) => {
          this.$notify({
            title: "获取失败",
            message: "权限获取失败，请检查网络",
            type: "error",
          });
          return;
        });

      getTeamMembers(this.TeamID).then((res) => {
        console.log(res);
        this.members = res;
      });

      this.$store.commit("setTeamID", this.TeamID);

      searchTeamMember(this.TeamID, this.searchMemberMsg)
        .then((res) => {
          console.log("member", res);
          this.searchRes = res;
        })
        .catch((err) => {
          this.$notify.error("请检查网络，查找失败");
        });
    },
    searchMemberMsg() {
      searchTeamMember(this.TeamID, this.searchMemberMsg)
        .then((res) => {
          console.log("member", res);
          this.searchRes = res;
        })
        .catch((err) => {
          this.$notify.error("请检查网络，查找失败");
        });
    },
    searchOutsideMsg() {
      searchOutsideUser(this.TeamID, this.searchOutsideMsg)
        .then((res) => {
          console.log("outside", res);
          this.searchOutRes = res;
        })
        .catch((err) => {
          this.$notify.error("请检查网络，查找失败");
        });
    },
  },
};
</script>

<style scoped>
.teamspace-header--father {
  align-items: center;
  display: flex;
  margin: 10px 20px;
  padding: 10px 0;
}

.teamspace-header {
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
  box-shadow: 2px 2px 5px #838282;
}

.my-teams-space {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  width: 90%;
  border-radius: 5px;
  border-bottom-left-radius: 5px;
}

.one-team {
  border-radius: 5px;
  color: #60a5dd;
  width: auto;
  height: auto;
  font-size: 17px;
  padding: 7px 20px;
  margin-left: 10px;
  margin-right: 5px;
  margin-top: 0px;
}

.one-team:hover {
  cursor: pointer;
  color: #4a4a4c;
  border-color: #c6e2ff;
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.one-team_chosen {
  color: #4a4a4c;
  border-color: #c6e2ff;
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.member-iden {
  border: 1px solid #dedede;
  border-radius: 5px;
  margin-top: 30px;
  margin-left: 5px;
  width: 100px;
  height: 40px;
  box-shadow: 2px 2px 5px #b5b5b5;
  padding-top: 10px;
  padding-left: 15px;
}

.member-iden--member {
  background-color: #fafafa;
}

.member-iden--manager {
  padding-left: 20px;
  background-color: #eefdd6;
  border: 1px solid #acfaac;
}

.member-iden--creater {
  padding-left: 20px;
  background-color: #d9f6f6;
  border: 1px solid #85ddfa;
}

.my-team-details {
  margin: 5px;
  margin-top: 30px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #a1c4fd;
  background-color: #ffffff;
}

.team-tools {
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

.team-docs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 15px;
  height: auto;
  background-color: white;
  border-radius: 5px;
}

.doc {
  width: 130px;
  height: 160px;
  margin: 10px;
  padding: 5px;
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
  font-size: 12px;
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: 0.5s;
}

.v-enter-to {
  opacity: 1;
}

.v-leave {
  opacity: 1;
}

.v-leave-to {
  opacity: 1;
}

.v-leave-active {
  transition: 0.3s;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s;
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
  margin-right: 10px;
  margin-top: 2px;
}

.l-card__setting {
  height: 16px;
  width: 16px;
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

.opt {
  display: flex;
  flex-direction: row;
}

.cooperation-member {
  border: 1px solid #cce6ff;
  width: 100vh;
  height: 25vh;
  overflow: auto;
  margin-bottom: 5px;
  border-radius: 5px;
}

.cooperation-admin {
  border: 1px solid #cce6ff;
  width: 100vh;
  height: 25vh;
  overflow: auto;
  border-radius: 5px;
}

.cooperation-search {
  border: 1px solid #cce6ff;
  display: flex;
  margin: 10px auto;
  height: 30px;
  border-radius: 5px;
  width: fit-content;
}

.member-header {
  display: flex;
  flex-direction: row;
  height: 35px;
}

.member-name-header {
  text-align: center;
  width: 25%;
  color: #409eff;
  background-color: #cce6ff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-top: 8px;
}

.member-email-header {
  text-align: center;
  width: 55%;
  background-color: #e2e2e2;
  padding-top: 8px;
}

.member-iden-header {
  text-align: center;
  width: 10%;
  background-color: #e2e2e2;
  padding-top: 8px;
}

.member-name-main {
  padding-left: 10px;
  width: 25%;
  padding-top: 8px;
}

.member-email-main {
  padding-left: 10px;
  width: 45%;
  padding-top: 8px;
}

.member-iden-main {
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  width: 20%;
  padding-top: 8px;
}

.check {
  margin-top: 3px;
}

.userSearch {
  width: 100vh;
  height: 50vh;
  overflow: auto;
}

.userRes {
  width: 100%;
  height: 80%;
  margin: auto;
  overflow: auto;
  border-radius: 5px;
  border: 1px solid #cce6ff;
  padding-top: 10px;
}

.user-img {
  width: 30px;
  border: 1px solid #a8d8ee;
  border-radius: 50%;
  margin-left: 10px;
  margin-top: 3px;
  cursor: pointer;
}
input::-ms-input-placeholder {
  text-align: center;
}
input::-webkit-input-placeholder {
  text-align: center;
}

.icon-style {
  margin-right: 10px;
  cursor: pointer;
}
</style>
