<template>
  <div>
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="searchText"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户" value="用户"></el-option>
          <el-option label="团队" value="团队"></el-option>
          <el-option label="文档" value="文档"></el-option>
        </el-select>
        <!-- <el-button
          @click="search"
          slot="append"
          icon="el-icon-search"
        ></el-button> -->
      </el-input>
      <div class="nav-down">
        <div @click="search" class="nav-down-header">搜索{{ select }}</div>
        <ul v-if="searchList.length > 0">
          <li
            class="down-wrapper"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <div class="down-header">
              <div class="down__name">
                {{ item.name }}
              </div>
              <div class="down__ID">
                {{ item.ID }}
              </div>
            </div>
            <my-button @click.stop="enter(item.ID)" type="primary" size="small">
              {{ option }}
            </my-button>
          </li>
        </ul>
        <div class="no-answer" v-else>
          没有找到结果~
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchAll } from "network/search";
export default {
  name: "appSearch",
  data() {
    return {
      select: "用户", // 选择的搜索子项目
      searchText: "", // 搜索内容
      searchList: []
    };
  },
  computed: {
    option() {
      console.log(this.select);
      switch (this.select) {
        case "用户":
          return "邀请用户";
        case "团队":
          return "申请加入";
        case "文档":
          return "前往编辑";
      }
    },
    type() {
      switch (this.select) {
        case "用户":
          return "user";
        case "团队":
          return "team";
        case "文档":
          return "doc";
      }
    }
  },
  methods: {
    search() {
      console.log(this.type, this.searchText);
      searchAll(this.type, this.searchText)
        .then(res => {
          this.searchList = res;
        })
        .catch(err => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~"
          });
        });
    },
    enter(ID) {
      
    }
  }
};
</script>

<style>
.el-input--suffix .el-input__inner {
  width: 90px;
}

.search {
  background-color: #fff;
  width: 315px;
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
  height: 410px;
  z-index: 100;
}

.no-answer {
  text-align: center;
  color: #ccc;
  font-size: 12px;
}

.nav-down-header {
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  padding: 5px 20px;
}

.nav-down-header:hover {
  background-color: #f7f7f7;
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
</style>
