<template>
  <!-- <div class="app-container">
    <el-header>请上传Android/iOS企业版应用</el-header>
    <div class="editor-container">
      <dropzone 
        id="myVueDropzone" 
        url="https://test.cdkfzx.com:21005/api/apps/5be0060eff2d9261ee8b387f/upload" 
        acceptedFiles=".ipa, .apk, .zip, .png"
        headers='{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViZTAwNjBlZmYyZDkyNjFlZThiMzg3ZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0sImV4cCI6MTU0OTA5MzI2NiwiaWF0IjoxNTQ5MDg5NjY2fQ.jk4QfGh_m3am7t0io4tUtw1Oy0pP5x2bEx-HrkXeg8M"}'
        defaultMsg="上传Android/iOS企业版应用" 
        dictMaxFilesExceeded="一个一个"
        @dropzone-removedFile="dropzoneR" 
        @dropzone-success="dropzoneS"/>
    </div>    
  </div> -->
  <TempDropzone
    id="myVueDropzone" 
    url="https://test.cdkfzx.com:21005/api/apps/5be0060eff2d9261ee8b387f/upload" 
    acceptedFiles=".ipa, .apk, .zip, .png"
    headers='{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViZTAwNjBlZmYyZDkyNjFlZThiMzg3ZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0sImV4cCI6MTU1MDA1NDA0OCwiaWF0IjoxNTUwMDUwNDQ4fQ.7KtN1vYro0tQhQ5Um2-wKRDXj3ktKIssfHJbduuiHR0"}'
    defaultMsg="上传Android/iOS企业版应用" 
    dictMaxFilesExceeded="一个一个"
    @dropzone-removedFile="dropzoneR" 
    @dropzone-success="dropzoneS"
  />
</template>

<script>
// import Dropzone from '@/components/Dropzone'
import TempDropzone from '@/components/Templates/TempDropzone/TempDropzone'

export default {
  name: 'DropzoneDemo',
  components: { TempDropzone },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
      // this.$router.push({
      //   name: 'AppDetail',
      //   params: {
      //     disabled: false,
      //     ifEdit: false
      //   }
      // })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
