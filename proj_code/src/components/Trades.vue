<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">静态投资与收益</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-button icon color="#005cb3" v-show="startDate||endDate" large class="right-icon" @click="clearQuery">
        <mu-icon value="highlight_off"></mu-icon>
      </mu-button>
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
          <mu-col span="6" @click="expandWithdraw">
            <span class="for-withdraw" v-html="withdrawTitle"></span>
            <mu-icon value="arrow_drop_down" :class="'for-withdraw-exp'+expClass2"></mu-icon>
          </mu-col>
          <mu-col span="6">
            <mu-button round full-width color="#005cb3" style="font-size:18px;" @click="search">查询</mu-button>
          </mu-col>
        </mu-row>
        <div class="w-exp" :style="'height:'+wExpHeight+'px;'">
          <mu-row gutter class="w-row w-row-exp">
            <mu-col span="8">
              <span class="for-withdraw2">总计可提<br/>现金额：</span><em class="for-withdraw2-money">$<b>18000</b></em>
            </mu-col>
            <mu-col span="4">
              <mu-button round full-width color="#f60" style="font-size:18px;" @click="withdraw">提现</mu-button>
            </mu-col>
          </mu-row>
        </div>
        <div style="margin:0;padding:0;">
          <article :style="'height:'+rcdHeight+'px;'" @click="expand(0);">
            <mu-icon value="arrow_drop_down" :class="'arrow'+expClass"></mu-icon>
            <span class="order-no">0000000</span><span class="datetime">00-00</span><span class="cycle">周期：2/50天</span><br/>
            <strong class="cap">东方明珠厅投资收益</strong><strong class="money">$15000</strong>
            <p :style="'padding:0;margin:5px 0;opacity:'+(expClass?1:0)+';color:#777;'">
              投入额$10000 × 50天回报率30% = $15000
            </p>
            <mu-row gutter style="margin-top:5px;color:#777;">
              <mu-col span="6">
                已释放：$30(2天)
              </mu-col>
              <mu-col span="6">
                已提现：$30
              </mu-col>
            </mu-row>
            <mu-row gutter style="margin-top:5px;">
              <mu-col span="8">
                <span style="display:block;font-size:18px;line-height:30px;">可提现：<b>$10</b></span>
              </mu-col>
              <mu-col span="4">
                <mu-button round small full-width color="#005cb3" @click.stop="speedy">加速释放</mu-button>
              </mu-col>
            </mu-row>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Trades",
    data () {
      return {
        topHeight: 0,
        startDate: '',
        endDate: '',
        rcdHeight: 70,
        expClass: '',
        expClass2: '',
        wExpHeight: 0,
        totalForWithdraw: 18000,
        withdrawTitle: ''
      }
    },
    mounted(){
      this.$nextTick(()=>{

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f2f2f2");
        }

        this.withdrawTitle = '可提现 <b>$'+this.totalForWithdraw+'</b>';
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
      },
      clearQuery(){
        this.startDate = '';
        this.endDate = '';
      },
      expandWithdraw(){
        this.wExpHeight = this.wExpHeight ? 0 : 50;
        this.expClass2 = this.expClass2 ? '' : ' exp';
        this.withdrawTitle = this.withdrawTitle === '提现' ? ('可提现 <b>$'+this.totalForWithdraw+'</b>') : '提现';
      },
      withdraw(){
        localStorage.setItem('withdraw', 'static');
        this.$router.push('/Withdraw');
      },
      expand(index){
        this.rcdHeight = this.rcdHeight === 70 ? 160 : 70;
        this.expClass = !this.expClass ? ' exp' : '';
      },
      speedy(){
        localStorage.setItem('odr', '1');
        this.$router.push('/Coupons');
      },
      search(){

      },
    },
    watch:{
    }
  }
</script>

<style scoped>
  .datepicker {
    opacity:0;background-color:#fff;position:absolute;top:-22px;left:0;height:40px;
  }
  .w-row {
    margin:10px 0 0 0;
    padding-bottom:10px;
    border-bottom:solid 1px #ddd;
  }
  .w-row-exp {
    background-color:#f7f7f7;
    margin-top:0;
    padding-top:0;
    border-bottom:none;
  }
  .w-exp {
    padding:0;margin-top:-1px;overflow:hidden;border-bottom:solid 1px #ddd;
    transition:all 0.5s;
  }
  article {
    padding-right:30px;
    overflow: hidden;
  }
  article>span {
    font-size:16px;
    display:inline-block;
  }
  article>.order-no {

  }
  article>.datetime {
    color:#999;
    margin-left:15px;
  }
  article>.cycle {
    color:#444;
    float: right;
    padding-right:5px;
  }
  article>strong {
    display:inline-block;
    width:70%;
    font-size:18px;
    font-weight: normal;
    color: #24a992;
  }
  article>strong.money {
    text-align:right;
    padding-right:5px;
    width:30%;
    font-weight:bold;
  }
  article>.arrow, .for-withdraw-exp {
    position:absolute;
    top:20px;
    right:0;
    font-size:28px;
    color:#0076bc;
    transition:all 0.5s;
  }
  article>.exp, .exp {
    transform:rotateZ(180deg);
  }
  .for-withdraw {
    display:inline-block;
    line-height:36px;
    font-size:16px;
    margin-left:5px;
  }
  .for-withdraw-exp {
    top:3px;
    right:7px;
  }
  .for-withdraw2 {
    font-size:12px;
    display:block;
    margin-left:5px;
  }
  .for-withdraw2-money {
    position: absolute;
    top :0;
    left:70px;
    font-size:24px;
    font-style: normal;
    color:#f60;
  }
</style>
