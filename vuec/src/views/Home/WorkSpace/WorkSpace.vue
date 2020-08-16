<template>
  <div>
    <div class="second-nav-list">
      <my-button
        type="text"
        class="second-nav-item"
        :active="this.$store.state.homeMidNav === 1"
        @click="toRecent"
        >最近使用</my-button
      >
      <my-button
        type="text"
        class="second-nav-item"
        :active="this.$store.state.homeMidNav === 2"
        @click="toIMade"
        >我的创建</my-button
      >
      <my-button
        type="text"
        class="second-nav-item"
        :active="this.$store.state.homeMidNav === 3"
        @click="toMyColletion"
        >我的收藏</my-button
      >
      <div class="align-icon-outer">
        <div class="align-icon-inner">
          <m-nav-dropdown v-if="showMoreOrNot" triColor="#DCDFE6">
            <div slot="show">
              <img src="@/assets/icon/home/more.svg" class="align-icon" />
            </div>
            <div slot="hide" class="batch-nav">
              <my-button
                type="text-danger"
                class="nav-btn"
                @click="callBatchDelete"
                >批量删除</my-button
              >
              <my-button
                v-if="this.$route.path === '/home/workSpace/myCollection'"
                type="text-danger"
                class="nav-btn"
                @click="callBatchCancelCollect"
                >批量取消收藏</my-button
              >
            </div>
          </m-nav-dropdown>
          <img
            src="@/assets/icon/home/block.svg"
            class="align-icon"
            @click="toBlock"
          />
          <img
            src="@/assets/icon/home/list.svg"
            class="align-icon"
            @click="toList"
          />
        </div>
      </div>
    </div>
    <div class="second-nav-main">
      <transition mode="out-in">
        <router-view
          ref="mychild"
          :alignStyle="listOrBlock"
          @showMore="show"
          @hideMore="hide"
        ></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkSpace",
  data() {
    return {
      listOrBlock: true,
      showMoreOrNot: false
    };
  },
  methods: {
    show() {
      this.showMoreOrNot = true;
    },
    hide() {
      this.showMoreOrNot = false;
    },
    toBlock() {
      this.listOrBlock = true;
    },
    toList() {
      this.listOrBlock = false;
    },
    toRecent() {
      this.$router.push({ path: "/home/workSpace/recent" });
    },
    toIMade() {
      this.$router.push({ path: "/home/workSpace/iMade" });
    },
    toMyColletion() {
      this.$router.push({ path: "/home/workSpace/myCollection" });
    },
    callBatchDelete() {
      this.$refs.mychild.batchDelete();
    },
    callBatchCancelCollect() {
      this.$refs.mychild.cancelBatchDoc();
    }
  },
  components: {},
  created() {
    this.$store.state.hasTeam = false;
    this.$store.state.nowTeamID = -1;
  }
};
</script>

<style scoped>
second-whole-page {
  display: flex;
  flex-direction: column;
}

.second-nav-list {
  /* background-color: #fff;
  box-shadow: var(--box-shadow); */
  align-items: center;
  border-radius: 12px;
  display: flex;
  margin: 10px 20px;
  padding: 10px 0;
}

.second-nav-item {
  font-size: 17px;
  padding: 7px 20px;
  margin-left: 15px;
}

.second-nav-main {
  /* background-color: #fff;
  box-shadow: var(--box-shadow);
  border-radius: 12px; */
  overflow: auto;
  height: 80vh;
  margin: 20px;
}

.align-icon-outer {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.align-icon-inner {
  align-items: center;
  display: flex;
}

.align-icon {
  cursor: pointer;
  margin-right: 2px;
  margin-left: 2px;
  width: 20px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.batch-nav {
  align-items: center;
  background-color: #fafbfc;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 5px 8px;
}

.nav-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 10px 35px;
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
  opacity: 0;
}
.v-leave-active {
  transition: 0.3s;
}
</style>
