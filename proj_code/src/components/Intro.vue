<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">产品介绍</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div>
        <p>
          本理財計劃是非保本浮動收益類產品，不保證本金和收益，是高風險的投資產品，您的本金可能蒙受重大損失，您應充分認識投資風險，謹慎投
          資。本理財計劃與儲蓄存款存在明顯區別，具有投資風險。投資者有可能在贖回時受到本金損失，甚至贖回額為零。</p>
        <p>
          以下信息由匯豐銀行（中國）有限公司（「本行」）根據海外基金管理人向本行提供的數據為投資者提供，旨在向投資者披露代客境外理財計劃下所
          投資之基金的部分信息，僅供投資者作參考之用。若您想了解本代客境外理財計劃，請您向我行索取相關法律文件和介紹材料。海外基金管理人
          及本行均沒有就本文件內信息的準確性、有效性或完整性作出任何明示或暗示的陳述或保證。有關信息不應被視為建議出售或促銷本文件所述之
          任何投資項目。
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "About",
    data () {
      return {
        topHeight: 0
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
  .main>div {
    padding:30px;
  }
  .main>div>p {
    color:#666;
    font-size:18px;
    line-height: 28px;
    margin:0 0 20px 0;
  }
  .main>div>p:last-child{
    margin:0;
  }
</style>
