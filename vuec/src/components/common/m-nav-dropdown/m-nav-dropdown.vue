<template>
  <div>
    <div id="show" class="nav--show">
      <slot name="show"></slot>
    </div>
    <!-- 隐藏层 -->
    <div id="hide" class="nav--hide" :style="{ 'margin-left': mlAll }">
      <div class="nav__triangle" :style="{ 'margin-left': mlTri }"></div>
      <slot name="hide"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MNavDropDown",
  props: {
    position: {
      type: String,
      default: "middle"
    }
  },
  data() {
    return {
      mlAll: 0, // 隐藏层移动
      mlTri: 0 // 三角移动
    };
  },
  mounted() {
    let show = document.getElementById("show").offsetWidth;
    let hide = document.getElementById("hide").offsetWidth;
    if (this.position == "middle") {
      this.mlAll = "-" + (hide / 2 - show / 2) + "px";
    } else if (this.position == "right") {
      this.mlAll = "-" + (hide / 3 - show / 2) + "px";
      this.mlTri = "-" + (hide / 2 - show / 2) + "px";
    } else if (this.position == "left") {
      this.mlAll = "-" + ((hide * 2) / 3 - show / 2) + "px";
      this.mlTri = -show / 2 + hide / 2 + "px";
    }
    console.log(this.mlTri);
  }
};
</script>

<style>
.nav--hide {
  display: flex;
  align-items: center;
  opacity: 0;
  flex-direction: column;
  position: absolute;
  z-index: -628;
}

.nav__triangle {
  border: 8px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  width: 8px;
}

/* ---------------隐藏层动效---------------- */
.nav--hide:hover,
.nav--show:hover + .nav--hide {
  animation: slowin 0.5s ease forwards;
}

@keyframes slowin {
  0% {
    opacity: 0;
    z-index: 628;
  }
  100% {
    opacity: 1;
    z-index: 628;
  }
}
</style>
