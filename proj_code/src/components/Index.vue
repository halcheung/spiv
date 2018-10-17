<template>
  <div>
    <div class="index-top">
      <img class="logo" src="../assets/logo.png">
    </div>
    <div class="index-middle">
      <div class="row">
        <mu-button round full-width large color="#005cb3" class="login-btn" @click="icoClick('login');">登录</mu-button>
      </div>
      <mu-row class="row">
        <mu-col span="4">
          <mu-button fab large color="#fcfcfc" style="margin-left:15px;" @click="icoClick('intro');">
            <mu-icon value="poll" color="#0a6fc9"></mu-icon>
          </mu-button>
          <span class="cap" style="margin-left:15px;">产品介绍</span>
        </mu-col>
        <mu-col span="4">
          <mu-button fab large color="#fcfcfc" @click="icoClick('about');">
            <mu-icon value="sms" color="#0a6fc9"></mu-icon>
          </mu-button>
          <span class="cap">关于我们</span>
        </mu-col>
        <mu-col span="4">
          <mu-button fab large color="#fcfcfc" style="margin-right:15px;" @click="icoClick('reg');">
            <mu-icon value="person_add" color="#0a6fc9"></mu-icon>
          </mu-button>
          <span class="cap" style="margin-right:15px;">新用户注册</span>
        </mu-col>
      </mu-row>
      <div class="row">
        <img src="../assets/slogan.png" class="slogan">
      </div>
    </div>
    <footer>
      <span>交易动态</span>
      <div>
        {{tradeDynamics}}
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      tradeDynamics: '周先生购买了1500元'
    }
  },
  mounted(){
    this.$nextTick(()=>{
      if(this.reqQryStr('ishb')){
        localStorage.setItem('ishb','1');
        this.checkPlusReady();
      }

      if(localStorage.getItem('ishb')){
        this.checkPlusReady();
      } else {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#0e82c5");
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
      plus.navigator.setStatusBarStyle('light');

      let webview = plus.webview.currentWebview();
      let first = null;
      plus.key.addEventListener('backbutton', ()=>{
        webview.canBack((e)=>{
          if(e.canBack) {
            webview.back();
          } else {

            if (!first) {
              first = new Date().getTime();
              this.$toast.message('再按一次退出应用！');
              setTimeout(function() {
                first = null;
              }, 1000);
            } else {
              if (new Date().getTime() - first < 1500) {
                plus.runtime.quit();
              }
            }

          }
        })
      });

    },
    reqQryStr(item){
      try {
        let svalue = decodeURIComponent(location.search).match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
      }
      catch (Error) {
        return null;
      }
    },
    icoClick(item){
      switch(item){
        case 'login':
          this.$router.push('/LoginReg');
          break;
        case 'reg':
          localStorage.setItem('gotoreg', '1');
          this.$router.push('/LoginReg');
          break;
        case 'about':
          this.$router.push('/About');
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-top{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:36%;
    background:#0076bc url(../assets/top_bg.png) no-repeat top center;
    background-size:cover;
  }
  .logo {
    position: absolute;
    width:50%;
    top:50%;
    left:50%;
    margin:-30px 0 0 -25%;
  }
  .index-middle{
    position:absolute;
    top:36%;
    left:0;
    width:100%;
    height:64%;
    text-align: center;
  }
  .row {
    margin:0 auto;
    position: relative;
    height: 28%;
    text-align: center;
  }
  .login-btn {
    width:88%;
    margin-left:6%;
    font-size:24px;
    height:50px;
    margin-top:30px;
    background-image:url(../assets/login_btn_bg.png);
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size:266px 50px;
  }
  .cap {
    display:block;text-align: center;margin-top:15px;
    font-size:12px;
    color:#999;
  }
  .slogan {
    width:50%;
    height:50%;
    margin:20px auto 0 auto;
  }
  footer {
    position: fixed;
    bottom:0;
    left:0;
    height:60px;
    padding:13px 17px 7px 17px;
    width:100%;
    background-color:#fff;
    text-align: left;
    box-shadow:0 2px 5px 0 #ddd;
  }
  footer>span {
    display:inline-block;
    background-color:#77c6e4;
    color:#fff;
    text-align: center;
    padding:7px 16px;
    border-radius:50px;
    margin-right:17px;
    font-size:12px;
  }
  footer>div {
    display:inline-block;
    font-size:16px;
  }
</style>
