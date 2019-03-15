<template>
  <div class="bookInfo-container">
    <el-card v-if="isOwner" class="box-card">
      <el-steps :active="bookState" finish-status="success">
        <el-step title="新发布"></el-step>
        <el-step title="交换中"></el-step>
        <el-step title="交换完成"></el-step>
      </el-steps>
    </el-card>
    <el-card v-else class="box-card">
      <div>
        <img class="owner-head" :src="imgUrl+bookOwner.headPath">
        <span style="font-size: 18px">发布于{{bookInfo.date}}</span>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-carousel class="carousel" indicator-position="outside" type="card">
        <el-carousel-item class="carousel-item" v-for="(imgPath, index) in bookInfo.imgPaths" :key="index">
          <img class="book-imgs" :src="imgUrl+imgPath">
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 25px;font-weight: bold">图书详情</span>
        <el-button v-if="isOwner" type="primary" icon="el-icon-edit" circle style="float: right"></el-button>
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
  export default {
    name: "BookInfo",
    data(){
      return {
        imgUrl: store.getters.getBaseUrl,
        book: [],
        bookOwner:[],
        bookInfo:[]
      }
    },
    methods:{
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
      }
    },
    created() {
      this.book = JSON.parse(sessionStorage.getItem('book'))
      console.log(this.book)
      let that = this
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
    height: 35px;
    width: 35px;
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
          max-height: 250px;
        }
      }
    }
  }

</style>
