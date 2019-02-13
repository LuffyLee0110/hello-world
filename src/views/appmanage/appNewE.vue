<template>
  <TempDropzoneE
    url="https://test.cdkfzx.com:21005/api/apps/5be0060eff2d9261ee8b387f/upload" 
    accept=".ipa, .apk, .zip, .png"
    headers= '{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViZTAwNjBlZmYyZDkyNjFlZThiMzg3ZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0sImV4cCI6MTU0OTg4MTUyNywiaWF0IjoxNTQ5ODc3OTI3fQ.dEx45g1THC87M6lgMZbV7R41dxHI4T8_d1Kkx7K1dFo"}'
    tips="只能上传jpg/png文件，且不超过500kb" 
    title="请上传Android/iOS企业版应用" 
    @closeUpload="closeUploadMethod"
    @uploadSuccess="uploadSuccessMethod"
    ref="referenceUpload"
    @change="referenceUpload"
  ></TempDropzoneE>
</template>

<script>
// import TempDropzone from '@/components/Templates/TempDropzone/TempDropzone'
import TempDropzoneE from '@/components/Templates/TempDropzone/TempDropzoneE'

export default {
  name: 'DropzoneDemo',
  components: { TempDropzoneE },
  data() {
    return {
      showUploadView: false,
      file: FileList
    }
  },
  methods: {
    referenceUpload(e) {
      this.file = e.target.files
      // console.log(this.file)
      if (e.target.files.length > 0) {
        this.showUploadView = true
      }
    },
    closeUploadMethod() {
      this.showUploadView = false
      // 置空，input file 如果第二次选择的文件跟上一次是同一个文件，则不会触发onchange事件，需要将value置空
      this.$refs.referenceUpload.value = ''
    },
    uploadSuccessMethod() {
      this.$refs.referenceUpload.value = ''
      this.showUploadView = false
      // 上传成功
      this.bus.$emit('uploadSuccess')
      this.$router.push({
        name: 'AppDetail',
        params: {
          disabled: false,
          ifEdit: false
        }
      })
    },
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

</style>
