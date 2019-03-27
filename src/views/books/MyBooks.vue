<template>
  <div>
    <el-row>
      <el-col class="cards-col">
        <router-link to="/bookInfo">
          <el-card class="cards" v-for="(book,index) in myBookList" :key="index" @click.native="gotoBookInfo(book)">
            <el-badge :value="getState(book.state)" :type="getBadgeType(book.state)" class="badge-item" style="float: right"></el-badge>
            <img class="bookImage" :src="imgUrl + book.imgPath">
            <div class="bookDescription">
              <h1>{{book.name}}</h1>
              <p>{{book.introduction}}</p>
              <p>图书编号：{{book.bookId}}</p>
              <p>发布时间:{{book.date}}</p>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import API from '@/api/index.js'
  import store from '@/store'
  import bus from '@/api/bus.js'
  // import BookInfo from './BookInfo.vue'
  export default {
    name: "MyBooks",
    data(){
      return{
        imgUrl: store.getters.getBaseUrl,
        myBookList:[]
      }
    },
    computed:{
      getState() {
        return bookState => {
          switch (bookState) {
            case 1:return '新'
            case 2:return '等待对方确认'
            case 3:return '等待处理'
            case 4:return '已交换'
          }
        }
      },
      getBadgeType(){
        return bookState => {
          switch (bookState) {
            case 1:return 'danger'
            case 2:return 'warning'
            case 3:return 'primary'
            case 4:return 'success'
          }
        }
      }
    },
    methods:{
      gotoBookInfo(book){
        console.log("卡片被点击了~")
        // bus.$emit('click-book',book)
        sessionStorage.setItem('book',JSON.stringify(book))
        this.$router.push('/bookInfo')

      }
    },
    created() {
      let that = this
      API.getMyBooks()
        .then(res => {
          that.myBookList = res
        })
        .catch(err => {
          console.log("/books/selectByEmail出错："+err)
          that.$message.error("~网络出了点小差~")
        })
    }
  }
</script>

<style lang="scss">
  .cards-col{
    height: 200px;
    .cards{
      margin: 15px;
      width: 95%;
      height: 200px;
      &:hover{
        box-shadow: 0 0 25px gray;
      }
      .badge-item{
        sup{
          line-height: 30px;
          border-radius: 50%;
          font-size: 15px;
          height: 30px;
          min-width: 30px;
        }
      }
      .bookImage{
        max-width: 160px;
        float: left;
      }
      .bookDescription{
        float: left;
        margin: 20px;
      }
    }
  }
</style>
