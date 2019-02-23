<template>
  <TempFormTable
    :pageDef="pageDef" 
    :formData="formData" 
    :entity="entity" 
    @hostImport="hostImport"
    @doAddApp="doAddApp" 
    @doEdit="doEdit" 
    @doDelete="doDelete"  
    @doReset="doReset"
    @pageQuery="doPageQuery"
  ></TempFormTable>
</template>

<script>
  import TempFormTable from '@/components/Templates/TempForm/TempFormTable'
  import commonUtil from '@/utils/commonUtil'

  export default {
    components: { TempFormTable },
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
            { id:"appNew", label: '新增', isDialog: true, funcName:'doAddApp', dialogVisible: false, disabled: false,dialogDef:'dialogDef'},
          ]
        }
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
      doAddApp() {
        this.pageDef.title = "新建应用"
        this.pageDef.buttons[0].dialogVisible = true 
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
      customFormat1(row, column, cellValue) {
      if (cellValue !== '' && cellValue !== undefined) {
          let fval = ''
          this.$emit('customFormat', row, column, cellValue, function(val) {
            fval = val
          })
          return fval
        } else {
          // return cellValue
          var str=""
          str += "<span>"+cellValue.appName.name +"</span>"
          console.log(str)
          return str
        }
      }
    }
  }
</script>  

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
