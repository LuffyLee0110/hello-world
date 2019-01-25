<template>
  <!-- <div class="app-container occ-single-table"> -->
    <div class="app-container ">

    <el-row class="toolQuery">
      <TempFormPage :pageDef="pageDef.query" :formData="formData"  @doReset="doReset" @pageQuery="doPageQuery" @focus="focus" @fieldChange="fieldChange" @doSave="doSave" @doCancel="doCancel">
      </TempFormPage>
    </el-row>

    <!-- 列表按钮 -->
    <el-row class="toolBar" v-if="!pageDef.disableQuery">
      <div v-if="pageDef.showTitle" style="margin-top:20px">{{pageDef.title}}</div>
      <div class="toolBar-btn">
        <el-button v-for="button,index in pageDef.buttons" :id="button.id" @click="doClick(button.funcName)" type="primary" size="normal" :disabled="buttonStates[index]" :key="index">
          {{button.label}}
          <i v-if="button.icon" :class="button.icon+' el-icon--right'"></i>
        </el-button>
        <slot  name="toolBar"></slot>
      </div>
    </el-row>
    <!--列表-->
    <el-row class="singleTable">
      <el-table border :data="entity.data" highlight-current-row v-loading="listLoading" @selection-change="selectionChange" @row-click="rowChange" @select="rowChange" @row-dblclick="rowDbclick" :max-height="550">
        <template v-if="pageDef.tabDef.isExpand">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <template v-for="expandCol in pageDef.tabDef.expandCols">
                  <el-form-item>
                    <span style="color: #6495ED; font-size: 20px">{{expandCol.label}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{ props.row[expandCol.prop] }}</span>
                  </el-form-item>
                </template>
              </el-form>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-if="pageDef.tabDef.isSelect" type="selection" width="55" header-align="center" align="center">
        </el-table-column>
        <el-table-column v-if="pageDef.tabDef.isIndex" label="序号" type="index" width="50" header-align="center" align="center">
          <template slot-scope="scope">
            {{(listQuery.pageJump-1)*listQuery.recInPage+scope.$index+1}}
          </template>
        </el-table-column>
        <template v-for="tabCol in pageDef.tabDef.tabCols">
          <!-- 是否排序 -->
          <!--<template v-if="tabCol.isSort">-->
          <!-- 枚举类是否需要格式化 -->
          <template v-if="tabCol.isFormat">
            <TempTableColumn :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :formatter="formatVal" :enumType="tabCol.enumType" header-align="center" align="center" :fit="tabCol.isFit" :width="tabCol.width">
            </TempTableColumn>
          </template>
          <!--是否是参照-->
          <template v-else-if="tabCol.isRef">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :formatter="queryRef" header-align="center" align="center" :width="tabCol.width">
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isDateTime">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :formatter="formatDateTime" :width="160" header-align="center" align="center">
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isDate">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :formatter="formatDate" :width="135" header-align="center" align="center">
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isCustom">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :formatter="customFormat" :width="tabCol.width" header-align="center" align="center">
              <template slot-scope="scope">
                <span v-html="customFormat(scope.row,scope.column,scope.row[tabCol.prop])">
                  {{customFormat(scope.row,scope.column,scope.row[tabCol.prop])}}
                </span>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isAppName">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :formatter="appNameFormat" :width="tabCol.width" header-align="center" align="center">
              <template slot-scope="scope">
                <div v-html="appNameFormat(scope.row,scope.column,scope.row[tabCol.prop])">
                  {{appNameFormat(scope.row,scope.column,scope.row[tabCol.prop])}}
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isImgButton">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" :width="135" header-align="center" align="center">
              <template slot-scope="scope">
                <a @click="buttonClick(tabCol.funcName,scope.row)"><img :src="tabCol.img"></img>
                </a>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isInput">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" header-align="center" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row[tabCol.prop]" placeholder="" @blur.lazy="inputBlur(tabCol.funcName,scope.row)" :disabled="tabCol.disabled"></el-input>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="tabCol.isImage">
            <el-table-column :label="tabCol.label"  :prop="tabCol.prop" :sortable="tabCol.isSort" header-align="center"
                             align="center" :width="tabCol.width" :show-overflow-tooltip="tabCol.isOverflow">
              <template slot-scope="scope">
                <img v-show="scope.row[tabCol.prop] != null" :src="getPreviewPathFirstOnly(scope.row[tabCol.prop])">
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :sortable="tabCol.isSort" header-align="center" align="center" :width="tabCol.width" :show-overflow-tooltip="tabCol.isOverflow">
            </el-table-column>
          </template>
        </template>
        <el-table-column label="操作" width="180" header-align="center" align="center" fixed="right" v-if="!disableRowButtons">
          <template slot-scope="scope">
            <!-- <template v-if="(pageDef.rowButtons == undefined || pageDef.rowButtons.length == 0) && !disableRowButtons">
              <el-button :id="rowButton.id" type="text" size="mini" @click="doEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button :id="rowButton.id" type="text" size="mini" @click="doDelete(scope.$index, scope.row)">删除</el-button>
            </template> -->
            <template v-if="(pageDef.rowButtons != undefined || pageDef.rowButtons.length != 0)">
              <el-button v-for="rowButton,index in pageDef.rowButtons" :key="index" :id="rowButton.id" @click="doRowClick(rowButton.funcName, scope.$index, scope.row)" type="text" size="mini" :disabled="evalRegulation(rowButton.regulation, scope.row)" v-if="evalVisible(rowButton.visible, scope.row)">
                {{rowButton.label}}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div v-show="!listLoading && pagination" class="pagination-container">
      <el-pagination background @size-change="doSizeChange" @current-change="doCurrentChange" :current-page.sync="listQuery.pageJump" :page-sizes="[20,30,40,50]" :page-size="listQuery.recInPage" layout="total, sizes, prev, pager, next, jumper" :total="totalRec">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { formatter, getEnumObj } from '@/utils/formatter'
