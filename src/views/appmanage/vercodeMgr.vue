<template>
    <section class="app-info">
        <el-card class="box-card">
            <div class="app-content">
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark">名称</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple">bundle ID</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple-light">过期时间</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">下载地址</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple">App Key</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple-light">内测设备</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">下载二维码</div></el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card">
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
        </el-card>
    </section>
</template>

<script>

import TempFormTable from '@/components/Templates/TempForm/TempFormTable'

export default {
    props: {

    },
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
        }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
        TempFormTable
    },
};
</script>

<style scoped lang="scss">
    .box-card {
        margin: 5px 20px 5px 20px;
    }
</style>
