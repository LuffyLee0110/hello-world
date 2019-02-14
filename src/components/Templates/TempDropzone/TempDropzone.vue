<template>
  <div class="app-container">
    <el-header>请上传Android/iOS企业版应用</el-header>
    <div class="editor-container">
      <div class="dropzone"
        :ref="id" 
        :action="url" 
        :id="id" >
        <input type="file" name="file">
      </div>
    </div>
    <div class="uploadApp-wrapper" v-if="this.showUploadView">
      <div class="uploadContent">
        <img src="/src/assets/icon/loadding.gif">
        <div style="font-size: 20px;margin-top: 30px;color: #6477F2" v-html="`正在上传中...${this.progress}<br/>请稍等`"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
// import { getToken } from 'api/qiniu';

Dropzone.autoDiscover = false

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    clickable: {
      type: Boolean,
      default: true
    },
    defaultMsg: {
      type: String,
      default: '上传图片'
    },
    acceptedFiles: {
      type: String,
      default: ''
    },
    thumbnailHeight: {
      type: Number,
      default: 200
    },
    thumbnailWidth: {
      type: Number,
      default: 200
    },
    showRemoveLink: {
      type: Boolean,
      default: true
    },
    maxFilesize: {
      type: Number,
      default: 200
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    autoProcessQueue: {
      type: Boolean,
      default: true
    },
    useCustomDropzoneOptions: {
      type: Boolean,
      default: false
    },
    defaultImg: {
      default: '',
      type: [String, Array]
    },
    couldPaste: {
      type: Boolean,
      default: false
    },
    headers: {
      type: String,
      default:''
    }
  },
  data() {
    return {
      dropzone: '',
      initOnce: true,
      showUploadView: false,
      progress: 0
    }
  },
  watch: {
    defaultImg(val) {
      if (val.length === 0) {
        this.initOnce = false
        return
      }
      if (!this.initOnce) return
      this.initImages(val)
      this.initOnce = false
    }
  },
  mounted() {
    const element = document.getElementById(this.id)
    const vm = this
    const _headers = JSON.parse(this.headers)
    this.dropzone = new Dropzone(element, {
      clickable: this.clickable,
      thumbnailWidth: this.thumbnailWidth,
      thumbnailHeight: this.thumbnailHeight,
      maxFiles: this.maxFiles,
      maxFilesize: this.maxFilesize,
      dictRemoveFile: 'Remove',
      addRemoveLinks: this.showRemoveLink,
      acceptedFiles: this.acceptedFiles,
      headers:_headers,
      autoProcessQueue: this.autoProcessQueue,
      dictDefaultMessage: '<i style="margin-top: 3em;display: inline-block" class="material-icons">' + this.defaultMsg + '</i><br>Drop files here to upload',
      dictMaxFilesExceeded: '最多只能传一个文件',
      previewTemplate: '<div class="dz-preview dz-file-preview">'  +
                          '<div class="dz-image" style="width:' +  this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px" >' +
                            '<img style="width:' + this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px" data-dz-thumbnail />' +
                          '</div> ' +
                          '<div class="dz-details">' +
                            '<div class="dz-size"><span data-dz-size></span></div>'+
                            '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  '+
                            '<div class="dz-error-message"><span data-dz-errormessage></span></div>  '+
                            '<div class="dz-success-mark"> <i class="material-icons">done</i> </div>  '+
                            '<div class="dz-error-mark"><i class="material-icons">error</i></div>'+
                          '</div>'+
                        '</div>',
      // default previewTemplate
      // previewTemplate: '<div class="dz-preview dz-file-preview">'+
      //                     '<div class="dz-details">'+
      //                       '<div class="dz-filename"><span data-dz-name></span></div>'+
      //                       '<div class="dz-size" data-dz-size></div>'+
      //                       '<img data-dz-thumbnail />'+
      //                     '</div>'+
      //                     '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>'+
      //                       '<div class="dz-success-mark"><span>✔</span></div>'+
      //                       '<div class="dz-error-mark"><span>✘</span></div>'+
      //                       '<div class="dz-error-message"><span data-dz-errormessage></span></div>'+
      //                     '</div>',
      init() {
        const val = vm.defaultImg
        if (!val) return
        if (Array.isArray(val)) {
          if (val.length === 0) return
          val.map((v, i) => {
            const mockFile = { name: 'name' + i, size: 12345, url: v }
            this.options.addedfile.call(this, mockFile)
            this.options.thumbnail.call(this, mockFile, v)
            mockFile.previewElement.classList.add('dz-success')
            mockFile.previewElement.classList.add('dz-complete')
            vm.initOnce = false
            return true
          })
        } else {
          const mockFile = { name: 'name', size: 12345, url: val }
          this.options.addedfile.call(this, mockFile)
          this.options.thumbnail.call(this, mockFile, val)
          mockFile.previewElement.classList.add('dz-success')
          mockFile.previewElement.classList.add('dz-complete')
          vm.initOnce = false
        }
      },
      accept: (file, done) => {
        /* 七牛*/
        // const token = this.$store.getters.token;
        // getToken(token).then(response => {
        //   file.token = response.data.qiniu_token;
        //   file.key = response.data.qiniu_key;
        //   file.url = response.data.qiniu_url;
        //   done();
        // })
        done()
      },
      sending: (file, xhr, formData) => {
        // formData.append('token', file.token);
        // formData.append('key', file.key);
        this.showUploadView = true
        vm.initOnce = false
      },
      processing : (file,progress,bytesSent) => {
        var a=''
        var b=''
        console.log('process 1')
      },
      uploadprogress: (file, progress, bytesSent) => {
        var a=''
        var b=''
        this.progress = progress
        if(progress===100){
          this.showUploadView = false
        }
      },
      totaluploadprogress: (uploadProgress,totalBytes,totalBytesSent) => {
        var a=''
        var b=''
        this.progress = uploadProgress
        if(uploadProgress===100){
          this.showUploadView = false
        }
      }
    })

    if (this.couldPaste) {
      document.addEventListener('paste', this.pasteImg)
    }

    this.dropzone.on('success', file => {
      vm.$emit('dropzone-success', file, vm.dropzone.element)
    })
    this.dropzone.on('addedfile', file => {
      vm.$emit('dropzone-fileAdded', file)
    })
    this.dropzone.on('removedfile', file => {
      vm.$emit('dropzone-removedFile', file)
    })
    this.dropzone.on('error', (file, error, xhr) => {
      vm.$emit('dropzone-error', file, error, xhr)
    })
    this.dropzone.on('successmultiple', (file, error, xhr) => {
      vm.$emit('dropzone-successmultiple', file, error, xhr)
    })
    this.dropzone.on('uploadprogress', (file, progress, bytesSent) => {
      vm.$emit('dropzone-uploadprogress', file, progress, bytesSent)
    })
    this.dropzone.on('processing', (file, progress, bytesSent) => {
      vm.$emit('dropzone-processing', file, progress, bytesSent)
    })
    this.dropzone.on('totaluploadprogress', (uploadProgress,totalBytes,totalBytesSent) =>{
      vm.$emit('dropzone-totaluploadprogress', uploadProgress, totalBytes, totalBytesSent)
    })
  },
  destroyed() {
    document.removeEventListener('paste', this.pasteImg)
    this.dropzone.destroy()
  },
  methods: {
    removeAllFiles() {
      this.dropzone.removeAllFiles(true)
    },
    processQueue() {
      this.dropzone.processQueue()
    },
    pasteImg(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items
      if (items[0].kind === 'file') {
        this.dropzone.addFile(items[0].getAsFile())
      }
    },
    initImages(val) {
      if (!val) return
      if (Array.isArray(val)) {
        val.map((v, i) => {
          const mockFile = { name: 'name' + i, size: 12345, url: v }
          this.dropzone.options.addedfile.call(this.dropzone, mockFile)
          this.dropzone.options.thumbnail.call(this.dropzone, mockFile, v)
          mockFile.previewElement.classList.add('dz-success')
          mockFile.previewElement.classList.add('dz-complete')
          return true
        })
      } else {
        const mockFile = { name: 'name', size: 12345, url: val }
        this.dropzone.options.addedfile.call(this.dropzone, mockFile)
        this.dropzone.options.thumbnail.call(this.dropzone, mockFile, val)
        mockFile.previewElement.classList.add('dz-success')
        mockFile.previewElement.classList.add('dz-complete')
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .dropzone {
        border: 2px solid #E5E5E5;
        font-family: 'Roboto', sans-serif;
        color: #777;
        transition: background-color .2s linear;
        padding: 5px;
        text-align: center;
        width: 70%;
        margin: auto;
        height: 15em;
    }

    .dropzone:hover {
        background-color: #F6F6F6;
    }

    i {
        color: #CCC;
    }

    .dropzone .dz-image img {
        width: 100%;
        height: 100%;
    }

    .dropzone input[name='file'] {
        display: none;
    }

    .dropzone .dz-preview .dz-image {
        border-radius: 0px;
    }

    .dropzone .dz-preview:hover .dz-image img {
        transform: none;
        -webkit-filter: none;
        width: 100%;
        height: 100%;
    }

    .dropzone .dz-preview .dz-details {
        bottom: 0px;
        top: 0px;
        color: white;
        background-color: rgba(33, 150, 243, 0.8);
        transition: opacity .2s linear;
        text-align: left;
    }

    .dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {
        background-color: transparent;
    }

    .dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
        border: none;
    }

    .dropzone .dz-preview .dz-details .dz-filename:hover span {
        background-color: transparent;
        border: none;
    }

    .dropzone .dz-preview .dz-remove {
        position: absolute;
        z-index: 30;
        color: white;
        margin-left: 15px;
        padding: 10px;
        top: inherit;
        bottom: 15px;
        border: 2px white solid;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 1.1px;
        opacity: 0;
    }

    .dropzone .dz-preview:hover .dz-remove {
        opacity: 1;
    }

    .dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {
        margin-left: -40px;
        margin-top: -50px;
    }

    .dropzone .dz-preview .dz-success-mark i, .dropzone .dz-preview .dz-error-mark i {
        color: white;
        font-size: 5rem;
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
