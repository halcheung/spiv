<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">{{hall.hall}}厅</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div style="padding-top:10px;">
        <div>{{hall.intro}}</div>
        <div>
          <img :src="imgs[hall.code]" style="width:100%;border-radius:5px;margin:15px 0;"/>
        </div>
        <div class="details">
          <p>
            <span class="cap">投资周期</span><span class="val" style="color:#f60;">{{hall.cycle}}天</span><span class="extra">投资说明<b></b></span>
          </p>
          <p>
            <span class="cap">回报率</span><span class="val" style="color:#1d816b;">{{hall.rate}}%</span>
          </p>
          <p>
            <span class="cap">已售份数</span><span class="val" style="color:#f06;">{{hall.sold}}份</span><span class="extra">已购<i :style="'color:'+(iBuyCount?'#f06':'#ccc')+';'">{{iBuyCount}}</i>份<b></b></span>
          </p>
        </div>
        <div class="details" style="border-top:solid 1px #ddd;padding-top:10px;margin-top:5px;">
          <p>
            <span class="cap">最低买入金额</span><span class="val" style="color:#0078ff;float:right;text-align:right;font-weight:bold;">$100</span>
          </p>
          <p style="padding-top:10px;">
            <mu-button class="submit-btn" large round full-width color="#ee6600" @click="buy"><mu-icon left value="shopping_cart"></mu-icon>立即买入</mu-button>
          </p>
        </div>
      </div>
    </section>
    <div class="buy-bg" v-show="showBuy" @click="hideBuy" :style="'opacity:'+buyBgOpacity+';'"></div>
    <div class="buy-options" v-show="showBuy" :style="'transform:translateY('+buyTranslateY+'%);'">
      <p>选择购买金额</p>
      <mu-row gutter>
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==0?'#e60':'#fff'" :text-color="selectedMoneyIndex==0?'#fff':'#e60'" @click="select(100,0);">$100</mu-button>
        </mu-col>
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==1?'#e60':'#fff'" :text-color="selectedMoneyIndex==1?'#fff':'#e60'" @click="select(200,1);">$200</mu-button>
        </mu-col>
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==2?'#e60':'#fff'" :text-color="selectedMoneyIndex==2?'#fff':'#e60'" @click="select(500,2);">$500</mu-button>
        </mu-col>
      </mu-row>
      <mu-row gutter style="margin-top:20px;">
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==3?'#e60':'#fff'" :text-color="selectedMoneyIndex==3?'#fff':'#e60'" @click="select(1000,3);">$1,000</mu-button>
        </mu-col>
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==4?'#e60':'#fff'" :text-color="selectedMoneyIndex==4?'#fff':'#e60'" @click="select(2000,4);">$2,000</mu-button>
        </mu-col>
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==5?'#e60':'#fff'" :text-color="selectedMoneyIndex==5?'#fff':'#e60'" @click="select(5000,5);">$5,000</mu-button>
        </mu-col>
      </mu-row>
      <mu-row gutter style="margin-top:20px;">
        <mu-col span="4">
          <mu-button class="submit-btn" round full-width :color="selectedMoneyIndex==6?'#e60':'#fff'" :text-color="selectedMoneyIndex==6?'#fff':'#e60'" @click="select(0,6);">{{customizePriceCap}}</mu-button>
        </mu-col>
        <mu-col span="8" v-show="selectedMoneyIndex===6">
          <mu-slider :step="500" v-model="customizePrice" max="10000"></mu-slider>
        </mu-col>
      </mu-row>
      <p style="padding-top:20px;">
        <mu-button class="submit-btn" large round full-width color="#ee6600" @click="doBuy"><mu-icon left value="attach_money"></mu-icon>购买</mu-button>
      </p>
    </div>
  </div>
</template>

