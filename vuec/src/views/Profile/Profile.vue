<template>
  <div id="profile">
      <h1>Profile</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style></style>
