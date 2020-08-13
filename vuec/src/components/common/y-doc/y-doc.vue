<template>
  <div :class="{'doc':(docStyle == 0),'file':(docStyle == 1),'doc_pointed':isPointed}"
       @mousemove="isPointed = true"
       @mouseleave="isPointed = false">
    <input type="checkbox"></input>
    <img v-if="!marked" src="../../../assets/image/mark.svg" :class="{'file-mark':(docStyle == 1),'doc-mark':(docStyle == 0)}">
    <img v-if="marked" src="../../../assets/image/marked.svg" :class="{'file-mark':(docStyle == 1),'doc-mark':(docStyle == 0)}">
    <div @click=toDoc>
      <img src="https://assets.smcdn.cn/static/lizard-service-desktop/assets/doc_160_flat@2x.098efd4b.png"
           :class="{'doc--img':(docStyle == 0),'file--img':(docStyle == 1)}">
    </div>
    <div v-if="docStyle == 1" @click=toDoc>
      <div class="file--name">
        <slot name="title"></slot>
      </div>
      <div class="file--info">
        <slot name="info"></slot>
      </div>
    </div>
    <div v-if="docStyle == 0" class="doc--name" @click=toDoc>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "YDoc",
  props: {
    docSrc: String,
    docStyle: {
      type: Number,
      default: 1
    },
    marked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPointed: false,
      isChosen: false,
    }
  },
  methods: {
    toDoc() {
      let docsrc = this.docSrc;
      console.log('docsrc',docsrc);
      this.$router.push(docsrc);
    }
  }
};
</script>

<style scoped>
.doc{
  width: 130px;
  height: 160px;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  transition: ease 0.5s;
  cursor: pointer;
  border: 1px solid #e7e7e7;
}

.doc--img{
  width: 80%;
  margin-left: 10%;
  margin-top: -10%;
  padding-bottom: 10px;
}

.doc--name{
  width: auto;
  height: auto;
  text-align: center;
  font-family: "JetBrains Mono";
  font-size: 12px;
}

.doc_pointed{
  box-shadow:2px 2px 10px #838282;
  background-color: #f8f8f8;
  transition: ease 0.3s;
}

.file{
  display: flex;
  flex-direction: row;
  width: 330px;
  height: 80px;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  transition: ease 0.5s;
  cursor: pointer;
  border: 1px solid #e7e7e7;
}

.file--img{
  width: 60px;
  margin-top: 5px;
  margin-right: 20px;
}

.file--name{
  width: auto;
  height: auto;
  margin-top: 5px;
  font-family: "JetBrains Mono";
}

.file--info{
  width: auto;
  height: auto;
  margin-top: 10px;
  font-family: "JetBrains Mono";
  font-size: 13px;
  color: #999999;
}

.file-mark{
  position: absolute;
  width: 20px;
  height: 30px;
  margin-top: -5px;
  margin-left: 280px;
}

.doc-mark{
  position: absolute;
  width: 20px;
  height: 30px;
  margin-left: 80px;
  margin-top: -5px;
}
</style>
