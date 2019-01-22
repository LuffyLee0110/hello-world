<template>
  <el-col v-if="col.inputType==='textarea'"  :key="idx">
    <el-form-item :label="col.label" :prop="col.modelName">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="form[col.modelName]" :value="col.value" :disabled="disabled || col.disabled" @blur="change" :rows="3" :placeholder="col.placeholder"></el-input>
    </el-form-item>
  </el-col>
  <el-col v-else-if="col.inputType === 'richEditor'"  :span="24" :key="idx">
    <el-col :span="2">
      <el-form-item :label="col.label" > </el-form-item>
    </el-col>
    <el-col :span="21">
      <ueditor :defaultMsg="col.defaultMsg" :config="col.config" :ref="col.modelName"></ueditor>
    </el-col>
  </el-col>
  <el-col v-else :xs="span ? span:24" :sm="span ? span:24" :md="span ? span:12" 
                 :lg="span ? span:12" :xl="span ? span:8" :key="idx">
    <template v-if="col.inputType==='select'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-select clearable v-model="form[col.modelName]" :disabled="disabled || col.disabled" @change="change">
          <el-option v-for="(value,key) in getEnums(col)" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType==='date'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-date-picker v-model="form[col.modelName]" value-format="yyyyMMddHHmmssSSS" type="date" placeholder="选择日期" :disabled="disabled || col.disabled" @change="change">
        </el-date-picker>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType==='datetime'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-date-picker v-model="form[col.modelName]" type="datetime" value-format="yyyyMMddHHmmssSSS" placeholder="选择日期时间" :disabled="disabled || col.disabled" @change="change">
        </el-date-picker>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType==='daterange'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-date-picker v-model="form[col.modelName]" type="daterange" value-format="yyyyMMdd"  start-placeholde="开始日期" end-placeholde="结束日期" unlink-panels :disabled="disabled || col.disabled" @change="change">
        </el-date-picker>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType==='refType'">
      <slot :name="col.modelName"></slot>
    </template>
    <template v-else-if="col.inputType==='number'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-input type="number" v-model="form[col.modelName]" :disabled="disabled || col.disabled" @blur="change"></el-input>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType === 'checkbox'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-checkbox-group v-model="checkBoxData.checkBoxes[col.modelName]" :disabled="disabled || col.disabled" @change="change">
          <template v-for="item in checkBoxData.checkBoxes[col.checkBoxArrayName]">
            <el-col :span="8">
              <el-checkbox :key="item.serviceTypeId" :label="item.typeName" :name="item.serviceTypeId" :value="item.checked">
              </el-checkbox>
            </el-col>
          </template>
        </el-checkbox-group>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType === 'cascade'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-cascader clearable :options="col.options" v-model="form[col.modelName]" :props="{value:'v', label:'n', children:'c'}" :disabled="disabled || col.disabled" @change="change"></el-cascader>
      </el-form-item>
    </template>
    <template v-else-if="col.inputType === 'autocomplete'">
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-autocomplete clearable v-model="form[col.modelName]" :fetch-suggestions="querySearch" :trigger-on-focus="col.triggerOnFocus!=undefined?col.triggerOnFocus:true" :disabled="disabled || col.disabled" @select="change"></el-autocomplete>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item :label="col.label" :prop="col.modelName">
        <el-input v-model="form[col.modelName]" :value="col.value" :disabled="disabled || col.disabled" @blur="change" @focus="focus" :maxlength="col.maxlength" :placeholder="col.placeholder"></el-input>
      </el-form-item>
    </template>
  </el-col>
</template>
<script>
import { getEnumObj } from '@/utils/formatter'
export default {
  name: 'TempFormColumn',
  props: {
    col: {
      type: Object,
      required: true
    },
    form: {
      type: Object
    },
    disabled: Boolean,
    span: Number,
    idx: Number
  },

  mounted() {
    if (this.col.inputType === 'select') {
      this.col.options = this.getEnums(this.col)
    }
  },

  methods: {
    getEnums(col) {
      let obj
      if (col && col.enumType) {
        obj = getEnumObj(col.enumType)
      } else {
        obj = getEnumObj(col.modelName)
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
    change(val) {
      this.$emit('change', this.col.modelName, val)
    },
    focus(val){
      this.$emit('focus',this.col.modelName,val)
    },
    querySearch(queryString,cb){
      return cb(this.col.suggestions)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-autocomplete {
  width: 100%;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>