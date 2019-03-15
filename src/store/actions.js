import API from '@/api'

const actions={
   setUserInfo: function({commit},currentUser){
     API.getUserInfo({email:currentUser})
       .then(res => {
         commit('SET_USERINFO',res)
       })
       .catch(err => {
         console.log("获取用户信息出错！" + err)
       })
   }
}

export default actions
