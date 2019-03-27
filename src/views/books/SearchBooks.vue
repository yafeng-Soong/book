<template>
  <div class="search">
    <el-autocomplete class="search-box"
      v-model="bookName"
      clearable
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入图书名"
      @select="handleSelect"
    >
      <el-select v-model="bookType" style="width: 150px" slot="prepend" placeholder="请选择图书类型">
        <el-option label="历史" value="历史"></el-option>
        <el-option label="计算机" value="计算机"></el-option>
        <el-option label="小说" value="小说"></el-option>
        <el-option label="艺术" value="艺术"></el-option>
        <el-option label="经济" value="经济"></el-option>
        <el-option label="文学" value="文学"></el-option>
        <el-option label="杂志" value="杂志"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="selectBook"></el-button>
      <template slot-scope="{ item }">
        <div class="name">
          {{ item.value }}
          <el-badge :value="'新'" class="item" style="float: right">
          </el-badge>
        </div>
      </template>
    </el-autocomplete>
    <el-button type="success" @click="resetBook">重置</el-button>

    <div class="cards-div">
      <el-row style="width:80%;margin: 20px auto;">
        <el-col  class="cards-col" v-for="(book,index) in bookList" :key="index">
          <el-card class="el-cards" @click.native="gotoBookInfo(book)">
            <img :src="imgUrl+book.imgPath" class="bookImages">
            {{book.name}}
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import API from "@/api/index.js"
  import axios from 'axios'
  import store from '@/store'
  export default {
    name: "SearchBooks",
    data(){
      return {
        bookName:'',
        bookType:'',
        bookList:[],
        imgUrl: store.getters.getBaseUrl
      }
    },
    methods:{
      selectBook(){
        let that = this
        if (that.bookName === '')
          that.$message.warning("图书不能为空~")
        else{
          API.getBookByName({name:that.bookName})
            .then(res => {
              that.bookList = res
              console.log(that.bookList)
            })
            .catch(err => {
              that.$message.error(err)
            })
        }
      },
      resetBook(){
        let that = this
        API.getBookAll()
          .then(res => {
            that.bookList = res
          })
          .catch(err => {
            console.log("获取图书列表出错：" + err)
            that.$message.error("网络出了点小差~~无法获取图书")
          })
      },
      querySearchAsync(queryString, cb) {
        API.getBookAll()
          .then( res => {
            let results = queryString ? res.filter(this.createStateFilter(queryString)) : res
            results.map((x) => {x.value = x.name})
            cb(results)
          })
          .catch(err => {
            cb([])
          })
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.name.indexOf(queryString) != -1);
        };
      },
      handleSelect(item) {
        this.bookName = item.name
      },
      gotoBookInfo(book){
        console.log("卡片被点击了~")
        sessionStorage.setItem('book',JSON.stringify(book))
        this.$router.push('/bookInfo')
      }
    },
    created() {
      this.resetBook()
    }
  }
</script>

<style lang="scss" scoped>
  .search{
    height: 100%;
    width: 100%;
    text-align: center;
    .search-box{
      width: 70%;
      position: sticky;
    }
    .cards-div{
      margin-top: 10px;
      max-height: 90%;
      overflow-x: auto;
      .cards-col{
        width: 250px;
        height: 250px;
        margin: 20px;
        .el-cards{
          background-color: aliceblue;
          height: 100%;
          width: 100%;
          &:hover{
            box-shadow: 0 0 25px gray;
          }
          .bookImages{
            margin: 10px auto;
            width: 150px;
            height: 150px;
            display: block;
          }
        }
      }
    }
  }
</style>
