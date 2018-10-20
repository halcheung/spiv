<template>
    <div>
      <div class="index-top" :style="'height:calc(36% + '+topHeight+'px);'">
        <div class="top-bar-h" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
          <img class="logo3" src="../assets/logo3.png">
          <mu-button icon color="#ffffff" large class="mine" @click="myProfile">
            <mu-icon value="account_circle"></mu-icon>
          </mu-button>
        </div>
        <div class="brief" :style="'top:'+(59+topHeight)+'px;height:calc(36% - 59px);'">
          <mu-ripple>
            <span class="last-login">上次登录 {{lastLogin}}</span>
            <img class="avatar" src="../assets/avatar.png"/>
            <p class="greeting">{{greeting}}</p>
            <p class="mobile">{{mobile}}</p>
          </mu-ripple>
        </div>
      </div>
      <div class="index-middle" :style="'top:calc(36% + '+topHeight+'px);'">
        <div class="clickable-title" @click="openWallet">
          <mu-ripple>
            <span>账户与资金</span><b></b>
          </mu-ripple>
        </div>
      </div>
      <div class="index-middle" :style="'top:calc(36% + '+(topHeight+52)+'px);height:170px;overflow-x:scroll;overflow-y:hidden;'">
        <div class="card-cont">
          <div class="card">
            <span>Static Investment &amp; Income</span>
            <strong>静态投资与收益</strong>
            <em>$<b>{{totalInvest}}</b>.00</em>
          </div>
          <div class="card">
            <span>Dynamic Income</span>
            <strong>动态收益</strong>
            <em>$<b>{{totalDynamic}}</b>.00</em>
          </div>
        </div>
      </div>
      <div class="index-middle" @click="investIndexes" :style="'top:calc(36% + '+(topHeight+52+170)+'px);border-bottom:solid 60px transparent;'">
        <mu-ripple>
          <div class="clickable-title">
            <span>综合投资指标</span><b></b>
          </div>
          <mu-row class="indexes">
            <mu-col span="6" class="index-rate">
              <b>{{rate}}</b>%
              <em>综合日回报率</em>
            </mu-col>
            <mu-col span="6" class="index-avr">
              $<b>{{avr}}</b>.00
              <em>综合平均日收益</em>
              <span class="v-divider"></span>
            </mu-col>
          </mu-row>
        </mu-ripple>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Home",
    data () {
      return {
        topHeight: 0,
        lastLogin: 'YYYY-MM-DD',
        greeting: '',
        mobile: '00000****00',
        rate: '0.00',
        avr: '0',
        totalInvest: 0,
        totalDynamic: 0,
      }
    },
    mounted(){
      this.$nextTick(()=>{

        try{
          plus.navigator.setStatusBarStyle('light');
        }catch(Error){
          //
        }

        this.setGreeting();

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#0e82c5");
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
      investIndexes(){
        this.$router.push('/Indexes');
      },
      openWallet(){
        this._B.$emit('nav', 2);
      },
      setGreeting(){
        let d = new Date();
        let h = d.getHours();
        if(h>=6&&h<9){
          this.greeting = '早上好';
        } else if(h>=9&&h<11){
          this.greeting = '上午好';
        } else if(h>=11&&h<13){
          this.greeting = '中午好';
        } else if(h>=13&&h<17){
          this.greeting = '下午好';
        } else if(h>=18&&h<22){
          this.greeting = '晚上好';
        } else if(h>=22&&h<2){
          this.greeting = '夜里好';
        } else {
          this.greeting = '凌晨好';
        }
      },
    }
  }
</script>

<style scoped>

  .index-top{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    background:#0076bc url(../assets/top_bg.png) no-repeat top center;
    background-size:cover;
    z-index:10;
  }
  .index-middle{
    position:absolute;
    left:0;
    width:100%;
    text-align: left;
    z-index:1;
  }
  .top-bar-h {
    position: fixed;
    height:59px;
    width:100%;
    top:0;
    left:0;
    border-bottom:solid 1px #66add7;
    overflow: hidden;
    z-index:10;
  }
  .logo3 {
    width:121px;
    height:31px;
    position:absolute;
    top:14px;
    left:50%;
    margin:0 0 0 -60px;
  }
  .brief {
    position: fixed;
    width:100%;
    left:0;
    padding:20px;
    text-align: left;
  }
  .avatar {
    width:70px;
    height:70px;
    background-color:#eee;
    border-radius:100px;
  }
  .greeting, .mobile {
    color:#fff;
    font-size:14px;
    padding:0;
    margin:0;
  }
  .mobile {
    font-size:30px;
    font-weight:bold;
  }
  .last-login {
    float: right;
    color:#fff;
    font-size:14px;
    margin-top:-5px;
    opacity:0.7;
  }
  .h-scrollable-cards {
    height: 170px;
    background-color:#ccc;
  }
  .indexes {
    text-align: center;
    height: 90px;
  }
  .index-rate, .index-avr {
    font-size:28px;
    color:#0076bc;
  }
  .index-avr {
    color:#f60;
  }
  .index-rate>b, .index-avr>b {
    font-size:32px;
  }
  .indexes em{
    color:#999;
    font-size:14px;
    font-style: normal;
    font-weight:normal;
    display: block;
  }
  .v-divider {
    display:block;
    position: absolute;
    height:60px;
    width:1px;
    background-color:#ccc;
    top:8px;
    left:0;
  }
  .card-cont {
    padding:5px 30px;
    white-space: nowrap;
  }
  .card {
    display:inline-block;
    height:150px;
    width:232px;
    background-color:#0076bc;
    background-image:url(../assets/card_bg.png);
    background-repeat:no-repeat;
    background-position:top right;
    background-size:158px 75px;
    border-radius:10px;
    box-shadow:0 5px 5px 0 #ccc;
    margin-right:30px;
    white-space: normal;
    overflow: hidden;
    color:#fff;
    transition:all 0.3s;
  }
  .card:last-child{
    background-color:#003567;
  }
  .card:active {
    box-shadow:0 2px 2px 0 #ccc;
    -webkit-transform: perspective(800px) rotateX(-10deg);
  }
  .card span {
    font-size:10px;
    display:block;
    margin:20px 0 0 20px;
    opacity:0.5;
  }
  .card strong {
    font-size:14px;
    display:block;
    margin:0 0 0 20px;
  }
  .card em {
    font-size:24px;
    font-style: normal;
    display:block;
    width:210px;
    text-align:right;
    margin-top:30px;
  }
  .card em>b {
    font-size:32px;
    display:inline-block;
    margin-left:10px;
  }
</style>
