<template>
  <div class="top-header">
    <!--<div>{{currentUser}}</div>-->
    <!--<div>{{typeof (currentUser)}}</div>-->
    <p class="header-title">{{title}}</p>
    <div class="person-info">
      <el-dropdown>
        <img class="head-img" :src="headImgUrl">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <i class="el-icon-circle-close-outline"></i>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="user-name">{{currentUser.name}}</div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import bus from '@/api/bus.js'
  import API from '@/api/index.js'
  export default {
    name: "Header",
    data(){
      return{
        currentUser: store.getters.getCurrentUser,
        title:''
      }
    },
    methods:{
      logout(){
        let that = this
        API.logout()
          .then(res => {
            this.$message.info(res)
            sessionStorage.removeItem("currentUser")
            this.$router.push('/login')
          })
          .catch(err => {
            console.log('退出登录出错：' + err)
            this.$message.error("网络出了点小差~~")
          })
      },
    },
    computed:{
      headImgUrl: function () {
        return store.getters.getBaseUrl+store.getters.getCurrentUser.headPath
      },
    },
    mounted() {
      bus.$on('setTitle',title => {
        this.title = title
      })
    }
  }
</script>

<style lang="scss" scoped>
  .top-header{
    height: 100%;
    text-align: center;
    .header-title{
      display: inline;
      width: 30%;
      font-size: 50px;
    }
  }
  .person-info{
    height: 100px;
    width: 60px;
    float: right;
    margin: 10px auto;
    .user-name{
      height: 20px;
      width: 100%;
      text-align: center;
    }
    .head-img{
      background-color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: auto;
      box-shadow: 0 0 15px gray;
    }
  }

</style>
