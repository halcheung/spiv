<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">个人中心</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div class="list-row">
        <img class="avatar" src="../assets/avatar.png"/>
        <span class="mobile">00000****00</span>
      </div>
      <div class="list-row" @click="icoClick('mobile');">
        <mu-icon class="list-item-ico" value="phone_android" color="#696969"></mu-icon>
        <span class="list-item-cap">手机号码</span>
        <mu-icon class="list-item-arrow" value="edit" size="18" color="#555"></mu-icon>
        <span class="list-item-val">00000****00</span>
      </div>
      <div class="list-row" @click="icoClick('pswd');">
        <mu-icon class="list-item-ico" value="security" color="#696969"></mu-icon>
        <span class="list-item-cap">密码</span>
        <mu-icon class="list-item-arrow" value="edit" size="18" color="#555"></mu-icon>
        <span class="list-item-val">****</span>
      </div>
      <div class="list-row" @click="icoClick('bankcard');">
        <mu-icon class="list-item-ico" value="credit_card" color="#696969"></mu-icon>
        <span class="list-item-cap">提现银行卡</span>
        <mu-icon class="list-item-arrow" value="edit" size="18" color="#555"></mu-icon>
        <span class="list-item-val">未绑定</span>
      </div>
      <div class="list-row" @click="icoClick('speedy');">
        <mu-icon class="list-item-ico" value="timer" color="#696969"></mu-icon>
        <span class="list-item-cap">提现加速卡</span>
        <mu-icon class="list-item-arrow" value="chevron_right" size="18" color="#555"></mu-icon>
        <span class="list-item-val">0</span>
      </div>
      <div class="list-row" @click="icoClick('about');">
        <mu-icon class="list-item-ico" value="info" color="#696969"></mu-icon>
        <span class="list-item-cap">关于我们</span>
      </div>
      <div class="list-row" @click="checkNewVersion">
        <mu-icon :class="'list-item-ico'+checkRotateClass" :value="checkNewVersionIcon" color="#696969"></mu-icon>
        <span class="list-item-cap">{{checkNewVersionCap}}</span>
      </div>
      <div class="list-row" @click="icoClick('exit');">
        <mu-icon class="list-item-ico" value="exit_to_app" color="#a00"></mu-icon>
        <span class="list-item-cap" style="color:#a00;">退出</span>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "MyProfile",
    data () {
      return {
        topHeight: 0,
        checkNewVersionCap: '检查新版本',
        isCheckingNewVersion: false,
        checkNewVersionIcon: 'cloud_download',
        checkRotateClass: ''
      }
    },
    mounted(){
      this.$nextTick(()=>{

        try{
          plus.navigator.setStatusBarStyle('dark');
        }catch(Error){
          //
        }

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f7f7f7");
        }
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
          case 'exit':
            this.$confirm('确定要退出应用？', '请确认', {
              type: ''
            }).then(({ result }) => {
              if (result) {
                location.replace('#/');
              } else {
                //
              }
            });
            break;
          case 'mobile':
            this.$router.push('/BindMobile');
            break;
          case 'about':
            this.$router.push('/About');
            break;
          case 'pswd':
            localStorage.setItem('mobile', '00000000000');
            this.$router.push('/GetBackPswd');
            break;
          case 'bankcard':
            this.$router.push('/BankCard');
            break;
        }
      },
      checkNewVersion(){
        if(this.isCheckingNewVersion) return;
        this.isCheckingNewVersion = true;
        this.checkNewVersionCap = '正在检查，请稍候……';
        this.checkNewVersionIcon = 'refresh';
        this.checkRotateClass = ' rotate';



        setTimeout(()=>{
          this.checkNewVersionCap = '已经是最新版本';
          this.checkNewVersionIcon = 'cloud_download';
          this.checkRotateClass = '';
          setTimeout(()=>{
            this.isCheckingNewVersion = false;
            this.checkNewVersionCap = '检查新版本';
          }, 2000);
        }, 5000);
      },
    }
  }
</script>

<style scoped>
  .avatar {
    width:70px;
    height:70px;
    background-color:#ccc;
    border-radius:100px;
    display:inline-block;
    vertical-align: middle;
  }
  .mobile {
    display:inline-block;
    vertical-align: middle;
    font-size:22px;
    color:#666;
    margin-left:20px;
  }
  .rotate {
    animation-name: rott;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes rott {
    from {
      transform:rotateZ(0deg);
    }
    to{
      transform:rotateZ(360deg);
    }
  }
</style>
