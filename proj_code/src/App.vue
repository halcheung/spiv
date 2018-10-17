<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
  .back {
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

</style>
