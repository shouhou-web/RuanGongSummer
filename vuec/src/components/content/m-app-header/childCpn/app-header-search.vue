<template>
  <div>
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="searchText"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="文档" value="文档"></el-option>
          <el-option label="团队" value="团队"></el-option>
        </el-select>
        <el-button
          @click="search"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <div class="nav-down">
        <div class="nav-down-header">搜索{{ select }}</div>
        <ul class="down-list" v-if="searchList.length > 0 && isSearch">
          <li
            class="down-wrapper"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <div class="down-header">
              <div class="down__name">
                {{ item.name }}
              </div>
              <div class="down__ID">ID:{{ item.id }}</div>
            </div>
            <my-button
              @click.stop="enter(item.id, item.name)"
              type="primary"
              size="small"
            >
              {{ option }}
            </my-button>
          </li>
        </ul>
        <div v-else-if="isSearch" class="no-answer">
          没有找到结果~
        </div>
      </div>
    </div>
    <m-hover
      @submit="submit"
      @cancel="close"
      :onShow="applyTeam"
      :width="400"
      title="申请加入团队"
      assureBtn="确定申请"
      cancelBtn="暂不申请"
      ><input
        class="hover-input"
        type="text"
        v-model="content"
        placeholder="申请理由"
      />
    </m-hover>
  </div>
</template>

<script>
import { searchTeam, searchDoc } from "network/search";
import { applyTeam } from "network/message";

export default {
  name: "appSearch",
  data() {
    return {
      ID: "",
      isSearch: false, // 是否展示搜索框
      select: "文档", // 选择的搜索子项目
      searchText: "", // 搜索内容
      searchList: [],
      option: "编辑文档", // 操作提示
      applyTeam: false, // 申请理由框
      content: "", // 申请理由
    };
  },
  watch: {
    select(newName, oldName) {
      console.log("option");
      this.searchList = [];
      this.isSearch = false;
      switch (newName) {
        case "团队":
          this.option = "申请加入";
          break;
        case "文档":
          this.option = "前往编辑";
          break;
      }
    },
  },
  methods: {
    search() {
      console.log(userID);
      let userID = this.$store.state.user.userID;
      let searchText = this.searchText;
      this.isSearch = true;
      if (this.select == "团队") {
        searchTeam(userID, searchText)
          .then((res) => {
            this.searchList = res;
          })
          .catch((err) => {
            console.log(err);
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
          });
      } else
        searchDoc(userID, searchText)
          .then((res) => {
            this.searchList = res;
          })
          .catch((err) => {
            console.log(err);
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
          });
    },
    enter(ID, title) {
      if (this.select == "团队") {
        this.ID = ID;
        this.applyTeam = true;
      } else {
        this.$router.push({
          path: "/doc",
          query: { docID: ID, docTitle: title },
        });
      }
    },
    submit() {
      let userID = this.$store.state.user.userID;
      console.log("ID", this.ID);
      applyTeam(userID, this.ID, this.content)
        .then((res) => {
          if (res == 0) {
            this.$notify({
              title: "申请提交成功",
              message: "请等待对方审核~",
              type: "success",
            });
            this.applyTeam = false;
          } else
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
        })
        .catch((err) => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    close() {
      this.applyTeam = false;
    },
  },
};
</script>

<style>
.el-input--suffix .el-input__inner {
  width: 80px;
}

.search {
  background-color: #fff;
  width: 315px;
  min-width: 315px;
}

.nav-down:hover,
.input-with-select:hover + .nav-down {
  display: block;
}

.nav-down {
  display: none;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-top-color: transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  width: 315px;
  z-index: 100;
}

.no-answer {
  text-align: center;
  color: #ccc;
  font-size: 12px;
}

.nav-down-header {
  border-bottom: 1px solid #ebebeb;
  font-size: 14px;
  text-align: center;
  padding: 5px 20px;
}

/* .nav-down-header:hover {
  background-color: #f7f7f7;
} */

.down-list {
  height: 450px;
}

.down-wrapper {
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.down-wrapper:hover {
  background-color: #f7f7f7;
}

.down__name {
  font-weight: bold;
  font-style: 14px;
  line-height: 20px;
}

.down__ID {
  color: #ccc;
  font-size: 12px;
}

.hover-input {
  border: 0px;
  color: #111;
  padding: 15px 20px;
  font-size: 15px;
  line-height: 1.5;
  width: 360px;
}

.hover-input:focus {
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
