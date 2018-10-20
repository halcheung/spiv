<template>
  <div>
    <router-view />
    <div class="navi-cont">
      <mu-row>
        <mu-col span="1"></mu-col>
        <mu-col span="2" :key="n.cap" v-for="(n,index) in nav">
          <mu-ripple :class="'nav '+n.sta" @click="navClick(index);">
            <mu-icon :value="n.ico" class="nav-icon"></mu-icon>
            <span class="nav-cap">{{n.cap}}</span>
          </mu-ripple>
        </mu-col>
        <mu-col span="1"></mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainHome',
    data () {
      return {
        nav: [],
      }
    },
    mounted(){
      this.$nextTick(()=>{

        this.nav = this.navigations;
        if(location.hash==='#/MainHome'){
          this.navClick(0);
        }

        this._B.$on('nav',(index)=>{
          this.navClick(parseInt(index,10));
        });

        this._B.$on('highlightnav',(index)=>{
          for(let i=0;i<this.nav.length;i++){
            if(index!==i){
              this.nav[i].sta = 'off';
            } else {
              this.nav[i].sta = 'on';
            }
          }
        });

      })
    },
    methods:{
      navClick(index){
        for(let i=0;i<this.nav.length;i++){
          if(index!==i){
            this.nav[i].sta = 'off';
          } else {
            this.nav[i].sta = 'on';
          }
        }
        this.$router.push('/MainHome/'+this.nav[index].path);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
