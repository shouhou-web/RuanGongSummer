<template>
  <div id="app">
    <div>
      <div>
        <div class="header-title">
          HEADER
        </div>
        <hr>
      </div>
      <div>
        <div class="button-style" @click="msgOut" >
          反馈
        </div>
        <div class="router-view">
          <router-view></router-view>
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
  components: {
    FullscrrenLoading
  },
  methods: {
    msgOut: function (){
      this.$message(
          {
            message: '您点击了反馈按钮',
            type: 'info'
          }
      )
      console.log(this.$message)
    }
  }
};
</script>

<style>
.button-style{
  width: 100px;/*设置按钮宽度*/
  height: 30px;/*设置按钮高度*/
  color:white;/*字体颜色*/
  background-color:cornflowerblue;/*按钮背景颜色*/
  border-radius: 3px;/*让按钮变得圆滑一点*/
  border-width: 0;/*消去按钮丑的边框*/
  margin: 0;
  outline: none;/*取消轮廓*/
  font-family: KaiTi;/*字体设置为楷体*/
  font-size: 17px;/*设置字体大小*/
  text-align: center;/*字体居中*/
  cursor: pointer;/*设置鼠标箭头手势*/
}

.button-style:hover{/*鼠标移动时的颜色变化*/
  background-color: #9fccee;
}

@import "assets/css/base.css";

.header-title{
  font-size: 50px;
  text-align: center;
  font-family: "JetBrains Mono";
  background-color: #f5dee2;
}

.router-view{
  border: 2px dashed #f6dad1;
  border-radius: 20px;
}
</style>