<script>
  import newmacau_img from '../assets/slide_01.jpg';
  import op_img from '../assets/slide_02.jpg';
  import ydl_img from '../assets/slide_03.jpg';
  import ge_img from '../assets/slide_04.jpg';
  import mgm_img from '../assets/slide_05.jpg';
  import yb_img from '../assets/slide_06.jpg';
  import newmacau from '../assets/logo_new_macau.png';
  import op from '../assets/logo_op.png';
  import ydl from '../assets/logo_ydl.png';
  import ge from '../assets/logo_ge.png';
  import mgm from '../assets/logo_mgm.png';
  import yb from '../assets/logo_yb.png';

  export default {
    name: "Hall",
    data () {
      return {
        topHeight: 0,
        imgs: null,
        hall: {},
        iBuyCount: 0,
        customizePriceCap: '自定义',
        customizePrice: 0,
        selectedMoney: 100,
        selectedMoneyIndex: 0,
        showBuy: false,
        buyBgOpacity: 0,
        buyTranslateY: 100,
      }
    },
    mounted(){
      this.$nextTick(()=>{

        try{
          plus.navigator.setStatusBarStyle('dark');
        }catch(Error){
          //
        }
        this.imgs = {
          newmacau: newmacau_img,
          op: op_img,
          ydl: ydl_img,
          ge: ge_img,
          mgm: mgm_img,
          yb: yb_img,
        }

        this.hall = JSON.parse(localStorage.getItem('hall'));

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f7f7f7");
        }

        this._B.$on('closeBuy',this.hideBuy);
      })
    },
    methods:{
      checkPlusReady(){
        //document.addEventListener('plusready', ()=>{
        plus.navigator.setStatusBarStyle('dark');
        var immersed = 0;
        var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
        if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
          immersed=parseFloat(ms[2]);// 获取状态栏的高度
          this.topHeight = immersed;
        }
        //});
      },
      icoClick(item){
        switch(item){
          case 'back':
            history.go(-1);
            break;
          case 'mobile':
            this.$router.push('/BindMobile');
            break;
        }
      },
      select(money,index){
        this.selectedMoneyIndex = index;
        if(index===6){
          this.customizePriceCap = '$500';
        } else {
          this.customizePrice = 500;
          setTimeout(()=>{
            this.customizePriceCap = '自定义';
          },50);
        }
        setTimeout(()=>{
          if(index===6) {
            this.selectedMoney = this.customizePrice;
          } else {
            this.selectedMoney = money;
          }
        },50);
      },
      buy(){
        console.log(this.isBuyOpen);
        this.showBuy = true;
        localStorage.setItem('backbtnmm', 'closeBuy');
        console.log(this.isBuyOpen);
        setTimeout(()=>{
          this.buyBgOpacity = 0.5;
          this.buyTranslateY = 0;
        }, 50);
      },
      hideBuy(){
        this.buyBgOpacity = 0;
        this.buyTranslateY = 100;
        setTimeout(()=>{
          this.showBuy = false;
        }, 500);
      },
      doBuy(){
        if(this.selectedMoneyIndex===6){
          this.selectedMoney = this.customizePrice;
        }
        localStorage.setItem('payment', JSON.stringify({
          mny:this.selectedMoney,
          prod:this.hall.code,
          name:this.hall.hall,
          cycle:this.hall.cycle,
          rate:this.hall.rate
        }));
        localStorage.removeItem('backbtnmm');
        this.$router.push('/Payment');
      }
    },
    watch:{
      customizePrice(){
        if(this.customizePrice >= 500) {
          this.customizePriceCap = '$'+this.customizePrice;
        } else {
          this.customizePriceCap = '$500';
        }
      }
    }
  }
</script>

<style scoped>
  .details>p {
    padding:0;
    margin:0 0 5px 0;
    font-size:18px;
    color:#666;
  }
  .details>p>span {
    display:inline-block;
  }
  .details>p>.cap {
    width:40%;
  }
  .details>p>.val {
    width:35%;
  }
  .details>p>.extra {
    width:auto;
    font-size:14px;
    color:#0076bc;
    position: relative;
    float: right;
    transition:all 0.3s;
    padding:2px 4px 0 4px;
    border-radius:2px;
    text-align: right;
    transform:translateY(1px);
  }
  .details>p>.extra:active {
    background-color:#ccc;
  }
  .details>p>.extra>b {
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
  .details>p>.extra>i {
    font-style: normal;
    font-weight:bold;
    display:inline-block;
    margin:0 2px;
  }
  .submit-btn {
    font-size:16px;
  }
  .buy-bg {
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color:#000;
    z-index:10;
    transition:all 0.5s;
  }
  .buy-options {
    position: fixed;
    z-index:11;
    left:0;
    right:0;
    bottom:0;
    min-height: 100px;
    background-color:#fff;
    padding:20px;
    text-align: left;
    transition:all 0.5s;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .buy-options>p {
    padding:0;
    margin:0 0 15px 0;
    font-size:18px;
  }
</style>
