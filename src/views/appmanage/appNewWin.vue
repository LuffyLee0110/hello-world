<template>
    <div class="app-container ">
      <TempPageHeader title="上传Windows(zip)应用"></TempPageHeader>
      <el-row class="toolQuery">
          <TempFormPage 
              :pageDef="pageDef.query" 
              :formData="formData"  
              @doReset="doReset" 
              @pageQuery="doPageQuery" 
              @focus="focus" 
              @fieldChange="fieldChange" 
              @doSave="doSave" 
              @doCancel="doCancel"/>
      </el-row>
  <!-- <TempDropzone
    id="myVueDropzone" 
    url="https://test.cdkfzx.com:21005/api/apps/5be0060eff2d9261ee8b387f/upload" 
    acceptedFiles=".ipa, .apk, .zip, .png"
    headers='{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViZTAwNjBlZmYyZDkyNjFlZThiMzg3ZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0sImV4cCI6MTU1MDExNTgyOSwiaWF0IjoxNTUwMTEyMjI5fQ.ldWmUsekX9ui64uQLSpqgeCsuHN5duSBkffODC8BO0c"}'
    defaultMsg="上传Android/iOS企业版应用" 
    dictMaxFilesExceeded="一个一个"
    @dropzone-removedFile="dropzoneR" 
    @dropzone-success="dropzoneS"
  /> -->
    </div>
</template>

<script>
import TempFormPage from "@/components/Templates/TempForm/TempFormPage"
import TempPageHeader from '@/components/Templates/TempHeader/TempPageHeader'

export default {
    data() {
        return {
            listQuery: {},
            importVisible: false,
            entity: {},
            formData:{
                appType:'Windows版'
            },
            dialogDef:{},
            pageDef: {
                query:{
                    useForQuery:false,
                    name:'newAppstore',
                    pageCols: [
                    { label: '应用名称', inputType: 'input', modelName: 'appName',disabled:false,span:12 },
                    { label: '应用类型', inputType: 'select', modelName: 'appType',value:'0',disabled:true ,span:12},
                    { label: '应用包名', inputType: 'input', modelName: 'bundleId',disabled:false ,span:12},
                    { label: '团队名称', inputType: 'select', modelName: 'teamName',disabled:false ,span:12},
                    { label: '应用版本号', inputType: 'input', modelName: 'verCode',disabled:false ,span:12},
                    { label: '应用描述', inputType: 'textarea', modelName: 'creator',disabled:false,span:24 },
                    { label: '应用上传', inputType: 'uploadfile', disabled:false ,span:12},
                    { label: '应用图标', inputType: 'uploadicon', disabled:false ,span:12}
                    ]
                }
            }
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
      doReset(){
        console.log('rest')
        this.formData={}
      },
      importFile(){},
      hostImport(){
        this.importVisible=true
      },
      doEdit(row) {
        this.$router.push({
          name: 'hostMngAdd',
          params: {
            hostInf: row,
            disabled: false,
            ifEdit: true
          }
        })
      },
      doDelete(row, listQuery) {
        this.$confirm('此操作将永久该条记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            hostDelete(row).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.doPageQuery(this.listQuery)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      doPageQuery(listQuery) {
        var param = this.formData
        this.listQuery = listQuery
        commonUtil.extend(param, this.listQuery)
        this.entity = {
          totalRec: 1, 
          totalPage: 1, 
          currPage: 1, 
          currRec: 20, 
          data: [{appName:{name:'建行员工',icon:'/src/assets/icon/sf.png',appType:'1'},appType:'1', bundleId:'com.ccb.ecpmobile.ecp',curVer:'1.5.0.0',teamName:'建设银行',shortUrl:'jhyg',creator:'admin',addTime:'2018-12-10 15:30:32'}]
          // data: [{appName:'建行员工',appType:'1', bundleId:'com.ccb.ecpmobile.ecp',curVer:'1.5.0.0',teamName:'建设银行',shortUrl:'jhyg',creator:'admin',addTime:'2018-12-10 15:30:32'}]
        }
        // hostPageQuery(this.listQuery).then(response => {
        //   this.entity = response
        // })
      },
      fieldChange(modelName, val){
        this.$emit('fieldChange', modelName, val)
      },

      focus(modelName, val){
        this.$emit('focus', modelName, val)
      },
    doSave() {
      let o = this.getRichEditorContent();
      Object.assign(this.formData, o);

      if (this.pageDef.formRules !== undefined) {
        this.$refs[this.pageDef.name].validate((valid) => {
          if (valid) {
            this.$emit("doSave", this.formData);
          } else {
            return false;
          }
        });
      } else {
        this.$emit("doSave", this.formData);
      }


    },

    doCancel() {
      this.$emit("doCancel")
    },
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
    },
    components: {
        // TempFormPage,TempDropzone
        TempFormPage,TempPageHeader
    },
};
</script>

<style scoped lang="scss">
    .toolQuery {
        margin-top: 1em;
        border-bottom: #ebeef5 solid 1px;
    }
</style>
