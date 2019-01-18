<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 35%;" placeholder="团队名称"/>
      <el-input class="filter-item" style="width: 35%;" placeholder="团队邮箱"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" >搜索</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" >新建</el-button>
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
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'TeamInfo',
  components: { Pagination },
  directives: { waves },
  data() {
    return {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
