<!-- 
<template>
    <el-upload
    class="upload-demo"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    list-type="picture"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template> 
-->
<template>
  <div class="app-container">
    <el-header>{{title}}</el-header>
    <div class="editor-container">
        <el-upload class="myDropzone"
            drag
            :show-file-list = false 
            :action="this.url" 
            :on-success="uploadSuccess"
            :headers="this.heads" 
            list-type="picture">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">{{tips}}</div>
        </el-upload>
    </div>
    <div class="uploadApp-wrapper" v-if="this.showUploadView">
      <div class="uploadContent">
        <img src="/src/assets/icon/loadding.gif">
        <div style="font-size: 20px;margin-top: 30px;color: #6477F2" v-html="`正在上传中...${this.progress}%`"></div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        props: {
            url : {
                type : String,
                required : true
            },
            tips : {
                type: String,
                default: ''
            },
            accept: {
                type: String,
                default:''
            },
            title: {
                type: String,
                default: ''
            },
            headers: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showUploadView : false,
                progress : 0,
                heads:{}
            };
        },
        computed: {

        },
        created() {

        },
        mounted() {

        },
        watch: {

        },
        methods: {
            handleHeades() {
                const _headers = this.headers
                this.heads = JSON.parse(_headers)
            },
            cancelUpload() {
                var a=''
                var b=''
            },
            beginLoad() {
                const _this = this
                // 取消上传使用
                var a=''
                var b=''
            },
            uploadSuccess (response, file, fileList) {
                var a=''
                var b=''
            }
        },
        components: {

        },
    };
</script>

<!-- <style scoped lang="scss"> -->
<style lang="scss">
    .editor-container {
        //overflow:hidden;
    }

    .myDropzone{
        position: relative;
        justify-content: center;
        align-items: center;
        margin-top: 0.5em;
        width: 100%;
        height: 100%;
        // overflow:hidden;
        text-align: center;
    }
    .el-upload {
        // overflow:hidden;
        width: 100%;
        height: 100%;
    }
    .el-upload-dragger {
       // display: none;
       // position: fixed;
       width: 100%;
       // height: 100%;
    }

    .uploadApp-wrapper {
      // position: fixed;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      z-index: 1000;
      text-align: center;
    }
    .uploadApp-wrapper .uploadContent {
      position: absolute;
      width: 240px;
      height: 240px;
      background-color: white;
      box-shadow: 0px 0px 6px 0px rgba(224,231,239,1);
      border-radius: 20px;
      top: calc(50% - 120px);
      left: 50%;
      margin-left: -120px;
    }
    .uploadApp-wrapper .uploadContent img {
      margin-top: 95px;
    }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
      width: 20rem;
      margin: auto;
    }
</style>
