<template>
  <div class="teamspace">
    <div class="teamspace-header">
      <img src="../../assets/image/Team.svg" style="margin-left: 3vh;padding-bottom: 1.5vh;padding-left: 1vh;margin-right: 10px">
      我的团队 | My Team
    </div>
    <div class="my-teams-space">
      <div class="one-team">
        this is my first team
      </div>
      <div class="one-team">
        this is my first team
      </div>
      <div class="one-team">
        this is
      </div>
      <div class="one-team">
        this is my first team
      </div>
      <div class="one-team">
        this
      </div>
      <div class="one-team">
        this is my
      </div>
      <div class="one-team">
        first team
      </div>
      <div class="one-team">
        first team
      </div>
      <div class="one-team">
        first team
      </div>
    </div>
    <div class="my-team-details">
      <div class="team-tools">
        <img src="../../assets/image/add-file.svg">
        <img src="../../assets/image/权限.svg">
        <img src="../../assets/image/remove.svg">
      </div>
      <div class="team-docs">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
};
</script>

<style scoped>
.teamspace{
  height: 100vh;
  border-left: 2px solid #a1c4fd;
}

.teamspace-header{
  display: flex;
  flex-direction: row;
  margin: 5px;
  height: 6vh;
  width: 45vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 5px;
  background-color: #a1c4fd;
  font-size: 20px;
  padding-top: 1.5vh;
  text-align: center;
  color: white;
  font-family: "JetBrains Mono";
  box-shadow:2px 2px 5px #838282;
}

.my-teams-space{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px;
  height: auto;
  width: 90vh;
  border-radius: 10px;
  border-bottom-left-radius: 5px;
  background-color: #a1c4fd;
  margin-top: 1.5vh;
  box-shadow:2px 2px 5px #838282;
}

.one-team{
  margin: 1vh;
  padding: 8px;
  border: 1px solid #a2a2a2;
  background-color: white;
  border-radius: 10px;
  color: #000000;
  width: auto;
  height: 5vh;
  font-family: "JetBrains Mono";
  font-size: 13px;
  box-shadow:2px 2px 5px #b5b5b5;
}

.my-team-details{
  margin: 5px;
  margin-top: 30px;
  height: 70vh;
  border-radius: 10px;
  border: 2px solid #a1c4fd;
}

.team-tools{
  display: flex;
  flex-direction: row;
  margin: 5px;
  width: 40vh;
  height: 6vh;
  border: 2px solid red;
  justify-content: space-around;
}

.team-docs{
  margin: 5px;
  height: 60vh;
  border: 2px solid red;
}
</style>
