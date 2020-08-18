<template>
  <div>
    <div @mouseenter="show" class="m-nav--show">
      <slot name="show"></slot>
    </div>
    <!-- 隐藏层 -->
    <div
      class="m-nav--hide"
      :style="{
        'margin-left': mlAll,
      }"
    >
      <div
        class="m-nav__triangle"
        :style="{
          'margin-left': mlTri,
          'border-bottom-color': triColor,
        }"
      ></div>
      <slot name="hide"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MNavDropDown",
  props: {
    triColor: {
      type: String,
      default: "#fff",
    },
    position: {
      type: String,
      default: "middle",
    },
  },
  data() {
    return {
      mlAll: 0,
      mlTri: 0,
    };
  },
  computed: {
    // hide() {
    //   console.log("hide");
    //   return document.getElementById("hide");
    // },
    // show() {
    //   console.log("show");
    //   return document.getElementById("show");
    // }
  },
  methods: {
    show() {
      let showList = document.getElementsByClassName("m-nav--show");
      let hideList = document.getElementsByClassName("m-nav--hide");
      let show = 0,
        hide = 0;
      for (let i = 0; i < showList.length; i++) {
        if (hideList[i].offsetWidth > 0) {
          show = showList[i].offsetWidth;
          hide = hideList[i].offsetWidth;
          console.log("top", document.documentElement.scrollTop);
          break;
        }
      }
      // console.log(hide, show);
      if (this.position == "middle") {
        this.mlAll = -(hide / 2 - show / 2) + "px";
      } else if (this.position == "right") {
        this.mlAll = -(hide / 3 - show / 2) + "px";
        this.mlTri = -(hide / 2 - show / 2) + "px";
      } else if (this.position == "left") {
        this.mlAll = -((hide * 2) / 3 - show / 2) + "px";
        this.mlTri = -show / 2 + hide / 2 + "px";
      }
      // console.log(this.mlTri, this.mlAll);
    },
  },
};
</script>

<style>
.m-nav--show {
  align-items: center;
  display: flex;
  width: fit-content;
}

.m-nav--hide {
  display: none;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 628;
}

.m-nav__triangle {
  border: 8px solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  width: 8px;
}

/* ---------------隐藏层动效---------------- */
.m-nav--hide:hover,
.m-nav--show:hover + .m-nav--hide {
  display: flex;
  animation: slowin 0.5s ease forwards;
}

@keyframes slowin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
