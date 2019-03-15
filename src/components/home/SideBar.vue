<template>
    <div class="sideBar">
      <img src="@/assets/logo.png" alt="logo" width="90" height="90">
      <div class="sideBar-menu">
        <el-menu
          class="sideBar-el-menu"
          router
          unique-opened
        >
          <el-menu-item index="/searchBooks">图书市场</el-menu-item>
          <el-menu-item index="/myBooks">我的书架</el-menu-item>
          <el-menu-item >发布图书</el-menu-item>
          <el-menu-item >我的留言</el-menu-item>
          <el-menu-item >个人中心</el-menu-item>
        </el-menu>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SideBar"
    }
</script>

<style lang="scss" scoped>
  .sideBar{
    width: 150px;
    height: 100%;
    background-color: lightblue;
    text-align: center;
    &>img{
      margin: 35px auto;
    }
    &-menu{
      .sideBar-el-menu{
        width: 150.5px;
        background-color: lightblue;
      }
    }
  }
</style>
