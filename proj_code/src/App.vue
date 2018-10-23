<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  watch:{
    '$route' (to, from) {
      const routeDeep = [
        '/', '/Index',
        '/LoginReg',
        '/MainHome','/MainHome/Home','/MainHome/Invest','/MainHome/Wallet','/MainHome/Share','/MainHome/Help',
        '/MyProfile',
        '/GetBackPswd','/BindMobile','/BankCard','/Indexes','/Hall','/Payment','/Bills','/Trades','/Withdraw','/Coupons',
        '/Intro','/About','/TermsOfUse',
      ];
      const toDepth = routeDeep.indexOf(to.path)
      const fromDepth = routeDeep.indexOf(from.path)
      this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right'
    }
  }
}
</script>

<style>
  html,body {
    padding:0;
    margin:0;
    background-color:#f7f7f7;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  -webkit-user-select: none;
}
input, textarea {
  -webkit-user-select: text;
}
  .index-top>.back,.top-bar>.back {
    position:absolute;
    top:5px;
    left:5px;
  }
  .top-bar {
    position: fixed;
    height:59px;
    width:100%;
    top:0;
    left:0;
    background-color:#f7f7f7;
    border-bottom:solid 1px #ddd;
    overflow: hidden;
    z-index:10;
  }
  .top-bar-title {
    font-size:22px;
    color:#0076bc;
    line-height:65px;
  }
  .main {
    padding-top:65px;
    text-align:left;
  }
  .main>div {
    padding:30px;
  }
  .tabs {
    background-color:#eee;
    position: relative;
  }

  .form {
    padding:30px;
  }
  .ipt {
    border:none;
    border-radius:100px;
    background-color:#eee;
    font-size:18px;
    color:#666;
    padding:9px 20px 7px 55px;
    width:100%;
  }
  .ipt-qry {
    padding:9px 20px 7px 40px;
  }
  input:focus {
    outline: none;
    box-shadow:0 0 0 2px #005cb3 inset;
  }
  .input {
    position: relative;
    margin-bottom:10px;
  }
  .icon {
    position: absolute;
    top:50%;
    margin:-12px 0 0 0;
    left:15px;
  }
  .ico-qry {
    left:20px;
  }
  .submit-btn {
    font-size:16px;
  }
  .verify-btn {
    float:right;
    width:45%;
    font-size:16px;
    height:42px;
  }
  .form>.input>.view-pswd,.main .input>.view-pswd {
    position: absolute;
    top:-2px;
    right:2px;
  }

  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: .3s;
  }
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: .3s;
  }
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: .3s;
  }
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: .3s;
  }
  @keyframes fold-left-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes fold-right-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-right-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
  .router-view {
    position:absolute;top:0;left:0;width:100%;height:100%;
  }
  .mine {
    float:right;
    margin:2px 2px 0 0;
  }
  .right-icon {
    position:absolute;
    bottom:0;
    right:0;
  }
  .navi-cont {
    position: fixed;
    z-index:10;
    bottom:0;
    left:-20px;
    right:-20px;
    height:60px;
    background-color:#fff;
    box-shadow:0 0 2px 0 #eee;
    overflow: hidden;
  }
  .nav {
    height:60px;
  }
  .nav>.nav-icon {
    margin-top:11px;
    font-size:28px;
    color:#999;
    transition:all 0.3s;
  }
  .nav>.nav-cap {
    display:block;
    font-size:11px;
    margin-top:-7px;
    color:#999;
  }
  .on>.nav-cap, .on>.nav-icon {
    color:#0076bc;
  }
  .on>.nav-icon {
    font-size:30px;
    margin-top:8px;
  }
  .on>.nav-cap {
    font-size:12px;
    font-weight:bold;
  }
  .clickable-title {
    padding:12px 16px 10px 16px;
    height:52px;
  }
  .clickable-title span {
    font-size:18px;
    color:#777;
  }
  .clickable-title b {
    display: block;
    float: right;
    width:0;
    height:0;
    border:solid 7px transparent;
    border-right:none;
    border-left-color:#555;
    margin-top:5px;
  }

  .top-bar-i {
    position: fixed;
    height:60px;
    width:100%;
    top:0;
    left:0;
    background-color:#0076bc;
    overflow: hidden;
    z-index:10;
  }
  .top-bar-head {
    color:#fff;
    display:block;
    width:70%;
    position:absolute;
    bottom:0;
    left:50%;
    margin: 0 0 0 -35%;
    font-size:24px;
    padding:0;
    height:60px;
    line-height:65px;
    overflow: hidden;
  }
  .main>.list-row, article {
    border-bottom:solid 1px #ddd;
    padding:10px 5px 10px 15px;
    transition:all 0.5s;
    margin:0 10px;
  }
  article {
    transition:all 0.5s;
    position: relative;
    margin:0;
  }
  .main>.list-row:active, article:active {
    background-color:#e5e5e5;
  }
  .main>.list-row>.list-item-ico {
    vertical-align: middle;
  }
  .main>.list-row>.list-item-cap {
    display:inline-block;
    padding-top:3px;
    font-size:18px;
    color:#666;
    margin-left:10px;
    vertical-align: middle;
  }
  .main>.list-row>.list-item-val {
    display:block;
    padding-top:7px;
    font-size:14px;
    color:#999;
    float:right;
  }
  .main>.list-row>.list-item-arrow{
    display:block;
    padding-top:7px;
    float:right;
    margin-left:10px;
  }
</style>
