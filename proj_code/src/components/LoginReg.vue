<template>
  <div :style="'border-top:solid '+topHeight+'px transparent;'">
    <div class="index-top">
      <span>欢迎来到</span>
      <img class="logo" src="../assets/logo2.png">
      <mu-button icon color="#005cb3" large class="back" ref="btnBack" @click="icoClick('back');">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </div>
    <mu-tabs :value.sync="active1" inverse color="#005cb3" indicator-color="#005cb3" full-width center class="tabs">
      <mu-tab style="font-size:18px;">登录</mu-tab>
      <mu-tab style="font-size:18px;">新用户注册</mu-tab>
    </mu-tabs>
    <div class="form" v-if="active1===0">
      <div class="input">
        <input type="text" class="ipt" placeholder="手机号码">
        <mu-icon value="phone_android" color="#c5c5c5" class="icon"></mu-icon>
      </div>
      <div class="input">
        <input type="password" class="ipt" placeholder="密码">
        <mu-icon value="lock" color="#c5c5c5" class="icon"></mu-icon>
      </div>
      <div class="input" style="text-align: left;padding-left:15px;">
        <mu-checkbox v-model="rememberMe" value="eat" label="记住手机号码"></mu-checkbox>
        <a href="javascript:;" class="forget" @click="icoClick('forgetpswd');">忘记密码？</a>
      </div>
      <div class="input">
        <mu-button round full-width large class="submit-btn" color="#005cb3" @click="icoClick('login');">登录</mu-button>
      </div>
    </div>
    <div class="form" v-if="active1===1">
      <div class="input">
        <input type="text" class="ipt" v-model="reg.mobile" placeholder="常用手机号码">
        <mu-icon value="phone_android" color="#c5c5c5" class="icon"></mu-icon>
      </div>
      <div class="input">
        <input :type="pswdType" class="ipt" v-model="reg.password" placeholder="设置登录密码">
        <mu-icon value="lock" color="#c5c5c5" class="icon"></mu-icon>
        <mu-button icon color="#666" class="view-pswd" @click="icoClick('viewpswd');">
          <mu-icon :value="viewPswdIcon"></mu-icon>
        </mu-button>
      </div>
      <div class="input" style="text-align:left;">
        <mu-button round color="#005cb3" class="verify-btn" @click="icoClick('sendverify');">发送验证码</mu-button>
        <input type="text" class="ipt" placeholder="验证码" v-model="reg.verifyCode" style="width:50%;">
        <mu-icon value="verified_user" color="#c5c5c5" class="icon"></mu-icon>
      </div>
      <div class="input" style="text-align: left;padding-left:15px;">
        <mu-checkbox v-model="reg.readMe" value="read" label="已阅读并同意"></mu-checkbox>
        <a href="javascript:;" class="terms-of-use" @click="icoClick('termsofuse');">隐私政策与使用条款</a>
      </div>
      <div class="input">
        <mu-button round full-width large class="submit-btn" color="#005cb3" @click="icoClick('register');">立即注册</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data () {
      return {
        active1: 0,
        rememberMe: false,
        viewPswdIcon: 'visibility_off',
        pswdType: 'password',
        topHeight: 0,
        reg: {
          mobile: '',
          password: '',
          verifyCode: '',
          readMe: false
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#f2f2f2");
        }

        if(localStorage.getItem('gotoreg')){
          localStorage.removeItem('gotoreg');
          this.active1 = 1;
        }

        if(localStorage.getItem('regdata')){
          this.reg = JSON.parse(localStorage.getItem('regdata'));
          localStorage.removeItem('regdata');
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
          case 'forgetpswd':
            this.$router.push('/GetBackPswd');
            break;
          case 'termsofuse':
            localStorage.setItem('gotoreg', '1');
            localStorage.setItem('regdata', JSON.stringify(this.reg));
            this.$router.push('/TermsOfUse');
            break;
          case 'login':
            this.$router.push('/MainHome');
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .index-top{
    position:relative;
    width:100%;
    height:130px;
    border-top:solid 0px transparent;
  }
  .logo {
    position: absolute;
    width:50%;
    top:50px;
    left:50%;
    margin:0 0 0 -25%;
  }
  .index-top>span {
    display:inline-block;
    padding-top:20px;
    font-size:18px;
  }
  .forget, .terms-of-use {
    display: block;
    float: right;
    color:#005cb3;
    text-decoration:underline;
    line-height:normal;
    transition:all 0.5s;
    padding:5px;
    border-radius:5px;
    margin:-5px 7px 0 0;
  }
  .terms-of-use {
  }
  .forget:active, .terms-of-use:active {
    background-color:#ccc;
  }
  .submit-btn {
    font-size:16px;
  }
</style>
