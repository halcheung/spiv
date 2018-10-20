<template>
  <div>
    <div class="top-bar" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-title">重置密码</span>
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;'">
      <div>
        <div class="input" v-show="showMobile">
          <input type="text" class="ipt" v-model="mobile" placeholder="手机号码">
          <mu-icon value="phone_android" color="#c5c5c5" class="icon"></mu-icon>
        </div>
        <div class="input">
          <input :type="pswdType" class="ipt" placeholder="设置登录密码">
          <mu-icon value="lock" color="#c5c5c5" class="icon"></mu-icon>
          <mu-button icon color="#666" class="view-pswd" @click="icoClick('viewpswd');">
            <mu-icon :value="viewPswdIcon"></mu-icon>
          </mu-button>
        </div>
        <div class="input" style="text-align:left;">
          <mu-button round color="#005cb3" class="verify-btn" @click="icoClick('sendverify');">发送验证码</mu-button>
          <input type="text" class="ipt" placeholder="验证码" style="width:50%;">
          <mu-icon value="verified_user" color="#c5c5c5" class="icon"></mu-icon>
        </div>
        <div class="input" style="margin-top:20px;">
          <mu-button round full-width large class="submit-btn" color="#005cb3" @click="icoClick('savepswd');">保存新密码</mu-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "GetBackPswd",
    data () {
      return {
        topHeight: 0,
        pswdType: 'password',
        viewPswdIcon: 'visibility_off',
        mobile: '',
        showMobile: true
      }
    },
    mounted(){
      this.$nextTick(()=>{
        if(localStorage.getItem('mobile')){
          this.showMobile = false
          this.mobile = localStorage.getItem('mobile').toString();
          localStorage.removeItem('mobile');
        }

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
          case 'viewpswd':
            this.viewPswdIcon = this.viewPswdIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
            this.pswdType = this.pswdType === 'password' ? 'text' : 'password';
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .submit-btn {
    font-size:16px;
  }
</style>
