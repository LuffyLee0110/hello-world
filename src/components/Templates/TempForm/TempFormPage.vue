<template>
  <section class="temp-form-page">
    <el-form :ref="pageDef.name" :model="formData" :rules="pageDef.formRules" label-width="120px" label-position="right">
      <template v-for="(col,idx) in defineColumns">
        <template v-if="col.inputType==='formGroup'">
          <el-row :gutter="0" class="form-group">
            <template v-for="(column,index) in col.columns">
              <template v-if="column.inputType==='refType'">
                <el-col v-if="!column.hidden" :xs="column.span ? column.span:24" :sm="column.span ? column.span:24" :md="column.span ? column.span:12" 
                 :lg="column.span ? column.span:12" :xl="column.span ? column.span:8" :key="index">
                  <slot :name="column.modelName"></slot>
                </el-col>
              </template>
              <template v-else>
                <TempFormColumn v-if="!column.hidden" :col="column" :form="formData" :disabled="disabled||column.disabled" :span="column.span" @change="fieldChange" @focus="focus" :idx="idx" :checkBoxes="checkBoxes" :checkBoxData="checkBoxData"></TempFormColumn>
              </template>
            </template>
          </el-row>
        </template>
      </template>
    </el-form>

    <el-row>
      <slot name="selfDefine"></slot>
    </el-row>
    <el-row align="middle" class="bottomBtn" v-if="!pageDef.hidButton">
      <el-col align="center" v-if="!pageDef.useForQuery">
        <el-button @click="doCancel">取消</el-button>
        <el-button type="primary" @click="doSave">保存</el-button>
      </el-col>
      <el-col class="queryBottom" align="right" v-if="pageDef.useForQuery">
        <el-button type="primary" @click="doPageQuery">查询</el-button>
        <el-button type="primary" @click="doReset">重置</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { getEnumObj } from "@/utils/formatter"
import TempFormColumn from "@/components/Templates/TempForm/TempFormColumn"

export default {
  name: "TempFormPage",
  props: {
    pageDef: {
      type: Object,
      required: true
    },
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
    }
  },

  data() {
    return {
      form: {

      }
    }
  },

  mounted() {

  },

  computed:{
    disabled() {
      return this.pageDef.disabled;
    },
    richEditorColumns(){
      let cols = [];
      for(let i=0; i<this.pageDef.pageCols.length; i++){
        let col = this.pageDef.pageCols[i]
        if(col.inputType ==='richEditor'){
          cols.push(col.modelName);
        }
      }

      return cols;
    },
    defineColumns:function(){
      let cols=[];
      let obj=[];
      for(let i= 0;i<=this.pageDef.pageCols.length; i++){
        if(i==this.pageDef.pageCols.length ){
          if(obj.length>0){
            let o = {inputType:"formGroup", columns:obj};
            cols.push(o);
          }
          continue;
        }
        let col = this.pageDef.pageCols[i];
        if(col.inputType != 'formGroup'){
          obj.push(this.pageDef.pageCols[i]);
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
    }
  },

  components:{TempFormColumn},

  watch: {
    formData: function(){
      //alert(this.formData.rghtDsc);
      this.setRichEditorContent();  
    }
  },

  methods: {
    doPageQuery(){
      this.$emit("pageQuery", this.formData);
    },
    getEnums(enumType) {
      return getEnumObj(enumType)
    },

    doReset() {
      var a = ''
      var a = ''
      var a = ''
      var a = ''
      this.$emit("doReset");
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
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

// .bottomBtn {
//   margin-top: 40px;
//   margin-bottom: 40px;
// }
.queryBottom {
  //width: 50%;
  //margin:0px 0px 0px 745px;
  padding-right: 18px;
}

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

.temp-form-page{
  margin: 0 0 15px 0;
}

.form-group{
  background-color: #ffffff;
  margin-top: 1px;
  padding-top: 4px;
  padding-bottom: 2px;
}

</style>
