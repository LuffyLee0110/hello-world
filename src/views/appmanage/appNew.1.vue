<template>
  <div class="app-container">
    <el-header>请上传Android/iOS企业版应用</el-header>
        <el-button class="uploadWrapper button-style-main"><i class="icon-ic_upload"></i>上传应用</el-button>
        <input
          alt=""
          title="上传应用"
          ref="referenceUpload"
          accept=".ipa, .apk"
          @change="referenceUpload"
          type="file"
          style="position: absolute;top: 0px;left: 0px;width: 144px;height: 48px;opacity: 0;cursor:pointer;">
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
