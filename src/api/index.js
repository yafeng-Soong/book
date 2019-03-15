import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

Vue.$message = Message //用于弹出消息

axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'http://127.0.0.1:8082':"http://132.232.89.108:8082";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true //允许跨域携带cookie


// axios.defaults.headers['Access-Control-Allow-Origin'] =  '*'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(function (config) {
  //为每个请求增加token
  if (sessionStorage.getItem("currentUser")) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    config.headers['token'] = currentUser.email
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);

});

function methodGet(url,params) {
  return new Promise((resolve,reject) => {
    axios.get(url,{params})
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function methodPost(url,params,headers={}) {
  return new Promise((resolve,reject) => {
    axios.post(url,params,{headers})
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}


export default {
  methodGet,
  methodPost,
  login(params) {
    return new methodPost("/user/login", params)
  },
  logout(){
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    return new methodGet("/user/logout",{email:currentUser.email})
  },
  getUserInfo(params) {
    return new methodGet("/user/selectByEmail",params)
  },
  getBookByName(params){
    return new methodGet("/book/selectByName",params)
  },
  getBookAll(){
    return new methodGet("/book/selectAll")
  },
  getMyBooks(){
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    return new methodGet("/book/selectByEmail",{email:currentUser.email})
  },
  getBookInfo(params){
    return new methodGet('book/selectWithComments',{bookId:params})
  },

}
