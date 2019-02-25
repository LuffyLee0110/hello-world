<template>
  <div>
    <TempFormTable
      :pageDef="pageDef" 
      :formData="formData" 
      :entity="entity" 
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
        entity: {},
        formData:{},
        pageDef: {
          query:{
            useForQuery:true,
            name:'appsQuery',
            pageCols: [
              { label: '渠道名称', inputType: 'input', modelName: 'chnlName',disabled:false },
              { label: '团队名称', inputType: 'select', modelName: 'teamName',disabled:false },
              { label: '渠道创建人', inputType: 'input', modelName: 'creator',disabled:false },
              { label: '日期范围', inputType: 'daterange', modelName: 'dateRng',disabled:false }
            ]
          },
          tabDef: {
            // isSelect: true, // 是否可以多选
            isIndex: true, // 是否有序号
            // 表格字段定义
            tabCols: [
              { label: '渠道名称', prop: 'chnlName'},
              { label: '所属团队', prop: 'teamName'},
              { label: '创建人', prop: 'creator'},
              { label: '创建时间', prop: 'addTime'}
            ]
          },
          rowButtons: [
            { id:"hostMngEdit", label: '编辑', funcName: 'doEdit'},
            { id:"hostMngDelete", label: '删除', funcName: 'doDelete'}
          ],
          buttons: [
            { id:"appNew", label: '新增', funcName:'doAddDialog', disabled: false}
          ]
        },
        dPageDef:{
          query:{
            useForQuery:false,
            name:'appsQuery',
            pageCols: [
              { label: '团队名称', inputType: 'select', modelName: 'teamName',disabled:false,span:24 },
              { label: '渠道名称', inputType: 'input', modelName: 'chnlName',disabled:false,span:12 },
              { label: '渠道创建人', inputType: 'input', modelName: 'creator',disabled:false,span:12 }
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
      doAddDialog() {
        this.dPageDef.title = "新增渠道"
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
          data: [{chnlName:'默认渠道',appType:'1', bundleId:'com.ccb.ecpmobile.ecp',curVer:'1.5.0.0',teamName:'建设银行',shortUrl:'jhyg',creator:'admin',addTime:'2018-12-10 15:30:32'}]
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
