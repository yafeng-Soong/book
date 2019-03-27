<template>
  <div>
    <el-card>
      <el-form :rules="rules" label-width="180px" :model="book" ref="ruleForm" style="width:80%;margin: 5% auto">
        <el-form-item label="图书名称" prop="name">
          <el-input v-model="book.name"></el-input>
        </el-form-item>
        <el-form-item label="图书类别" prop="type">
          <el-select v-model="book.type" multiple style="width: 100%">
            <el-option v-for="type in bookTypes"
                       :label="type.label"
                       :value="type.value"
                       :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加描述">
          <el-input :rows="8" type="textarea" placeholder="简单描述一下吧" v-model="book.introduction"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <el-upload
            action=""
            ref="upload"
            accept="image/jpeg,image/png,image/jpg"
            :limit="3"
            :auto-upload="false"
            list-type="picture-card"
            :on-change = "handleFileList"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImg"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">注意！只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="publish('ruleForm')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  import API from "@/api/index.js"
  import store from '@/store'
  export default {
    name: "PublishBook",
    data(){
      return{
        bookId: '',
        dialogVisible: false,
        dialogImageUrl: '',
        fileList: [],
        imgNumber: 0,
        rules: {
          name: [
            {required: true, message: '请输入图书名称', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择图书类型', trigger: 'blur'}
          ],
        },
        book: {
          name: '',
          type: '',
          email: store.getters.getCurrentUser.email,
          introduction:''
        },
        bookTypes: [
          {label:"历史",value:"历史"},
          {label:"计算机",value:"计算机"},
          {label:"小说",value:"小说"},
          {label:"艺术",value:"艺术"},
          {label:"经济",value:"经济"},
          {label:"文学",value:"文学"},
          {label:"杂志",value:"杂志"},
          {label:"其他",value:"其他"},
        ]
      }
    },
    methods:{
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadImg(param) {
        let that = this
        that.imgNumber += 1
        console.log("that.imgNumber" + that.imgNumber)
        console.log(that.bookId)
        console.log(param)
        const formData = new FormData()
        formData.append('file', param.file)
        formData.append('imgNumber', (that.imgNumber).toString())
        formData.append('bookId', that.bookId)
        API.uploadBookImgs(formData)
          .then(res => {
            if (res.code === '201') {
              console.log('上传图片成功')
              that.$message.success("发布成功！")
              that.$router.replace("/myBooks")
              //param.onSuccess()  // 上传成功的图片会显示绿色的对勾
            }else{
              console.log('上传图片失败！')
              //param.onError()
            }
          })
          .catch(err => {
            console.log('网络错误！'+err)
            that.$message.error(err)
            //param.onError()
          })
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleFileList(file,fileList){
        this.fileList.push(file)
        console.log(this.fileList)
      },
      handleExceed(files, fileList){
        this.$message.error("最多只能选择三张图片！")
      },
      publish(formName){
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let types = ""
            for (let item of that.book.type){
              types += item + '/'
            }
            that.book.type = types
            API.publishBook(that.book)
              .then(res => {
                if (res.code === '302'){
                  that.bookId = res.msg
                  // that.uploadImg(that)
                  that.$refs.upload.submit()
                }
              })
              .catch(err => {
                that.$message.error(err)
              })
          } else {
            this.$message.error("请输入必填字段")
            return false;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item{
    width: 700px;
  }


</style>
