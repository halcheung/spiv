<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">提现</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;padding-top:59px;'">
      <div class="withdraw-sum" :style="'top:'+(topHeight+59)+'px;'">
        <mu-row gutter>
          <mu-col span="8">
            <span class="cap">静态投资收益</span><span class="mny" :style="'color:#'+(staticProfit?'0076bc':'aaa')+';'">${{staticProfit.toLocaleString('en-US')}}.00</span><br/>
            <span class="cap">动态收益</span><span class="mny" :style="'color:#'+(dynamicProfit?'f60':'aaa')+';'">+ ${{dynamicProfit.toLocaleString('en-US')}}.00</span><br/>
            <mu-divider></mu-divider>
            <span class="cap">可提现额</span><strong class="mny" :style="'color:#'+((staticProfit+dynamicProfit)?'396':'aaa')+';'">${{(staticProfit+dynamicProfit).toLocaleString('en-US')}}.00</strong>
          </mu-col>
          <mu-col span="4">
            <mu-button round full-width large color="#f60" @click="icoClick('withdraw');" :disabled="staticProfit+dynamicProfit===0" style="margin-top:25px;">提现</mu-button>
          </mu-col>
        </mu-row>
      </div>
      <div :style="'top:'+(112+59+topHeight)+'px;'" class="record-title">提现记录</div>
      <div class="list">
        <article :key="r.date" v-for="r in records">
          <em :class="statusColor[r.sta]">{{status[r.sta]}}</em>
          <i>{{r.date}}</i>
          <span :class="statusColor[r.sta]">$<b>{{r.money.toLocaleString('en-US')}}</b>.00</span>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
  import MuseUIMessage from 'muse-ui-message'
  export default {
    name: "Withdraw",
    data () {
      return {
        topHeight: 0,
        staticProfit: 1990,
        dynamicProfit: 0,
        loading: null,
        status:['处理中','已提现'],
        statusColor:['processing','done'],
        records: [
          {sta:0,date:'2018-12-25 12:45',money:1500},
          {sta:1,date:'2018-12-24 18:20',money:2100}
        ]
      }
    },
    mounted(){
      this.$nextTick(()=>{

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f2f2f2");
        }

        this._B.$on('closeDialog',()=>{
          MuseUIMessage.close();
        });

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
            localStorage.setItem('backbtnmm', 'closeDialog');
            this.$confirm('确定要提现？', '请确认', {
              type: ''
            }).then(({ result }) => {
              localStorage.removeItem('backbtnmm');
              if (result) {
                this.loading = this.$loading();


              } else {
                //
              }
            });
            setTimeout(()=>{
              this.loading.close();
              this.staticProfit = 0;
              this.records.unshift({
                sta:0,date:'2018-12-28 22:59',money:1990
              });
            }, 3000)
            break;
        }
      },
    },
    watch:{
    }
  }
</script>

<style scoped>
  .withdraw-sum {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    padding:10px 20px;
    height:112px;
    background-color:#f7f7f7;
    border-bottom:solid 1px #ddd;
    z-index:9;
  }
  .withdraw-sum .cap {
    display:inline-block;font-size:14px;width:100px;
  }
  .withdraw-sum .mny {
    display:inline-block;font-size:20px;width:100px;
    text-align: right;
  }
  .record-title {
    position:fixed;background:#f7f7f7;left:0;width:100%;padding:7px 20px 5px 20px;
    height:32px;
    z-index:9;
  }
  .list {
    z-index:1;
    padding:144px 10px 20px 10px;
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
    margin-top:20px;
  }
  article>.processing {
    color:#0076bc;
  }
  article>.done {
    color:#396;
  }
</style>
