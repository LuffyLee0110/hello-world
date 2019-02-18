<template>
    <el-dialog custom-class="appAddDlg" :title="pageDef.title" 
        :visible.sync="buttonDef.dialogVisible" :close-on-press-escape="false" 
        :close-on-click-modal="false" center>
        <el-row>
            <div class="teamSelect">
                <el-select v-model="team" clearable placeholder="请选择团队">
                    <el-option v-for="item in buttonDef.dialogDef.team" 
                        :key="item.id" :label="item.name" :value="item.id">
                </el-option>
                </el-select>
            </div>
        </el-row>
        <el-row>
            <el-col :span="6" @click.native="clickAnd">
                <el-card shadow="hover">
                    <div class="imgdiv">
                        <img src="/src/assets/icon/android1.png" alt="androidios" class="image">
                    </div>
                    <div class="addInfo">
                        <span >Android应用</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" @click.native="clickApp">
                <el-card shadow="hover">
                    <div class="imgdiv">
                        <img src="/src/assets/icon/apple.png" alt="windows" class="image">
                    </div>
                    <div class="addInfo">
                        <span >iOS企业应用</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" @click.native="clickWin">
                <el-card shadow="hover">
                    <div class="imgdiv">
                        <img src="/src/assets/icon/windows1.png" alt="windows" class="image">
                    </div>
                    <div class="addInfo">
                        <span >Windows应用</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" @click.native="clickSto">
                <el-card shadow="hover">
                    <div class="imgdiv">
                        <img src="/src/assets/icon/iosapp.jpg" alt="iosappstore" class="image">
                    </div>
                    <div class="addInfo">
                        <span>iOS App Store应用</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- <div slot="footer" class="dialog-footer" align="center">
        <TempButton @click="doDiaCancel">取 消</TempButton>
        <TempButton type="primary" @click="doDiaSave">保 存</TempButton>
        </div> -->
    </el-dialog>
</template>

<script>
import TempButton from "@/components/Templates/TempButton/TempButton"
export default {
    name: "TempAppAddDialog",
    props: {
        pageDef: {
            type: Object,
            required: true
        },
        buttonDef: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            value:'1'
        };
    },
    methods: {
        doDiaCancel() {
            this.$set(this.buttonDef,"dialogVisible",false)
            this.$emit("doDiaCancel")
        },
        doDiaSave() {
            this.$set(this.buttonDef, 'buttonDef.dialogVisible =false', false)
            this.$emit("doDiaSave", this.index, this.form);
        },
        clickAnd () {
            console.log('click Android')
            this.$set(this.buttonDef,"dialogVisible",false)
            this.$emit("clickAnd", this.value)
            this.$router.push({
                name: 'AppNew',
                params: {
                    disabled: false,
                    ifEdit: false
                }
            })
        },
        clickApp () {
            console.log('click Apple Enterprise');
            this.$set(this.buttonDef,"dialogVisible",false)
            this.$emit("clickApp", this.value)
            this.$router.push({
                name: 'AppNew',
                params: {
                    disabled: false,
                    ifEdit: false
                }
            })
        },
        clickWin () {
            console.log('click Windows');
            this.$set(this.buttonDef,"dialogVisible",false)
            this.$emit("clickWin", this.value)
            this.$router.push({
                name: 'AppNewWin',
                params: {
                    disabled: false,
                    ifEdit: false
                }
            })
        },
        clickSto () {
            console.log('click App Store')
            this.$set(this.buttonDef,"dialogVisible",false)
            this.$emit("clickSto", this.value)
            this.$router.push({
                name: 'AppNewAppstore',
                params: {
                    disabled: false,
                    ifEdit: false
                }
            })
        }

    },
    components: {
        TempButton
    },
};
</script>

 <!-- <style scoped lang="scss"> -->
 <!-- after add scoped, the custom-class will not apply -->
 <style lang="scss"> 

    .appAddDlg {
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
        // .el-card__body {
        //     height: 15rem;
        //     margin: 10px;
        // }
        .el-card {
            margin-right: 10px;
        }
        .imgdiv {
            min-height: 160px;
            position: relative;
        }
        .image {
            width: 10rem;
            margin: auto;
            position: absolute;
            top:50%; 
            left:50%;
            transform: translate(-50%,-50%);
        }
        .addInfo {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 20px;
        }
        .el-col {
            margin-top: 1rem;
            // width: 20%;
            :hover {
                // transform: translateY(-4px);
                // box-shadow: 0 15px 30px rgba(0,0,0,.1);
                background-color: #d8dce5;

            }
        }
        .teamSelect {
            width: 60%;
            
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
