<template>
    <div class='layout'>
        <h2 style="padding: 10px 0; margin: 10px 0; box-sizing: border-box; font-weight:normal; font-size:18px; margin:10px 0;">试题分类</h2>
        <div class='layout-content'>
            <div>
              
               <div class='btn'>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加类型</el-button>
               </div>
            </div>

            <div>
                <template>
                    <el-table
                    :data="get_getQuestionsType"
                    style="width: 100%">
                    <el-table-column
                        prop="questions_type_id"
                        label="类型ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="questions_type_text"
                        label="类型名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作">
                    </el-table-column>
                    </el-table>
                </template>
            </div>
            
        </div>
        <!-- 弹出框 -->
        <el-dialog
            title="创建新类型"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>        
    </div>
</template>
<script>

import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            dialogVisible: false,
            input: '', // 弹框里的输入框
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]        
        }
    },
    computed:{
        ...mapGetters('questionsType',['get_getQuestionsType'])
    },
    methods:{
        ...mapActions('questionsType',['axios_getQuestionsType']),
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    },
    created(){
        this.axios_getQuestionsType()
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
    .layout {
        width: 100%;
        height: 100%;
        padding: 0px 24px 24px;
        overflow-x: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex: auto;
        background: #f0f2f5;
        min-height: 0;
    }
    .layout-content {
        background: rgb(255, 255, 255);
        padding: 24px;
        margin: 0px 0px 20px;
        border-radius: 10px;
        box-sizing: border-box;
    }
</style>