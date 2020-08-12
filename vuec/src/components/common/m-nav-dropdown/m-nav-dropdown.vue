<template>
  <div>
    <div class="nav">
      <slot name="show"></slot>
    </div>
    <!-- 隐藏层 -->
    <div class="nav--hide">
      <div class="nav__triangle"></div>
      <p>假装这里有东西</p>
      <slot name="hide"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MNavDropDown",
  components: {}
};
</script>

<style>
.nav--hide {
  display: none;
  position: absolute;
  z-index: 628;
}

.triangle {
  border: 8px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  width: 8px;
}

/* ---------------隐藏层动效---------------- */
.nav--hide:hover,
.nav:hover + .nav--hide {
  display: block;
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
