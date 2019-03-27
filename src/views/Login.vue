<template>
  <div class="bg"  v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <!--<div class="loginContent">-->
      <el-form class="loginForm">
        <img src="@/assets/logo.png" width="90" height="90"/>
        <h2>二手图书交易</h2>
        <el-form-item>
          <el-input placeholder="邮箱" v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password" v-model="userData.pwd" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    <!--</div>-->
  </div>
</template>

<script>
  import {request} from "@/api/index.js"
  import API from "@/api"
  import Qs from 'qs'
  import store from '@/store'
  export default {
    name: "Login",
    data(){
      return{
        userData:{
          email:'',
          pwd:'',
        },
        loading:false
      }
    },
    methods:{
      login(){
        this.loading = true
        let that = this
        API.login(Qs.stringify(that.userData))
          .then(res => {
            if (res.code === '103'){
              // that.$message.success("~请稍等~")
              console.log('当前登录用户：'+ that.userData.email)
              store.commit('SET_USERINFO',{email:that.userData.email})
              store.dispatch('setUserInfo',that.userData.email)
              setTimeout(() => {
                that.loading = false
                that.$router.replace('/home');
              }, 1500)
            }else {
              console.log(res.msg)
              that.loading = false
              that.$message.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
            that.loading = false
            that.$message.error(err.toString())
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg{
    width: 100%;
    height: 100%;
    background-image: url("../assets/login_bg.jpg");
    background-size: 100%;
    text-align: center;
    position: absolute;
    display: block;
    .loginForm{
      margin: 12% auto;
      border-radius: 5px;
      width: 400px;
      padding: 35px 35px 15px;
      background-color: lavender;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
  }
</style>

