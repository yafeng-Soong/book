<template>
  <div class="home">
    <el-container class="home-container">
      <el-aside class="aside" width="150px">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header class="header" style="height: 100px">
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideBar from "../components/home/SideBar";
  import Header from "../components/home/Header";
  import bus from "@/api/bus.js"
  export default {
    name: "Home",
    components: {
      SideBar,
      Header
    },
    data(){
      return{
        sideBarName: SideBar.name
      }
    },
    created(){

    },
    watch:{
      '$route'(to,from){
        bus.$emit('setTitle',to.meta.title)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-container{
    height: 100%;
    .header{
      background-color: lavender;
      box-shadow:3px 0 10px gray;
    }
    .aside{
      overflow: hidden;
    }
  }
</style>
