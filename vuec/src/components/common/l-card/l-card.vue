<template>
  <div class="l-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-hover-shadow'">
    <m-nav-dropdown position="middle" class="l-card__nav">
      <div slot="show">
        <img class="l-card__setting" src="@/assets/icon/card/settings.png">
      </div>
      <div slot="hide">
        <div class="l-card__hide-main">
          <my-button type="text" class="l-card__nav-btn">button1</my-button>
          <my-button type="text" class="l-card__nav-btn">button2</my-button>
          <my-button type="text" class="l-card__nav-btn">button3</my-button>
          <my-button type="text" class="l-card__nav-btn">button4</my-button>
        </div>
      </div>
    </m-nav-dropdown>
    <img class="l-card__pic" alt="Picture Please!" src="@/assets/icon/card/doc.png" />
    <div class="l-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'l-card',
    props: {
      bodyStyle: {},
      shadow: {
        type: String
      }
    },
  };
</script>


<style scoped>
.l-card {
  align-items: center;
  border-radius: 4px;
  border: 1px solid #C5D9E8;
  background-color: #FAFBFC;
  color: #303133;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  overflow: hidden;
  -webkit-transition: 0.3s;
}

.l-card.is-always-shadow,
.l-card.is-hover-shadow:focus,
.l-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
  box-shadow: 0 2px 12px 0 rgba(3, 65, 165, 0.1);
}

.l-card__nav {
  align-self: flex-end;
  margin-right: 2px;
  margin-top: 2px;
}

.l-card__setting {
  height: 18px;
  width: 18px;
}

.l-card__pic {
  width: 80px;
  height: 80px;
}

.l-card__body {
  margin: 10px 20px;
}

.l-card__hide-main {
  align-items: center;
  background-color: #FAFBFC;
  display: flex;
  flex-direction: column;
  width: 110px;
}

.l-card__nav-btn {
  color: #3F536E;
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.l-card__nav-btn:hover {
  color: #3F536E;
}
</style>