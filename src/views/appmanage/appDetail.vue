<template>
  <TempFormTable
    :pageDef="pageDef" 
    :formData="formData" 
    :entity="entity" 
    @hostImport="hostImport"
    @doAdd="doAdd" 
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
        pageDef: {
          query:{
            useForQuery:true,
            name:'appsQuery',
            pageCols: [
              { label: '应用名称', inputType: 'input', modelName: 'appName',disabled:false },
              { label: '应用类型', inputType: 'select', modelName: 'appType',enumType: 'appType',disabled:false },
              { label: '应用包名', inputType: 'input', modelName: 'bundleId',disabled:false },
              { label: '团队名称', inputType: 'select', modelName: 'teamName',disabled:false },
              { label: '应用上传人', inputType: 'input', modelName: 'creator',disabled:false },
              { label: '日期范围', inputType: 'daterange', modelName: 'dateRng',disabled:false }
            ]
          },
          tabDef: {
            // isSelect: true, // 是否可以多选
            isIndex: true, // 是否有序号
            // 表格字段定义
            tabCols: [
              { label: '名称', prop: 'appName',isAppName:true, enumType:'appType'},
              { label: '类型', prop: 'appType', isFormat: true,enumType: 'appType'},
              { label: '包名', prop: 'bundleId'},
              { label: '当前版本', prop: 'curVer'},
              { label: '所属团队', prop: 'teamName'},
              { label: '短链接', prop: 'shortUrl'},
              { label: '上传人', prop: 'creator'},
              { label: '上传时间', prop: 'addTime'}
            ]
          },
          rowButtons: [
            { id:"hostMngEdit", label: '编辑', funcName: 'doEdit'},
            { id:"hostMngDelete", label: '删除', funcName: 'doDelete'}
          ],
          buttons: [
            { id:"hostMngAdd", label: '新增', funcName: 'doAdd', disabled: false}
          ]
        }
      }
    },
    methods: {
      doReset(){
        this.formData={}
      },
      importFile(){},
      hostImport(){
        this.importVisible=true
      },
      doAdd() {
        this.$router.push({
          name: 'hostMngAdd',
          params: {
            disabled: false,
            ifEdit: false
          }
        })
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
          data: [{appName:{name:'建行员工',icon:'sf.png',type:'456'},appType:'1', bundleId:'com.ccb.ecpmobile.ecp',curVer:'1.5.0.0',teamName:'建设银行',shortUrl:'jhyg',creator:'admin',addTime:'2018-12-10 15:30:32'}]
          // data: [{appName:'建行员工',appType:'1', bundleId:'com.ccb.ecpmobile.ecp',curVer:'1.5.0.0',teamName:'建设银行',shortUrl:'jhyg',creator:'admin',addTime:'2018-12-10 15:30:32'}]
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
