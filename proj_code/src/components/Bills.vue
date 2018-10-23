<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">账目明细</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-button flat color="primary" large class="txt-btn" @click="icoClick('withdraw');">提现</mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div style="padding:10px 10px;">
        <mu-row gutter style="margin:0;">
          <mu-col span="6" style="position: relative;">
            <input type="text" class="ipt ipt-qry" placeholder="开始日期" v-model="startDate">
            <mu-icon value="date_range" color="#c5c5c5" class="icon ico-qry"></mu-icon>
            <mu-date-input type="date" v-model="startDate" value-format="YYYY-MM-DD" label="选择日期" label-float container="dialog" full-width class="datepicker"></mu-date-input>
          </mu-col>
          <mu-col span="6">
            <input type="text" class="ipt ipt-qry" placeholder="结束日期" v-model="endDate">
            <mu-icon value="date_range" color="#c5c5c5" class="icon ico-qry"></mu-icon>
            <mu-date-input type="date" v-model="endDate" value-format="YYYY-MM-DD" label="选择日期" label-float container="dialog" full-width class="datepicker"></mu-date-input>
          </mu-col>
        </mu-row>
        <mu-row gutter class="w-row">
          <mu-col span="6">

          </mu-col>
          <mu-col span="6">
            <mu-button round full-width color="#005cb3" style="font-size:18px;" @click="search">查询</mu-button>
          </mu-col>
        </mu-row>
        <div style="margin:0;padding:0;">
          <article class="out">
            <em>- $<b>45</b>.00</em>
            <i>2018-12-31 12:45</i>
            <span>提现</span>
          </article>
          <article class="in">
            <em>$<b>1000</b>.00</em>
            <i>2018-12-31 12:45</i>
            <span>投资东方汇厅入金</span>
          </article>
          <article class="in">
            <em>$<b>500</b>.00</em>
            <i>2018-12-31 12:45</i>
            <span>投资东方汇厅收益</span>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Bills",
    data () {
      return {
        topHeight: 0,
        startDate: '',
        endDate: '',
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
          case 'withdraw':
            this.$router.push('/Withdraw');
            break;
        }
      },
      search(){

      },
    }
  }
</script>

<style scoped>
  .txt-btn {
    position: absolute;
    bottom:4px;
    right:-10px;
  }
  .datepicker {
    opacity:0;background-color:#fff;position:absolute;top:-22px;left:0;height:40px;
  }
  .w-row {
    margin:10px 0 0 0;
    padding-bottom:10px;
    border-bottom:solid 1px #ddd;
  }
  article>i {
    font-size:14px;
    color:#999;
  }
  article>span {
    display:block;
    font-size:18px;
  }
  article>em {
    display:block;
    float:right;
    font-size:18px;
    font-style: normal;
    margin-top:21px;
  }
  article.in>span, article.in>em {
    color:#396;
  }
  article.out>span, article.out>em {
    color:#f06;
  }
</style>
