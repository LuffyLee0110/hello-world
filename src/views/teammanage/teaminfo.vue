<template>
  <div>
    <TempFormTable
      :pageDef="pageDef" 
      :formData="formData" 
      :entity="entity" 
      @hostImport="hostImport"
      @doAddDialog="doAddDialog" 
      @doEdit="doEdit" 
      @doDelete="doDelete"  
      @doReset="doReset"
      @pageQuery="doPageQuery"
    ></TempFormTable>
    <TempCommAddDialog
      :dPageDef="dPageDef"
      :dFormData="dFormData"
      @doDiaSave="doDiaSave" 
      @doDiaCancel="doDiaCancel"
    ></TempCommAddDialog>
  </div>  
</template>

<script>
  import TempFormTable from '@/components/Templates/TempForm/TempFormTable'
  import TempCommAddDialog from '@/components/Templates/TempDialog/TempCommAddDialog'
  import commonUtil from '@/utils/commonUtil'

  export default {
    components: { TempFormTable,TempCommAddDialog },
    data() {
      return {
        listQuery: {},
        importVisible: false,
        entity: {},
        formData:{},
        dialogDef:{},
        pageDef: {
          query:{
            useForQuery:true,
            name:'appsQuery',
            pageCols: [
              { label: '团队名称', inputType: 'select', modelName: 'teamName',disabled:false },
              { label: '团队邮箱', inputType: 'input', modelName: 'teamEmail',disabled:false },
              { label: '创建日期范围', inputType: 'daterange', modelName: 'dateRng',disabled:false }
            ]
          },
          tabDef: {
            // isSelect: true, // 是否可以多选
            isIndex: true, // 是否有序号
            // 表格字段定义
            tabCols: [
              { label: '团队名称', prop: 'teamName'},
              { label: '团队邮箱', prop: 'teamEmail'},
              { label: '创建时间', prop: 'createTime'},
              { label: '是否禁用', prop: 'isAvab',isSwitch:true}
            ]
          },
          rowButtons: [
            { id:"hostMngEdit", label: '编辑', funcName: 'doEdit'},
            { id:"hostMngDelete", label: '删除', funcName: 'doDelete'}
          ],
          buttons: [
            { id:"appNew", label: '新增', funcName:'doAddDialog',disabled: false},
          ]
        },
        dPageDef:{
          query:{
            useForQuery:false,
            name:'appsQuery',
            pageCols: [
              { label: '所属团队', inputType: 'select', modelName: 'teamName',disabled:false,span:24 },
              { label: '用户名称', inputType: 'input', modelName: 'userName',disabled:false,span:12 },
              { label: '用户密码', inputType: 'input', modelName: 'userPass',disabled:false,span:12 },
              { label: '手机号码', inputType: 'input', modelName: 'phoneNum',disabled:false,span:12 },
              { label: '用户邮箱', inputType: 'input', modelName: 'email',disabled:false,span:12 }
            ]
          },            
          dialogVisible:false,
        },
        dFormData:{}
      }
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
      doAddDialog() {
        this.dPageDef.title = "新增团队"
        this.dPageDef.dialogVisible = true
        // this.$router.push({
        //   name: 'AppNew',
        //   params: {
        //     disabled: false,
        //     ifEdit: false
        //   }
        // })
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
          data: [{teamName:'建设银行',teamEmail:'support@ccb.com',createTime:'2018-12-10 15:30:32',isAvab:false}]
        }
        // hostPageQuery(this.listQuery).then(response => {
        //   this.entity = response
        // })
      },
      doDiaSave(){
        this.$emit("doDiaSave")
      },

      doDiaCancel() {
        console.log('1111')
        this.$emit("doDiaCancel")
      }
    }
  }
</script>  

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
