<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="appForm" v-model="appForm">
        <el-form-item>
          <el-input v-model="appForm.appName" class="filter-item" style="width: 20%;" placeholder="应用名称"/>
          <el-input v-model="appForm.bundleId" class="filter-item" style="width: 20%;" placeholder="应用包名"/>
          <el-select v-model="appForm.typeValue" placeholder="应用类型" clearable style="width: 15%" class="filter-item">
            <el-option v-for="item in appForm.typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="appForm.teamName" placeholder="团队名称" clearable style="width: 20%" class="filter-item">
            <el-option v-for="item in appForm.teamNameOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="filter-item" style="width: 20%;" placeholder="应用上传人"/>
          <el-date-picker v-model="appForm.dateRg" class="filter-item-datepick" type="daterange" start-placeholde="开始日期" end-placeholde="结束日期" unlink-panels format="yyyy-MM-dd"/>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" >搜索</el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="resetForm('appForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column><span/></el-table-column>
      <el-table-column><span/></el-table-column>
      <el-table-column><span/></el-table-column>
      <el-table-column><span/></el-table-column>
      <el-table-column><span/></el-table-column>
      <el-table-column><span/></el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { extend } from '@/utils/validate'
export default {
  name: 'AppDetail',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      appForm: {
        typeValue: '',
        teamName: '',
        teamNameOpts: [],
        dateRg: '',
        typeOptions: [{
          value: 0,
          label: 'Windows版'
        }, {
          value: 1,
          label: 'Android版'
        }, {
          value: 2,
          label: 'iOS企业版'
        }, {
          value: 3,
          label: 'iOS应用商店版'
        }]
      },
      total: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    .filter-container{
      .filter-item-datepick{
        // display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
      }
    }
  }
</style>
