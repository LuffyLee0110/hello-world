<template>
  <div class="app-container">
    <el-header>请上传Android/iOS企业版应用</el-header>
    <div class="editor-container">
      <dropzone 
        id="myVueDropzone" 
        url="https://httpbin.org/post" 
        acceptedFiles=".ipa, .apk, .zip"
        defaultMsg="上传Android/iOS企业版应用" 
        @dropzone-removedFile="dropzoneR" 
        @dropzone-success="dropzoneS"/>
    </div>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'

export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>

<style scoped lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
