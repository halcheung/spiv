<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">绑定银行卡</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div>
        <div class="input">
          <input type="text" class="ipt" placeholder="持卡人姓名">
          <mu-icon value="person" color="#c5c5c5" class="icon"></mu-icon>
        </div>
        <div class="input">
          <input type="text" class="ipt" placeholder="开户银行名称">
          <mu-icon value="account_balance" color="#c5c5c5" class="icon"></mu-icon>
        </div>
        <div class="input">
          <input type="text" class="ipt" placeholder="银行卡号">
          <mu-icon value="credit_card" color="#c5c5c5" class="icon"></mu-icon>
        </div>
        <div class="input" style="text-align:left;">
          <mu-button round color="#005cb3" class="verify-btn" @click="icoClick('sendverify');">发送验证码</mu-button>
          <input type="text" class="ipt" placeholder="验证码" style="width:50%;">
          <mu-icon value="verified_user" color="#c5c5c5" class="icon"></mu-icon>
        </div>
        <div class="input" style="margin-top:20px;">
          <mu-button round full-width large class="submit-btn" color="#005cb3" @click="icoClick('savepswd');">保存银行卡信息</mu-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "BankCard",
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
</style>
