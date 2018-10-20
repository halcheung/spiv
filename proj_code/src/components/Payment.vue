<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">支付</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div class="list-row">
        <mu-icon class="list-item-ico" value="account_balance" color="#696969"></mu-icon>
        <span class="list-item-cap">投资项目</span>
        <span class="list-item-val list-item-val2">{{prod.name}}厅</span>
      </div>
      <div class="list-row list-row2">
        <mu-icon class="list-item-ico" value="poll" color="#696969"></mu-icon>
        <span class="list-item-cap">周期回报率</span>
        <span class="list-item-val list-item-val2">{{prod.cycle}}天{{prod.rate}}%</span>
      </div>
      <div class="list-row list-row2">
        <mu-icon class="list-item-ico" value="done_all" color="#f7f7f7"></mu-icon>
        <span class="list-item-cap list-item-cap2">总收回额</span>
        <span class="list-item-val list-item-val3">${{Math.round(prod.mny*(1+(prod.rate/100)))}}</span>
      </div>
      <div class="list-row">
        <mu-icon class="list-item-ico" value="event" color="#f7f7f7"></mu-icon>
        <span class="list-item-cap list-item-cap2">日收回额</span>
        <span class="list-item-val list-item-val3">${{Math.ceil(prod.mny*(1+(prod.rate/100))/prod.cycle)}}</span>
      </div>
      <div class="list-row">
        <mu-icon class="list-item-ico" value="monetization_on" color="#696969"></mu-icon>
        <span class="list-item-cap">投入金额</span>
        <span class="list-item-val list-item-val2">${{prod.mny}}</span>
      </div>
      <div class="list-row" style="border-bottom:none;">
        <mu-icon class="list-item-ico" value="local_atm" color="#696969"></mu-icon>
        <span class="list-item-cap">选择支付方式</span>
      </div>
      <div class="list-row paymode" style="border-bottom:none;" @click="payMode='alipay'">
        <img src="../assets/logo_alipay.png" :style="payMode==='alipay'?'':'filter: grayscale(100%);'" class="pay-ico"/>
        <span class="list-item-cap" :style="'color:'+(payMode==='alipay'?'#08c':'#666')+';'">支付宝</span>
        <span class="list-item-val list-item-val2" v-show="payMode==='alipay'">
          <mu-icon class="list-item-ico" value="done" color="#08c"></mu-icon>
        </span>
      </div>
      <div class="list-row paymode" style="border-bottom:none;" @click="payMode='wechat'">
        <img src="../assets/logo_wechatpay.png" :style="payMode==='wechat'?'':'filter: grayscale(100%);'" class="pay-ico"/>
        <span class="list-item-cap" :style="'color:'+(payMode==='wechat'?'#690':'#666')+';'">微信支付</span>
        <span class="list-item-val list-item-val2" v-show="payMode==='wechat'">
          <mu-icon class="list-item-ico" value="done" color="#690"></mu-icon>
        </span>
      </div>
      <div class="list-row" style="padding:0;height:10px;">
      </div>
      <div>
        <mu-button class="submit-btn" large round full-width color="#ee6600" @click="icoClick('pay');"><mu-icon left value="attach_money"></mu-icon>完成支付</mu-button>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Payment",
    data () {
      return {
        topHeight: 0,
        payMode: '',
        prod: null,
      }
    },
    mounted(){
      this.$nextTick(()=>{
        if(localStorage.getItem('mobile')){
          this.showMobile = false
          this.mobile = localStorage.getItem('mobile').toString();
          localStorage.removeItem('mobile');
        }

        this.prod = JSON.parse(localStorage.getItem('payment'));

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
          case 'pay':
            if(!this.payMode){
              this.$toast.message('请选择支付方式！');
              return;
            }
            localStorage.setItem('paid', '1');
            history.go(-2);
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
  .main>.list-row2 {
    border-bottom:none;
    padding-bottom:0px;
  }
  .main>.list-row:active {
    background-color:#f7f7f7;
  }
  .main>.list-row>.list-item-cap2 {
    font-size:14px;
  }
  .main>.list-row>.list-item-val2 {
    margin-right:15px;
    font-size:18px;
    padding-top:3px;
    color:#444;
  }
  .main>.list-row>.list-item-val3 {
    margin-right:15px;
    padding-top:5px;
  }
  .pay-ico {
    width:24px;
    height:24px;
    vertical-align: middle;
    margin-left:38px;
  }
  .main>.paymode {
    padding-top:5px;
    padding-bottom:5px;
  }
  .main>.paymode:active {
    background-color:#ccc;
  }
</style>
