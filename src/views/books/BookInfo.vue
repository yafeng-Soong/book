<template xmlns="http://www.w3.org/1999/html">
  <div class="bookInfo-container">
    <el-card v-if="isOwner" class="box-card">
      <el-steps :active="bookState" finish-status="success">
        <el-step title="新发布"></el-step>
        <el-step title="交换中"></el-step>
        <el-step title="交换完成"></el-step>
      </el-steps>
    </el-card>
    <el-card v-else class="box-card">
      <el-row>
        <el-col :span="2">
          <img class="owner-head" :src="imgUrl+bookOwner.headPath">
        </el-col>
        <el-col :span="10" style="font-size: 18px">{{bookOwner.name}}<br>发布于{{bookInfo.date}}</el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-carousel class="carousel"
                   indicator-position="outside"
                   type="card">
        <el-carousel-item class="carousel-item" v-for="(imgPath, index) in bookInfo.imgPaths" :key="index">
          <img class="book-imgs" :src="imgUrl+imgPath">
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 25px;font-weight: bold">图书详情</span>
        <el-button v-if="isOwner&&isNew" type="primary" icon="el-icon-edit" circle style="float: right"></el-button>
      </div>
      <div style="font-size: 18px">
        <p><i class="el-icon-info"></i>图书编号：{{bookInfo.bookId}}</p>
        <p><i class="el-icon-date"></i>发布时间:{{bookInfo.date}}</p>
        <p><i class="el-icon-menu"></i>类别：{{bookInfo.type}}</p>
        <p><i class="el-icon-edit-outline"></i>简介：{{bookInfo.introduction}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  import API from '@/api/index.js'
  import store from '@/store/index.js'
  import bus from '@/api/bus.js'
  export default {
    name: "BookInfo",
    data(){
      return {
        imgUrl: store.getters.getBaseUrl,
        book: [],
        bookOwner:[],
        bookInfo:[],
      }
    },
    computed:{
      isOwner(){
        return store.getters.getCurrentUser.email === this.bookOwner.email
      },
      bookState(){
        switch (this.bookInfo.state) {
          case 1: return 1
          case 2: case 3: return 2
          case 4: return 3
        }
      },
      isNew(){
        switch (this.bookInfo.state) {
          case 1:return true
          default:return false
        }
      }
    },
    created() {
      let that = this
      this.book = JSON.parse(sessionStorage.getItem('book'))
      //console.log(this.book)
      API.getBookInfo(this.book.bookId)
        .then(res => {
          that.bookInfo = res
        })
        .catch(err => {
          console.log('获取图书详细信息出错:' + err)
        })
      API.getUserInfo({email:this.book.email})
        .then(res => {
          that.bookOwner = res
        })
        .catch(err => {
          console.log("getOwnerHead获取用户信息出错" + err)
        })
    }
  }
</script>

<style lang="scss" scoped>
  p{
    margin: 5px;
  }
  .box-card{
    margin: 10px;
  }
  .owner-head{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    box-shadow: 0 0 5px gray;
    &:hover{

    }
  }
  .bookInfo-container{
    .carousel{
      margin: 10px auto;
      height: 350px;
      text-align: center;
      .carousel-item {
        margin: 20px auto;
        color: #475669;
        height: 300px;
        .book-imgs {
          height: 250px;
        }
      }
    }
  }

</style>
