<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">关于我们</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div>
        <p>
          淘宝网（taobao.com）是中国深受欢迎的网购零售平台，
          目前拥有近5亿的注册用户数，每天有超过6000万的固定
          访客，同时每天的在线商品数已经超过了8亿件，平均每
          分钟售出4.8万件商品。
        </p>
        <p>
          截止2011年年底，淘宝网单日交易额峰值达到43.8亿元，
          创造270.8万直接 且充分就业机会。随着淘宝网规模的扩
          大和用户数量的增加，淘宝也从单一的C2C网络集市变成
          了包括C2C、团购、分销、拍卖等多种电子商务模式在内
          的综合性零售商圈。
        </p>
        <p>
          目前已经成为世界范围的电子商务交易平台之一。
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
