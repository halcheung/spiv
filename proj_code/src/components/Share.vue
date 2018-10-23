<template>
  <div>
    <div class="top-bar-i" :style="'border-top:solid '+topHeight+'px transparent;height:'+(59+topHeight)+'px;'">
      <span class="top-bar-head">推广</span>
      <mu-button icon color="#ffffff" large class="mine" @click="myProfile">
        <mu-icon value="account_circle"></mu-icon>
      </mu-button>
    </div>
    <section class="main" :style="'border-top:solid '+topHeight+'px transparent;padding-top:59px;'">
      <div class="top-side" :style="'top:'+(59+topHeight)+'px;'">
        <mu-tabs :value.sync="active1" inverse color="#005cb3" indicator-color="#005cb3" full-width center class="tabs">
          <mu-tab style="font-size:18px;">推广二维码</mu-tab>
          <mu-tab style="font-size:18px;">推广链接</mu-tab>
        </mu-tabs>
        <div class="qr-link" v-show="active1===0" style="height:160px;">
          <mu-row>
            <mu-col span="6" style="position: relative;height:160px;text-align:center;">
              <canvas width="130" height="130" class="canvas" id="canvas" @click="openCanvas"></canvas>
            </mu-col>
            <mu-col span="5">
              <mu-button round full-width color="#005cb3" style="font-size:18px;margin-top:35px;" @click="shareQR('download');">下载</mu-button>
              <mu-button round full-width color="#2c986c" style="font-size:18px;margin-top:20px;" @click="shareQR">分享</mu-button>
            </mu-col>
          </mu-row>
        </div>
        <div class="qr-link" v-show="active1===1" style="padding:20px;height:160px;">
          <div class="input" style="margin-top:12px;">
            <input type="text" class="ipt" readonly v-model="shareLink">
            <mu-icon value="link" color="#c5c5c5" class="icon"></mu-icon>
          </div>
          <mu-row gutter style="margin-top:20px;">
            <mu-col span="6">
              <mu-button round full-width color="#005cb3" style="font-size:18px;" @click="copyUrl">复制</mu-button>
            </mu-col>
            <mu-col span="6">
              <mu-button round full-width color="#2c986c" style="font-size:18px;" @click="shareUrl">分享</mu-button>
            </mu-col>
          </mu-row>
        </div>

        <mu-row gutter style="margin:0 10px;border-top:solid 1px #ddd;">
          <mu-col span="4">
            <span style="margin-top:10px;display:block;line-height:40px;font-size:16px;">动态收益</span>
          </mu-col>
          <mu-col span="4">
            <span style="margin-top:10px;display:block;line-height:40px;font-size:18px;color:#f60;">$<b style="font-size:22px;">366</b>.00</span>
          </mu-col>
          <mu-col span="4">
            <mu-button round full-width color="#f60" style="margin-top:10px;font-size:18px;" @click="withdraw">提现</mu-button>
          </mu-col>
        </mu-row>

        <mu-row gutter style="margin:0 10px;">
          <mu-col span="4">
            <span style="display:block;line-height:40px;font-size:16px;">上一日收益</span>
          </mu-col>
          <mu-col span="4">
            <span style="display:block;line-height:40px;font-size:18px;color:#0076bc;">$<b style="font-size:22px;">15</b>.00</span>
          </mu-col>
          <mu-col span="4">
            <span class="details-link">收益明细<b></b></span>
          </mu-col>
        </mu-row>

        <div>
          <div class="divider"><span>下线 0</span></div>
        </div>
      </div>
      <div class="list">
        <div class="underline">
          <mu-icon value="person" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:30px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:45px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:45px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:60px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:75px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:90px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:30px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline">
          <mu-icon value="person" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline">
          <mu-icon value="person" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
        <div class="underline" style="padding-left:30px;">
          <mu-icon value="subdirectory_arrow_right" color="#999"></mu-icon>
          <span>139****4578</span>
          <strong><em>12-05</em>$15</strong>
        </div>
      </div>
    </section>
    <div class="big-canvas-bg" v-show="showBigCanvas"></div>
    <div class="big-canvas-cont" v-show="showBigCanvas" @click="hideBigCanvas">
      <canvas class="big-canvas" id="bigCanvas" width="300" height="450" @click.stop="nothing"></canvas>
    </div>
    <img src="../assets/qrpic.png" id="qrPic" class="qr-pic"/>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: "Share",
    data () {
      return {
        topHeight: 0,
        active1: 0,
        shareLink: 'http://www.kkk.com/?miuytgrf',
        showBigCanvas: false
      }
    },
    mounted(){
      this.$nextTick(()=>{

        try{
          plus.navigator.setStatusBarStyle('light');
        }catch(Error){
          //
        }
        setTimeout(()=>{
          this._B.$emit('highlightnav', 3);
        }, 50)

        if(localStorage.getItem('ishb')){
          this.checkPlusReady();
        } else {
          document.querySelector("meta[name='theme-color']").setAttribute("content", "#0076bc");
        }

        this.drawCanvas();
      })
    },
    methods:{
      checkPlusReady(){
        //document.addEventListener('plusready', ()=>{
        plus.navigator.setStatusBarStyle('light');
        var immersed = 0;
        var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
        if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
          immersed=parseFloat(ms[2]);// 获取状态栏的高度
          this.topHeight = immersed;
        }
        //});
      },
      myProfile(){
        this.$router.push('/MyProfile');
      },
      drawCanvas(){
        QRCode.toCanvas(document.getElementById('canvas'),
          this.shareLink, { toSJISFunc: QRCode.toSJIS, width:148 }, (error)=>{
            if (error) console.error(error)
            console.log('success!')
          })

        //重优化画二维码
        var ctx = document.getElementById('bigCanvas').getContext("2d");
        ctx.drawImage(document.getElementById("qrPic"), 0, 0);
        ctx.drawImage(document.getElementById("canvas"), 123, 256);
      },
      withdraw(){
        localStorage.setItem('withdraw', 'dynamic');
        this.$router.push('/Withdraw');
      },
      shareUrl(){
        plus.share.sendWithSystem({content:'贵宾汇',href: this.shareLink}, ()=>{
          this.$toast.message('分享成功！');
        }, (e)=>{
          //console.log('分享失败：'+JSON.stringify(e));
        });
      },
      shareQR(justDownload){

        let base64Str = document.getElementById('bigCanvas').toDataURL('image/jpg');

        var bitmap=null;
        bitmap = new plus.nativeObj.Bitmap("test");
        bitmap.loadBase64Data(base64Str, ()=>{
          console.log("加载Base64图片数据成功");
          bitmap.save("_doc/camera/kkk_share_qrcode.png",{},(i)=>{
            console.log('保存图片成功：'+JSON.stringify(i));

            let fn = i.target;
            plus.gallery.save(fn, ()=>{
              if(justDownload==='download') {
                this.$toast.message('二维码图片已下载到相册！');
              } else {
                this.shareQRCode(fn);
              }
            });

          },(e)=>{
            console.log('保存图片失败：'+JSON.stringify(e));
            this.$toast.message('保存图片失败！');
          });
        }, ()=>{
          console.log('加载Base64图片数据失败：'+JSON.stringify(e));
        });


      },
      shareQRCode(fn){
        plus.share.sendWithSystem({type:'image/*', pictures:[fn], href:this.shareLink}, ()=>{
          this.$toast.message('分享图片成功！');
        }, (e)=>{
          //console.log();
          this.$toast.message('分享失败：'+JSON.stringify(e));
        });
      },
      copyUrl(){
        this.$toast.message(this.isAndroid?'Android':'iOS');
        if(this.isAndroid){

          let Context = plus.android.importClass("android.content.Context");
          let main = plus.android.runtimeMainActivity();
          let clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
          plus.android.invoke(clip,"setText",this.shareLink);
          this.$toast.message('已经复制到剪贴板！');
        } else if(this.isIOS) {
          let UIPasteboard  = plus.ios.importClass("UIPasteboard");
          let generalPasteboard = UIPasteboard.generalPasteboard();
          // 设置/获取文本内容:
          generalPasteboard.setValueforPasteboardType(this.shareLink, "public.utf8-plain-text");
          this.$toast.message('已经复制到剪贴板！');
        }
      },
      openCanvas(){
        this.showBigCanvas = true;
      },
      hideBigCanvas(){
        this.showBigCanvas = false;
      },
      nothing(){}
    }
  }
