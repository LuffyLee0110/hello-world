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
              { label: '主机组名称', inputType: 'input', modelName: 'groupName',disabled:false },
              { label: '子组名称', inputType: 'input', modelName: 'subGroupName',disabled:false },
              { label: '带管地址', inputType: 'input', modelName: 'ipAddress',disabled:false },
              { label: '纳管状态', inputType: 'select', modelName: 'manageStatus',enumType: 'manageStatus',disabled:false }
            ]
          },
          tabDef: {
            // isSelect: true, // 是否可以多选
            isIndex: true, // 是否有序号
            // 表格字段定义
            tabCols: [
              { label: '主机名称', prop: 'hostName'},
              { label: '带管地址', prop: 'ipAddress'},
              { label: '主机组名称', prop: 'groupName'},
              { label: '子组名称', prop: 'subGroupName'},
              { label: '纳管状态', prop: 'manageStatus', isFormat: true,enumType: 'manageStatus'},
              { label: '在线状态', prop: 'onlineStatus', isFormat: true,enumType: 'onlineStatus'}
            ]
          },
          rowButtons: [
            { id:"hostMngEdit", label: '编辑', funcName: 'doEdit'},
            { id:"hostMngDelete", label: '删除', funcName: 'doDelete'}
          ],
          buttons: [
            { id:"hostMngAdd", label: '新增', funcName: 'doAdd', disabled: false},
            { id:"hostMngDownloadFile", label: '模板下载', funcName: 'doAdd', disabled: false},
            { id:"hostMngImport", label: '导入', funcName: 'hostImport', disabled: false}
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
        extend(param, this.listQuery)
        this.entity = {
          totalRec: 1, 
          totalPage: 1, 
          currPage: 1, 
          currRec: 20, 
          data: [{hostName:'testHostOne',ipAddress:'1.1.1.1',groupName:'tsetHostGrpOne',subGroupName:'testChdGrpOne',manageStatus:'1',onlineStatus:'1'}]
        }
        // hostPageQuery(this.listQuery).then(response => {
        //   this.entity = response
        // })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
