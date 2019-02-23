<template>
    <el-dialog custom-class="commAddDlg" :title="dPageDef.title" 
        :visible.sync="dPageDef.dialogVisible" :close-on-press-escape="false" 
        :close-on-click-modal="false" center>
        <el-row class="toolQuery">
            <TempFormPage 
                :pageDef="dPageDef.query" 
                :formData="dFormData"  
                @focus="focus" 
                @fieldChange="fieldChange" 
                @doDiaSave="doDiaSave" 
                @doDiaCancel="doDiaCancel">
            </TempFormPage>
        </el-row>
        <div slot="footer" class="dialog-footer" align="center">
            <TempButton @click="doDiaCancel">取 消</TempButton>
            <TempButton type="primary" @click="doDiaSave">保 存</TempButton>
        </div>
    </el-dialog>
</template>

<script>
import TempFormPage from "@/components/Templates/TempForm/TempFormPage"
import TempButton from "@/components/Templates/TempButton/TempButton"
export default {
    name: "TempCommAddDialog",
    props: {
		dFormData: {
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
		dPageDef: {
		  type: Object,
		  required: true
		},
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
            value:'1'
        };
    },
    methods: {
        doDiaCancel() {
            console.log("a~~~~~~~~~~~~~~~~~~~~")
            this.$set(this.dPageDef,"dialogVisible",false)
            this.$emit("doDiaCancel")
        },
        doDiaSave() {
            cosole.log("b！！！！！！！！！！！！！！！！！")
            this.$set(this.dPageDef, 'dPageDef.dialogVisible=false', false)
            this.$emit("doDiaSave", this.index, this.form);
        },
        focus(modelName, val){
            this.$emit('focus', modelName, val)
        },
        fieldChange(modelName, val){
            this.$emit('fieldChange', modelName, val)
        }

    },
    components: {
        TempFormPage,TempButton
    },
};
</script>

 <!-- <style scoped lang="scss"> -->
 <!-- after add scoped, the custom-class will not apply -->
 <style lang="scss"> 
    .commAddDlg {
        width: 70%;
        .el-dialog__header {
            // position: relative;
            // justify-content: center;
            // background-color: #66b1ff;
            // margin-left: 43%;
            // text-align: center;
            border-bottom: 1px solid #d8dce5;
        }
        .el-dialog__title {
            font-size: 25px;
        }
    }

    .time {
    font-size: 13px;
    color: #999;
    }

    .bottom {
    margin-top: 13px;
    line-height: 12px;
    }

    .button {
    padding: 0;
    float: right;
    }

    .image {
    width: 100%;
    display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