</script>

<style scoped>
  .main>div {
    padding:0;
    margin:0;
  }
  .canvas {
    background-color:#fff;border-radius:5px;
    position: absolute;
    top:50%;
    left:50%;
    margin:-74px 0 0 -74px;
  }
  .details-link {
    width:auto;
    font-size:14px;
    color:#0076bc;
    position: relative;
    float: right;
    transition:all 0.3s;
    padding:2px 4px 0 4px;
    border-radius:2px;
    text-align: right;
    margin:7px 20px 0 0;
  }
  .details-link>b {
    position: absolute;
    top:5px;
    right:-12px;
    display:block;
    float:right;
    width:0;
    height:0;
    border:solid 6px transparent;
    border-left-color:#666;
    border-right:none;
  }
  .details-link:active {
    background-color:#ccc;
  }
  .divider {
    margin:3px 10px 10px 10px;
    height:10px;
    overflow: visible;
    border-bottom:solid 1px #aaa;
    text-align: center;
    background-color:#f7f7f7;
  }
  .divider>span {
    display:block;
    width:80px;
    margin:0 auto;
    background-color:#f7f7f7;
  }
  .top-side {
    position: fixed;
    width:100%;
    left:0;
    background-color:#f7f7f7;
    border-bottom:solid 10px #f7f7f7;
    height:335px;
    z-index:8;
  }
  .list {
    padding:0 20px;
    border-top:solid 335px transparent;
    border-bottom:solid 70px transparent;
  }
  .underline {
    position: relative;
    padding:5px 15px 0 15px;
    margin:0;
    height: 32px;
    font-size:18px;
  }
  .underline>.ico {
    vertical-align: top;
  }
  .underline>span {
    display:inline-block;
    line-height:24px;
    vertical-align: top;
  }
  .underline>strong {
    display:block;
    float:right;
    margin-top:-2px;
    color:#0076bc;
  }
  .underline>strong>em {
    color:#aaa;
    font-weight:normal;
    font-size:14px;
    font-style: normal;
    display:inline-block;
    margin-right:5px;
  }
  .big-canvas-bg, .big-canvas-cont {
    position: fixed;
    z-index:11;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color:#000;
    opacity:0.5;
  }
  .big-canvas-cont {
    background-color:transparent;
    opacity:1;
  }
  .big-canvas {
    background-color:#fff;
    border-radius:10px;
    margin:130px auto 0 auto;
    width:300px;
    height:450px;
    box-shadow:0 5px 15px 0 #444;
  }
  .qr-pic {
    position: absolute;
    left:-200%;
    top:0;
  }
</style>
