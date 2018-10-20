<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">综合投资指标</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <p class="title">
        <mu-icon value="trending_up" class="ico"></mu-icon>
        <span>综合日回报率30日趋势</span>
      </p>
      <div class="curves">

      </div>
      <p class="title">
        <mu-icon value="trending_up" class="ico"></mu-icon>
        <span>综合平均日收益30日趋势</span>
      </p>
      <div class="curves">

      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Indexes",
    data () {
      return {
        topHeight: 0,
      }
    },
    mounted(){
      this.$nextTick(()=>{
        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f2f2f2");
        }
      })
    },
    methods:{
      checkPlusReady(){
        if(window.plus){
          this.plusReady();
        } else {
          setTimeout(this.checkPlusReady, 50);
        }
      },
      plusReady(){
        var immersed = 0;
        var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
        if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
          immersed=parseFloat(ms[2]);// 获取状态栏的高度
          this.topHeight = immersed;
        }

        plus.navigator.setStatusBarStyle('dark');

      },
      icoClick(item){
        switch(item){
          case 'back':
            history.go(-1);
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .submit-btn {
    font-size:16px;
  }
  .title {
    padding:10px 20px;
    margin:0;
  }
  .title>.ico {
    vertical-align: middle;
    margin-right:10px;
  }
  .title>span {
    font-size:18px;
    display: inline-block;
    color:#666;
    vertical-align: middle;
    margin-top:5px;
  }
  .curves {
    background-color:#ddd;
    border-radius:4px;
    min-height:200px;
    width:90%;
    margin-left:5%;
    margin-bottom:10px;
  }
</style>
