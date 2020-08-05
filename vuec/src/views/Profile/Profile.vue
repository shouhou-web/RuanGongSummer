<template>
  <div>
    <div class="header">THIS IS PROFILE</div>
  </div>
</template>

<script>
import {login, register} from "@/network/user";

export default {
  name: "Profile",
  data() {
    return {
      // 暂无数据
    }
  },
  methods: {

  },
};
</script>

<style scoped>
.header {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
