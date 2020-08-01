<template>
  <div id="app">
    <div>
      <div>
        <div class="header-title">
          PRACTICE OF YU
        </div>
      </div>
      <div>
        <div class="button-style" @click="msgOut">反馈</div>
        <div class="main-style">
          <div class="side-bar">
            <div class="bar-default-style" @click="toProfile">主页</div>
            <div class="bar-default-style">日志</div>
            <div class="bar-default-style">记录</div>
            <div class="bar-default-style">好友</div>
            <div class="bar-default-style">圈子</div>
            <div class="bar-default-style" @click="goBack">返回</div>
          </div>
          <div class="router-view">
            <router-view></router-view>
          </div>
        </div>
      </div>

      <!-- 全局加载组件 -->
      <fullscrren-loading></fullscrren-loading>
    </div>
  </div>
</template>

<script>
import FullscrrenLoading from "./components/common/fullscreenloading/FullscreenLoading"

export default {
  name: "App",
  data() {
    return {}
  },
  components: {
    FullscrrenLoading
  },
  methods: {
    msgOut: function () {
      this.$message(
        {
          message: '您点击了反馈按钮',
          type: 'info'
        }
      )
      console.log(this.$message)
    },

    toProfile: function () {
      this.$router.push({path: '/home/profile'})
    },

    goBack: function () {
      this.$router.go(-1)
    }
  }
};
</script>

<style>
@import "assets/css/base.css";

.header-title {
  font-size: 50px;
  text-align: center;
  font-family: "JetBrains Mono";
  background: linear-gradient(to right, #f5dee2, #cbbde9);
}

.main-style {
  /*设计flex页面*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  height: 1200px;
  margin-bottom: 100px;
}

.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 570px;
  width: 15%;
  margin-left: 1%;

  border: 2px dashed #f8c5b3;
  border-radius: 20px;

  /*字体设置*/
  font-family: "JetBrains Mono", KaiTi;
  background: linear-gradient(to right, #fce4e8, #ece0ff);
}

.router-view {
  height: 1000px;
  width: 75%;
  margin-left: 5%;

  border: 3px dashed #f6dad1;
  border-radius: 20px;

  /*字体设置*/
  font-family: "JetBrains Mono", KaiTi;
}

.button-style {
  width: 100px; /*设置按钮宽度*/
  height: 30px; /*设置按钮高度*/
  color: white; /*字体颜色*/
  background: linear-gradient(to right, #e5c7cd, #ba9bf6);

  border-radius: 8px; /*让按钮变得圆滑一点*/
  border-width: 0; /*消去按钮丑的边框*/

  margin: 20px;
  outline: none; /*取消轮廓*/

  font-family: KaiTi; /*字体设置为楷体*/
  font-size: 17px; /*设置字体大小*/

  text-align: center; /*字体居中*/
  cursor: pointer; /*设置鼠标箭头手势*/

  /*通过padding设置按钮字体位置*/
  padding-bottom: 0px;
  padding-top: 5px;
}

.button-style:hover { /*鼠标移动时的颜色变化*/
  background: linear-gradient(to right, #eca1b0, #a785ea);
}

.bar-default-style {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  width: 80%;
  border: 2px dashed #f1c4c4;
  border-radius: 5px;

  margin-top: 40px;
}

.bar-default-style:hover {
  width: 80%;
  border: 2px solid #f6b6b6;
  border-radius: 5px;
  background: #eed4e4;
}

</style>

