<template>
  <div>
    <div class="top-bar-i" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-head">钱包资产</span>
      <mu-button icon color="#ffffff" large class="mine" @click="myProfile">
        <mu-icon value="account_circle"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div style="padding:10px 20px;">
        <div>
          <span class="details-link" @click="viewBills">账目明细<b></b></span>
          <span>总资产</span>
          <strong :style="'color:'+(totalAssets?'#0076bc':'#aaa')+';'">$<b>{{totalAssets.toLocaleString('en-US')}}</b>.00</strong>
        </div>
        <div class="card-holder" :style="'height:'+cardHolderHeight+'px;'">
          <div :class="'card-big'+(totalInvestIncome?'':' grey-card')"
               :style="'width:'+cardSize.w+'px;height:'+cardSize.h+'px;margin:-'+(cardSize.h/2)+'px 0 0 -'+(cardSize.w/2)+'px;transform:perspective(800px) rotateX('+card1.X+'deg) rotateY('+card1.Y+'deg);'">
            <span>Static Investment &amp; Income</span>
            <strong>静态投资与收益</strong>
            <em>$<b>{{totalInvestIncome.toLocaleString('en-US')}}</b>.00</em>
            <i>可提现额<b>${{moneyForWithdraw.toLocaleString('en-US')}}.00</b></i>
            <div class="card-toucher" :style="'opacity:'+cardOpacity1+';'">
              <div @click="touchCard(1,0);"></div><div @click="touchCard(1,1);"></div>
              <div @click="touchCard(1,2);"></div>
              <div @click="touchCard(1,3);"></div>
            </div>
          </div>
          <div class="btn-float btn-invest" :style="'box-shadow:0 5px 5px '+(totalInvestIncome?'#005d94':'#555')+';'" @click="invest">投资</div>
        </div>
        <div class="card-holder" :style="'height:'+cardHolderHeight+'px;'">
          <div :class="'card-big card-big-dyn'+(lastDynamicIncome?'':' grey-card2')"
               :style="'width:'+cardSize.w+'px;height:'+cardSize.h+'px;margin:-'+(cardSize.h/2)+'px 0 0 -'+(cardSize.w/2)+'px;transform:perspective(800px) rotateX('+card2.X+'deg) rotateY('+card2.Y+'deg);'">
            <span>Dynamic Income</span>
            <strong>动态收益</strong>
            <em>$<b>{{totalDynamicIncome.toLocaleString('en-US')}}</b>.00</em>
            <i>上一日动态收益<b>${{lastDynamicIncome.toLocaleString('en-US')}}.00</b></i>
            <div class="card-toucher" :style="'opacity:'+cardOpacity2+';'">
              <div @click="touchCard(2,0);"></div><div @click="touchCard(2,1);"></div>
              <div @click="touchCard(2,2);"></div>
              <div @click="touchCard(2,3);"></div>
            </div>
          </div>
          <div class="btn-float btn-share" :style="'box-shadow:0 5px 5px '+(lastDynamicIncome?'#002344':'#444')+';'" @click="shareAndWithdraw">{{totalDynamicIncome?'提现':'推广'}}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Wallet",
    data () {
      return {
        topHeight: 0,
        totalAssets: 0,
        cardHolderHeight: 100,
        cardSize: {h:65,w:100},
        totalInvestIncome: 0,
        totalDynamicIncome: 0,
        card1: {X:0,Y:0},
        card2: {X:0,Y:0},
        cardDeg: 5,
        moneyForWithdraw: 0,
        lastDynamicIncome: 0,
        cardOpacity1: 0.05,
        cardOpacity2: 0.05,
      }
    },
    mounted(){
      this.$nextTick(()=>{

        try{
          plus.navigator.setStatusBarStyle('light');
        }catch(Error){
          //
        }
        setTimeout(()=>{
          this._B.$emit('highlightnav', 2);
        }, 50)

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#0076bc");
        }

        this.cardHolderHeight = (document.documentElement.clientHeight - this.topHeight - 59 - 60 - 130) / 2;
        let cardHolderWidth = document.documentElement.clientWidth - 40;
        // card scale: 1:0.648
        if(cardHolderWidth / this.cardHolderHeight > 1 / 0.648){
          // 以高为准
          this.cardSize.h = this.cardHolderHeight;
          this.cardSize.w = 1 / 0.648 * this.cardSize.h;
        } else {
          this.cardSize.w = cardHolderWidth;
          this.cardSize.h = 0.648 * this.cardSize.w;
        }

        if(localStorage.getItem('paid')){
          localStorage.removeItem('paid');
          this.$router.push('/Trades');
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
      viewBills(){
        this.$router.push('/Bills');
      },
      touchCard(cardIndex, areaIndex){
        switch(areaIndex){
          case 0:
            this['card'+cardIndex] = {X:this.cardDeg,Y:-this.cardDeg};
            this['cardOpacity'+cardIndex] = 0.1;
            break;
          case 1:
            this['card'+cardIndex] = {X:this.cardDeg,Y:this.cardDeg};
            this['cardOpacity'+cardIndex] = 0.1;
            break;
          case 2:
            this['card'+cardIndex] = {X:-this.cardDeg,Y:-this.cardDeg};
            this['cardOpacity'+cardIndex] = 0;
            break;
          case 3:
            this['card'+cardIndex] = {X:-this.cardDeg,Y:this.cardDeg};
            this['cardOpacity'+cardIndex] = 0;
            break;
        }
        setTimeout(()=>{
          this['card'+cardIndex] = {X:0,Y:0};
          this['cardOpacity'+cardIndex] = 0.05;

          if(cardIndex === 1){
            this.$router.push('/Trades');
          } else {
            this._B.$emit('nav', 3);
          }

        }, 400)

      },
      shareAndWithdraw(){
        if(this.totalDynamicIncome){
          this.withdraw();
        } else {
          this._B.$emit('nav', 3);
        }
      },
      invest(){
        this._B.$emit('nav', 1);
      },
      withdraw(){
        localStorage.setItem('withdraw', 'dynamic');
        this.$router.push('/Withdraw');
      }
    }
  }
</script>

<style scoped>
  .details-link {
    width:auto;
    font-size:14px;
    color:#0076bc;
    position: relative;
    float: right;
    transition:all 0.3s;
    padding:2px 4px 0 4px;
    border-radius:2px;
    text-align: right;
    margin-top:-3px;
  }
  .details-link>b {
    position: absolute;
    top:5px;
    right:-12px;
    display:block;
    float:right;
    width:0;
    height:0;
    border:solid 6px transparent;
    border-left-color:#666;
    border-right:none;
  }
  .details-link:active {
    background-color:#ccc;
  }
  .main>div>div {
    position: relative;
    margin-bottom:20px;
  }
  .main>div>div>strong {
    display:block;
    color:#0076bc;
    font-size:24px;
    font-weight: normal;
    position: absolute;
    top:16px;
    left:0;
  }
  .main>div>div:first-child {
    height:70px;
    margin-bottom:0;
  }
  .main>div>div>strong>b {
    font-size:32px;
    display:inline-block;
    margin-left:5px;
  }
  .card-holder {
    position: relative;
    min-height:100px;
  }
  .card-big {
    position: absolute;
    top:50%;
    left:50%;
    border-radius:12px;
    background-color:#0076bc;
    background-image:url(../assets/card_bg.png);
    background-repeat:no-repeat;
    background-position:top right;
    background-size:211px 100px;
    box-shadow:0 5px 5px 0 #ccc;
    overflow: hidden;
    color:#fff;
    transition:all 0.3s;
  }
  .card-big-dyn {
    background-color:#003567;
  }

  .card-big span {
    font-size:12px;
    display:block;
    margin:20px 0 0 30px;
    opacity:0.5;
  }
  .card-big strong {
    font-size:16px;
    display:block;
    margin:0 0 0 30px;
  }
  .card-big em {
    font-size:28px;
    font-style: normal;
    display:block;
    position: absolute;
    width:100%;
    text-align:right;
    bottom:36px;
    right:26px;
  }
  .card-big em>b {
    font-size:36px;
    display:inline-block;
    margin-left:10px;
  }
  .card-big i {
    font-size:14px;
    display:inline-block;
    width:100%;
    text-align:right;
    opacity:0.8;
    position: absolute;
    bottom:20px;
    right:26px;
  }
  .card-big i>b {
    display:inline-block;
    margin-left:5px;
  }
  .card-toucher {
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#fff;
    transition:all 0.3s;
  }
  .card-toucher>div {
    width:50%;
    height:50%;
    float: left;
  }
  .grey-card {
    filter:grayscale(100%) brightness(150%);
  }
  .grey-card2 {
    filter:grayscale(100%) brightness(250%);
  }
  .btn-float {
    position:absolute;
    left:50%;
    top:50%;
    width:70px;
    height:70px;
    margin:2% 0 0 -39%;
    background-color:#555;
    border-radius:200px;
    color:#fff;
    font-size:18px;
    font-weight:bold;
    text-align:center;
    line-height:75px;
    transition:all 0.3s;
  }
  .btn-float:active {
    transform:scale(0.95);
  }
  .btn-invest {
    background-color:#3ea786;
  }
  .btn-invest:active {
    background-color:#2f896d;
  }
  .btn-share {
    background-color:#e56600;
  }
  .btn-share:active {
    background-color:#cf5c00;
  }
</style>
