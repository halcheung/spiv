<template>
  <div>
    <div class="top-bar-i" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-head">投资项目</span>
      <mu-button icon color="#ffffff" large class="mine" @click="myProfile">
        <mu-icon value="account_circle"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;padding-top:28px;'">
      <mu-carousel hide-controls :style="'height:'+slideHeight+'px;'">
        <mu-carousel-item :key="'img'+index" v-for="(img,index) in images" :style="'width:'+slideWidth+'px;height:'+slideHeight+'px;'">
          <img :src="img" :style="'width:'+slideWidth+'px;height:'+slideHeight+'px;'">
        </mu-carousel-item>
      </mu-carousel>
      <div :style="'height:'+proHeight+'px;padding:0;'">
        <div class="prod" :style="'height:'+(proHeight/2)+'px;'" :key="'p'+index" v-for="(h,index) in halls" @click="detail(index);">
          <img class="hall-logo" :src="h.logo" />
          <strong>{{h.hall}}厅</strong>
          <b>已售<i>{{h.sold}}</i>份</b>
          <em><i>{{h.cycle}}</i>天回报率<i>{{h.rate}}%</i></em>
        </div>
      </div>
    </section>
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
    name: "Invest",
    data () {
      return {
        topHeight: 0,
        images: [],
        slideWidth: 300,
        slideHeight: 169,
        proHeight: 300,
        halls: [
          {hall:'新澳门',sold: 100, cycle:30,rate:30,logo:newmacau,code:'newmacau', intro:'新澳门在西哈努克合法註冊的賭場，從2015年的15間到現在成長到24間，其中大多數都是。新澳门在西哈努克合法註冊的賭場，從2015年的15間到現在成長到24間，其中大多數都是。'},
          {hall:'东方明珠',sold: 120, cycle:40,rate:40,logo:op,code:'op', intro: ''},
          {hall:'亚多利',sold: 140, cycle:50,rate:50,logo:ydl,code:'ydl', intro: ''},
          {hall:'东方汇',sold: 150, cycle:55,rate:55,logo:ge,code:'ge', intro: ''},
          {hall:'亚博娱乐',sold: 160, cycle:60,rate:55,logo:yb,code:'yb', intro: ''},
          {hall:'美高梅',sold: 160, cycle:60,rate:55,logo:mgm,code:'mgm', intro: ''},
        ]
      }
    },
    mounted(){
      this.$nextTick(()=>{

        this.images = [
          newmacau_img, op_img, ydl_img, ge_img, mgm_img, yb_img
        ]

        this.slideWidth = document.documentElement.clientWidth;
        this.slideHeight = Math.round(this.slideWidth * 0.5625, 10);

        this.proHeight = document.documentElement.clientHeight - this.topHeight - 65 - this.slideHeight - 48;

        try{
          plus.navigator.setStatusBarStyle('light');
        }catch(Error){
          //
        }
        setTimeout(()=>{
          this._B.$emit('highlightnav', 1);
        }, 50)

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#0076bc");
        }

        if(localStorage.getItem('paid')){
          this._B.$emit('nav', 2); // jump to wallet
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
      detail(index){
        localStorage.setItem('hall', JSON.stringify(this.halls[index]));
        this.$router.push('/Hall');
      }
    }
  }
</script>

<style scoped>
  .prod {
    position: relative;
    display: block;
    min-height: 120px;
    width:33%;
    float: left;
    box-shadow:0 0 1px 0 #ccc inset;
    text-align: center;
    transition:all 0.8s;
  }
  .prod:nth-child(2), .prod:nth-child(5){
    width:34%;
  }
  .prod:nth-child(2n){
    box-shadow:none;
  }
  .prod:active {
    background-color:#bbb;
  }
  .prod>.hall-logo {
    display:block;
    height:46%;
    margin:16px auto;

  }
  .prod>strong {
    font-size:16px;
    color:#666;
    display: block;
    width:100%;
    text-align: center;
    position: absolute;
    top: 60%;
  }
  .prod>b {
    display: block;
    position: absolute;
    font-size:12px;
    font-weight:normal;
    color:#999;
    text-align: center;
    width:100%;
    top: calc(60% + 22px);
  }
  .prod>b>i {
    font-style: normal;
    font-weight:bold;
    color:#f60;
  }
  .prod>em {
    display: block;
    position: absolute;
    font-size:11px;
    font-style:normal;
    font-weight:normal;
    color:#777;
    text-align: center;
    width:100%;
    top: calc(60% + 40px);
  }
  .prod>em>i {
    font-style: normal;
    font-weight:bold;
    color:#0076bc;
  }
</style>
