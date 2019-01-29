<template>
  <el-button size="normal" :type="type" @click="click">
    <slot></slot>
  </el-button>
</template>
<script>
  export default {
    name: "TempButton",
    props:{
      type:String
    },

    data(){
      return {}
    },


    methods:{
      click: function () {
        this.$emit('click');
      }
    }
  }
</script>