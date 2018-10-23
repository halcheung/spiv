<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">卡券</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <em class="coupon-count">{{totalCoupons?(totalCoupons+'张'):''}}</em>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div style="padding:10px 10px;">
        <article>
          <div class="left"><strong>提现加速卡</strong></div>
          <div class="right">
            <b>编号 <i>0123456789</i></b>
            <p>使用此券可将指定已投资项目的本金收益释放1天。同一投资项目可使用多张，无上限。</p>
            <div class="btn-use" @click="use(0);">使用</div>
          </div>
          <div class="notch-1"></div><div class="notch-2"></div>
        </article>
        <article class="used">
          <div class="left"><strong>提现加速卡</strong></div>
          <div class="right">
            <b>编号 <i>0123456789</i></b>
            <p>使用此券可将指定已投资项目的本金收益释放1天。同一投资项目可使用多张，无上限。</p>
            <div class="btn-use">已使用</div>
          </div>
          <div class="notch-1"></div><div class="notch-2"></div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
  import MuseUIMessage from 'muse-ui-message'
  export default {
    name: "Coupons",
    data () {
      return {
        topHeight: 0,
        startDate: '',
        endDate: '',
        totalCoupons: 2,
        speedyItem: ''
      }
    },
    mounted(){
      this.$nextTick(()=>{

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f2f2f2");
        }
        if(localStorage.getItem('odr')){
          this.speedyItem = localStorage.getItem('odr')
          localStorage.removeItem('odr')
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
            this.$router.push('/Withdraw');
            break;
        }
      },
      use(index){
        if(this.speedyItem){
          localStorage.setItem('backbtnmm', 'closeDialog');
          this.$confirm('确定要使用？', '请确认', {
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
            history.go(-1);

          }, 3000)
        } else {
          // TODO 选择要使用的投资项目
          // 1. 列表投资项目
          // 2. 选择项目，处理
          // 3. 存储localStorage标志需要打开“静态投资与收益”页面
          // 4. 后退，根据标志打开“静态投资与收益”页面
        }
      },
      search(){

      },
    }
  }
</script>

<style scoped>
  .coupon-count {
    color:#999;
    font-size:18px;
    display:block;
    padding-left:5px;
    font-style: normal;
    position: absolute;
    right:12px;
    bottom:12px;
  }
  article {
    position: relative;
    background-color:#fff;
    border:none;
    box-shadow:0 1px 3px 0 #ddd;
    height:100px;
    padding:0;
    border-radius:5px;
    margin-bottom:10px;
  }
  .notch-1, .notch-2 {
    display: block;
    background-color:#f7f7f7;
    width:20px;
    height:20px;
    border-radius:20px;
    position: absolute;
    z-index:99;
    top:40px;
    left:-10px;
    box-shadow:-3px 0 2px 0 #ddd inset;
  }
  .notch-2 {
    left:auto;right:-10px;box-shadow:3px 0 2px 0 #eee inset;
  }
  .left, .right {
    position: relative;
    height: 100px;
    float:left;
    width:45px;
    background-color:#0c9;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
  }
  .left>strong {
    color:#fff;
    font-size:14px;
    display:block;
    white-space: nowrap;
    position: absolute;
    top:50%;
    left:50%;
    margin:-11px 0 0 -30px;
    transform:rotateZ(-90deg);
  }
  .right {
    width:calc(100% - 45px);
    padding:10px;
    background-color:#fff;
    border-left:dashed 2px #0c9;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
    font-size:18px;
  }
  .right>b {
    color:#999;
    font-weight: normal;
  }
  .right>b>i {
    color:#444;
    font-style: normal;
    font-weight: bold;
  }
  .right>p {
    font-size:12px;
    color:#888;
    padding:0;
    margin:0;
    width:calc(100% - 100px);
  }
  .btn-use {
    position: absolute;
    width:70px;
    height:70px;
    border:solid 1px #f60;
    top:15px;
    right:25px;
    border-radius:100px;
    color:#f60;
    font-size:22px;
    text-align: center;
    line-height:75px;
    transition:all 0.3s;
  }
  .btn-use:active {
    background-color:#f60;
    color:#fff;
    transform:scale(0.95);
  }
  .used {
    filter: grayscale(100%);
  }
  .used .btn-use {
    font-size:16px;
    border-color:#ccc;
    color:#aaa;
    background-color:#f5f5f5;
  }
  .used .btn-use:active {
    transform:scale(1);
  }
</style>
