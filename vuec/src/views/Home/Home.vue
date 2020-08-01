<template>
  <div id="home">
    <div class="home-style">Home.vue</div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style>
.home-style {
  border-radius: 10px;
  background: linear-gradient(to right, #eaf5de, #abe2de);
  font-size: 50px;
  text-align: center;
}
</style>
