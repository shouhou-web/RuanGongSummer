<template>
  <div class="history-whole">
    <div class="historys">
      <div
        v-for="(history, index) in historyInfo"
        :key="index"
        style="width: 100%"
      >
        <div class="history-single">
          <div class="history-top">
            <img :src="history.imagePath" class="history-pic" @click="toUserProfile(history.userID)"/>
            <div class="history-user">
              {{ history.userName }}
            </div>
            <div class="history-time">
              {{ history.operateTime }}
            </div>
          </div>
          <div class="history-body">
            <span class="history-text">
              {{ getOperationName(history.operation) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocHistory } from "network/doc";

export default {
  name: "docHistory",
  data() {
    return {
      historyInfo: []
    };
  },
  props: {
    docID: "",
    flag: false
  },
  methods: {
    getOperationName(operation) {
      if (operation === 1) return "创建了这个文档";
      else if (operation === 2) return "修改了这个文档";
      else if (operation === 3) return "删除了这个文档";
      else if (operation === 4) return "恢复了这个文档";
      else return "修改了文档的标题";
    },
    toUserProfile(userID) {
      this.$router.push({ path: '/profile', query: { userID } });
    }
  },
  created() {
    getDocHistory(this.docID)
      .then(res => {
        // console.log('history',res);
        this.historyInfo = res.reverse();
      });
  },
  watch: {
    flag() {
      // console.log('FLAG USE 历史');
      getDocHistory(this.docID)
        .then(res => {
          // console.log('历史',res);
          this.historyInfo = res.reverse();
        });
    }
  }
};
</script>

<style scoped>
.history-whole {
  right: 40px;
  width: 34vh;
  height: 80vh;
  border-radius: 5px;
  position: absolute;
}

.historys {
  border-radius: 5px;
  border: 1px solid #bcbcbc;
  height: 80vh;
  overflow: auto;
  background-color: white;
  padding-top: 10px;
}

.historys::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.historys::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: #a1c4fd;
}
.historys::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(236, 186, 186, 0.2);
  background   : none;
  border-radius: 10px;
}

.history-single {
  margin: auto;
  border-radius: 5px;
  padding: 5px;
  width: 94%;
  height: auto;
  background-color: #e6f3ff;
  margin-bottom: 8px;
  transition: 0.5s;
}

.history-single:hover {
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}

.history-body {
  align-items: center;
  display: flex;
}

.history-top {
  align-items: center;
  display: flex;
}

.history-user {
  color: #a5a5a5;
  font-size: 12px;
  height: 15px;
  margin-left: 1vh;
}

.history-time {
  color: #a5a5a5;
  flex: 1;
  font-size: 12px;
  height: 15px;
  margin-left: 1vh;
  text-align: right;
}

.history-pic {
  border: 1px solid #a8d8ee;
  border-radius: 50%;
  width: 30px;
  cursor: pointer;
}

.history-text {
  color: #333;
  font-size: 12px;
  line-height: 18px;
  padding: 10px;
}
</style>
