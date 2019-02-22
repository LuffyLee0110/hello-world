<template>
    <div class="t-header">
        <el-header>{{title}}</el-header>
    </div>
</template>

<script>
export default {
    name: "TempPageHeader",
    props: {
        title: {
           type:String,
           default:'标题' 
        }
    },
    data() {
        return {

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

    },
};
</script>

<style scoped lang="scss">
  .t-header {
    padding-bottom: 1em;
    border-bottom: #ebeef5 solid 1px ;
  }
  .el-header {
    background-color: #409eff;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    // width: 20rem;
    width: 70%;
    margin: auto;
    font-size: 1.6em;
    font-family: 'Roboto', sans-serif;
  }
</style>
