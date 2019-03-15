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
  * {
    margin: 0;
    padding: 0;
  }
  html,body,#app,.home{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  /*html, body, #app, .home {*/
    /*height: 100%;*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*overflow: hidden;*/
  /*}*/

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  }
</style>
