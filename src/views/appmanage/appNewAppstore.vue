<template>
    <div class="app-container ">
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
    </div>
</template>

<script>
import TempFormPage from "@/components/Templates/TempForm/TempFormPage"
export default {
    data() {
        return {
            listQuery: {},
            importVisible: false,
            entity: {},
            formData:{
                appType:'iOS应用商店版'
            },
            dialogDef:{},
            pageDef: {
                query:{
                    useForQuery:false,
                    name:'newAppstore',
                    pageCols: [
                    { label: '应用名称', inputType: 'input', modelName: 'appName',disabled:false },
                    { label: '应用类型', inputType: 'select', modelName: 'appType',value:'3',disabled:true },
                    { label: '应用包名', inputType: 'input', modelName: 'bundleId',disabled:false },
                    { label: '团队名称', inputType: 'select', modelName: 'teamName',disabled:false },
                    { label: '应用iTunes ID', inputType: 'input', modelName: 'appstoreId',disabled:false },
                    { label: '应用描述', inputType: 'textarea', modelName: 'creator',disabled:false }
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
    }     
    },
    components: {
        TempFormPage
    },
};
</script>

<style scoped lang="scss">
    .toolQuery {
        border-bottom: #ebeef5 solid 1px;
    }
</style>