// import { extend } from '@/utils/validate'
import commonUtil from '@/utils/commonUtil'
import TempTableColumn from '@/components/Templates/TempTable/TempTableColumn'
import TempFormColumn from "@/components/Templates/TempForm/TempFormColumn"
import TempFormPage from "@/components/Templates/TempForm/TempFormPage"


export default {
  form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
  name: 'TempFormTable',
  props: {
    formData: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object
    },
    checkBoxes: {
      type: Object
    },
    checkBoxData: {
      type: Object
    },
    defaultCondition: {
      type: Object,
      default: function() {
        return {
          queryName: undefined,
          queryValue: undefined
        }
      }
    },
    pagination:{default:true},
    pageDef: {
      type: Object,
      required: true
    },
    dataList: Array,
    matchObj: Object,
    entity: Object,
    disableQueryForm: {
      type: Boolean,
      default: false
    },
    disableRowButtons: {
      type: Boolean,
      default: false
    },
    autoQuery: {
      type: Boolean,
      default: true
    },
    listLoadingFlag: {
      type: String,
      default: 'listLoading'
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      currentQueryName: '',
      showAddQuery: false,
      selection: [],
      currentRow: undefined, // 当前行
      // 分页查询参数
      matchRefList: [],
      form: {
        queryName: this.defaultCondition.queryName,
        queryValue: this.defaultCondition.queryValue
      },
      loading: false,
      listQuery: {
        pageJump: 1, // 多页查询跳转页码
        recInPage: 20 // 多页查询每页笔数
      }
    }
  },
  created() {
    // this.form.queryName = this.pageDef.queryDef.queryCols[0].modelName
    // if (this.defaultCondition.queryName) {
    //   this.form.queryName = this.defaultCondition.queryName
    // }
    if (this.pageDef.defaultConditions) {
      Object.assign(this.listQuery, this.pageDef.defaultConditions)
    }
    if (this.autoQuery) this.doPageQuery()
  },

  components: {TempTableColumn,TempFormColumn,TempFormPage },
  watch: {
    formData: function(){
      //alert(this.formData.rghtDsc);
      this.setRichEditorContent();  
    }
  },
  computed: {
    // 分页查询总笔数
    totalRec: function() {
      return this.entity.totalRec
    },
    buttonStates() {
      const disableds = []
      for (var idx in this.pageDef.buttons) {
        var button = this.pageDef.buttons[idx]
        if (button.regulation) {
          let evalStr = button.regulation
          var reg = /\w+\s*\(\s*\)/g
          var result = evalStr.match(reg)
          if (result != null) {
            for (var index = 0; index < result.length; index++) {
              evalStr = evalStr.replace(
                result[index],
                'this.pageDef.methods.' +
                  result[index].replace('()', '(this.selection)')
              )
            }
            disableds.push(!eval(evalStr))
          } else {
            disableds.push(!eval(button.regulation))
          }
        } else {
          disableds.push(false)
        }
      }
      return disableds
    },
    listLoading() {
      return this.$store.getters[this.listLoadingFlag]
    }
  },
  methods: {

    getEnums(enumType) {
      return getEnumObj(enumType)
    },

    doSave() {
      let o = this.getRichEditorContent();
      Object.assign(this.formData, o);

      if (this.pageDef.query.formRules !== undefined) {
        this.$refs[this.pageDef.query.name].validate((valid) => {
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

    doReset(){
      this.$emit("doReset")
    },

    doCancel() {
      this.$emit("doCancel")
    },

    checkNumber(rule, value, callback) {
      if (value) {
        return callback(new Error('年龄不能为空'));
      }
      callback();
    },

    fieldChange(modelName, val){
      this.$emit('fieldChange', modelName, val)
    },

    focus(modelName, val){
      this.$emit('focus', modelName, val)
    },

    /**
     * 获取富文本编辑器内容
     */
    getRichEditorContent(){
      let obj;
      var that = this;
      this.richEditorColumns.forEach((modelName) => {
        if(obj == undefined){
          obj = {};
        }
        obj[modelName] = that.$refs[modelName][0].$refs[modelName].getUEContent();
      });

      return obj;
    },

    setRichEditorContent(){
      this.richEditorColumns.forEach((modelName) => {
        this.$refs[modelName][0].$refs[modelName].setContent(this.formData[modelName]);
      });
    },


    defineColumns:function(){
      let cols=[];
      let obj=[];
      for(let i= 0;i<=this.pageDef.query.pageCols.length; i++){
        if(i==this.pageDef.query.pageCols.length ){
          if(obj.length>0){
            let o = {inputType:"formGroup", columns:obj};
            cols.push(o);
          }
          continue;
        }
        let col = this.pageDef.query.pageCols[i];
        if(col.inputType != 'formGroup'){
          obj.push(this.pageDef.query.pageCols[i]);
        }else if (col.inputType == 'formGroup'){
          if(obj.length >0 ){
            let o = {inputType:"formGroup", columns:obj};
            cols.push(o);
            obj=[];
          }

          cols.push(col);
        }
      }
      return cols;
    },
    inputBlur(funcName, row) {
      this.$emit(funcName, row)
    },
    buttonClick(funcName, row) {
      this.$emit(funcName, row)
    },
    selectChange(val) {
      console.log('change change change')
      this.$set(this.form, 'queryValue', undefined)
      this.$set(this.form, 'queryName', val)
      console.log(this.form.queryName)
    },
    matchIdChange(val) {},
    // 格式化表格字段
    formatVal(row, column, cellValue, enumType) {
      if (enumType) {
        return formatter(enumType, cellValue)
      }
      return formatter(column.property, cellValue)
    },

    getEnums(col) {
      let obj
      if (col && col.enumType) {
        obj = getEnumObj(col.enumType)
      }
      if (col.filter) {
        for (let key in obj) {
          if (col.filter.includes(key)) {
            delete obj[key]
          }
        }
      }
      return obj
    },

    // 子组件按钮事件
    doClick(funcName) {
      commonUtil.extend(this.form, this.listQuery)
      this.$emit(funcName, this.selection, this.form)
    },

    doRowClick(funcName, index, row) {
      commonUtil.extend(this.form, this.listQuery)
      this.$emit(funcName, row, this.form, index)
    },
    // 带查询条件的查询
    doQuery() {
      this.listQuery.pageJump = 1
      this.doPageQuery()
    },

    doPageQuery() {
      // if (this.listLoadingFlag === 'listLoading') {
      //   this.$store.dispatch('setListLoading', true)
      // }

      const queryParam = {}
      // const queryName = this.form.queryName
      // const queryValue = this.form.queryValue
      // queryParam[this.form.queryName] = queryValue
      // const queryColDef = this.pageDef.queryDef.queryCols.find(n => {
      //   return n.modelName === queryName && queryValue
      // })
      // if (queryColDef && queryColDef.inputType === 'daterange') {
      //   queryParam[queryColDef.modelName1] = queryValue[0]
      //     ? queryValue[0].format('yyyyMMdd')
      //     : queryValue[0]
      //   queryParam[queryColDef.modelName2] = queryValue[1]
      //     ? queryValue[1].format('yyyyMMdd')
      //     : queryValue[1]
      //   console.log(queryParam)
      // } else if (queryColDef && queryColDef.inputType === 'date') {
      //   queryParam[this.form.queryName] = queryValue
      //     ? queryValue.format('yyyyMMdd')
      //     : queryValue
      // } else {
      //   queryParam[this.form.queryName] = queryValue
      // }
      commonUtil.extend(queryParam, this.listQuery);
      // let qParam = {
      //   'queryName': this.form.queryName,
      //   'queryValue': this.form.queryValue
      // };
      this.$emit('pageQuery',queryParam);
    },

    // 查询每页笔数变化事件
    doSizeChange(val) {
      this.listQuery.recInPage = val
      this.doPageQuery()
    },

    // 页码变化事件
    doCurrentChange(val) {
      this.listQuery.pageJump = val
      this.doPageQuery()
    },

    // 编辑
    doEdit(index, row) {
      this.$emit('doEdit', row)
    },

    // 删除
    doDelete(index, row) {
      this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$emit('doDelete', row, this.listQuery, index)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 行点击和行选中事件
    rowChange(row, event, column) {
      this.currentRow = row
      if (!this.pageDef.tabDef.isSelect) {
        this.selection = [row]
      }
      this.$emit('rowChange', row)
    },

    selectionChange(selection) {
      this.selection = selection
      this.$emit('selectionChange', selection)
    },

    evalRegulation(regulation, row) {
      let evalStr = regulation
      if (regulation) {
        var reg = /\w+\s*(=|!)=\s*'*\w+'*/g
        var result = regulation.match(reg)
        if (result != null) {
          for (var idx in result) {
            evalStr = evalStr.replace(result[idx], 'row.' + result[idx])
          }
          return !eval(evalStr)
        } else {
          return !eval(regulation)
        }
      } else {
        return false
      }
    },

    evalVisible(visible, row) {
      let evalStr = visible
      if (visible) {
        var reg = /\w+\s*(=|!)=\s*'*\w+'*/g
        var result = visible.match(reg)
        if (result != null) {
          for (var idx in result) {
            evalStr = evalStr.replace(result[idx], 'row.' + result[idx])
          }
          return eval(evalStr)
        } else {
          return eval(visible)
        }
      } else {
        return true
      }
    },

    rowDbclick(row, event) {
      this.$emit('rowDbclick', row)
    },

    queryRef(row, column, cellValue) {
      var fval = ''
      if (cellValue !== '' && cellValue !== undefined) {
        this.$emit('queryRef', column.property, cellValue, function(val) {
          fval = val
        })
        return fval
      }
    },

    formatDateTime(row, column, cellValue) {
      return commonUtil.formatDateString(cellValue, 'yyyy-MM-dd hh:mm:ss')
    },

    clearSelect(colName) {
      delete this.form[colName]
    },

    formatDate(row, column, cellValue) {
      return commonUtil.formatDateString(cellValue, 'yyyy-MM-dd')
    },

    customFormat(row, column, cellValue) {
      if (cellValue !== '' && cellValue !== undefined) {
        let fval = ''
        this.$emit('customFormat', row, column, cellValue, function(val) {
          fval = val
        })
        return fval
      } else {
        return cellValue
      }
    },

    appNameFormat(row,column,cellValue) {
      if(cellValue !== '' && cellValue !== undefined) {
        let fval = ''
        let aType = {
          '0': 'Windows版',
          '1': 'Android版',
          '2': 'iOS企业版',
          '3': 'iOS应用商店版',
        }
        fval += '<div class="app-icon"><span><img alt="" '+
                    'style="width:40px;height:40px;float:left !important;border-radius:50%;" '+ 
                    'src="' + cellValue.icon + '"></sapn></div>'
        fval += '<div class="app-info">' + cellValue.name + '</div>'
        fval += '<span style="color:#9e9e9e;">' + aType[cellValue.appType] + '</span>'

        return fval
      } else {
        return cellValue
      }
    },
    getPreviewPathFirstOnly(jsonstr){
      try {
        var items = JSON.parse(jsonstr);
        return this.getPreviewPath(items[0].response);
      }catch (e) {
        //无图片
      }
    },
    getPreviewPath(url) {
      return '/common/previewFile?url=' + encodeURI(url)
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >

.el-main {
  background-color: #409eff;
  text-align: center;
}

.queryForm {
  margin-top: 20px;
  margin-right: 20px;
}

.toolBar {
  margin: 0 0 0 14px !important;
  .toolBar-btn {
  margin: 30px 0 8px 0px;
  float: left;
  }
  .toolBar-cond {
  float: right;
  margin: 28px 44px 0 0;
  }

}

.singleTable {
height: 50%;
padding: 0 14px 0 14px;
}

.el-input {
  width: 100%;
}

.el-select {
  width: 100%;
}

.el-cascader {
  width: 100%;
}

.table-expand {
  font-size: 10px;
}

.table-expand label {
  width: 90px;
  color: red;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 90%;
}

.singleTable .el-button + .el-button {
  margin-left: 10px;
}
/*.el-button--normal {*/
/*width: 138px;*/
/*height: 48px;*/
/*font: 18px "Microsoft Yahei";*/
/*}*/

.el-pagination{
  text-align: center;
}

/*.pagination-container{*/
/*padding-top: 76px;*/
/*padding-bottom: 60px;*/
/*}*/


/*.bottomBtn {*/
  /*margin-top: 40px;*/
  /*margin-bottom: 40px;*/
/*}*/

.bottomBtn button {
  width:130px;
  height:42px;
  font-size:16px;
  font-style:MicrosoftYaHei;
  margin:0px 20px 0px 20px;
  border-radius: 4px;
}

.bottomBtn .el-button--default {
  color:#1d86e7;
}

.TempFormPgae{
  margin: 0 0 0 0;
}

.form-group{
  background-color: #ffffff;
  margin-top: 16px;
  padding-top: 40px;
  padding-bottom: 20px;
}

.toolQuery {
  border-bottom: #ebeef5 solid 1px;
}

</style>
