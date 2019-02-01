<template>
  <div class="app-container">
    <el-header>请上传Android/iOS企业版应用</el-header>
    <div class="editor-container">
      <!-- <dropzone 
        id="myVueDropzone" 
        url="https://httpbin.org/post" 
        acceptedFiles=".ipa, .apk, .zip, .png"
        defaultMsg="上传Android/iOS企业版应用" 
        dictMaxFilesExceeded="一个一个"
        @dropzone-removedFile="dropzoneR" 
        @dropzone-success="dropzoneS"/> -->
        <Dropzone></Dropzone>
    </div>
  </div>
</template>

<script>
// import Dropzone from '@/components/Dropzone'
import Dropzone from '@/components/Templates/TempDropzone/TempDropzone'

export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
      this.$router.push({
        name: 'AppDetail',
        params: {
          disabled: false,
          ifEdit: false
        }
      })
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
    width: 20rem;
    margin: auto;
  }
</style>
