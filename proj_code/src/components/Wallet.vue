<template>
  <div>
    <div class="top-bar-i" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-head">钱包资产</span>
      <mu-button icon color="#ffffff" large class="mine" @click="myProfile">
        <mu-icon value="account_circle"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Wallet",
    data () {
      return {
        topHeight: 0,
      }
    },
    mounted(){
      this.$nextTick(()=>{

        try{
          plus.navigator.setStatusBarStyle('light');
        }catch(Error){
          //
        }

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#0076bc");
        }
      })
    },
    methods:{
      checkPlusReady(){
        //document.addEventListener('plusready', ()=>{
        plus.navigator.setStatusBarStyle('light');
        var immersed = 0;
        var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
        if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
          immersed=parseFloat(ms[2]);// 获取状态栏的高度
          this.topHeight = immersed;
        }
        //});
      },
      myProfile(){
        this.$router.push('/MyProfile');
      },
    }
  }
</script>

<style scoped>
</style>
