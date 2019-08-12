<template>
    <div class='student'>
        <h2>{{title}}</h2> 
        <div class="content">
            <el-form :inline='true' :model='studentForm' class='demo-form-inline' label-width='20%' size="mini" ref='studentForm'>
                <el-form-item label="">
                    <el-input v-model='studentForm.student_name' placeholder="输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="studentForm.room_text"   placeholder="请选择教室号">
                        <el-option v-for="(item) in getroomList" 
                        :key='item.room_id'
                        :label="item.room_text"  
                        :value='item.room_text'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="studentForm.grade_name"   placeholder="班级名">
                        <el-option v-for="(item) in getgradeList" 
                        :key='item.grade_id'
                        :label="item.grade_name"  
                        :value='item.grade_name'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary" @click="resetForm('studentForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <template>
               <el-table :data='getstudentList.slice((currentPage-1)*pageSize,currentPage*pageSize)' class="studentTable" id="studentTable" :header-cell-style="{background:'#fafafa'}">
                    <el-table-column prop="student_name" label="姓名"></el-table-column>
                    <el-table-column prop="student_id" label="学号"></el-table-column>
                    <el-table-column prop="grade_name" label="班级"></el-table-column>
                    <el-table-column prop="room_text" label="教室"></el-table-column>
                    <el-table-column prop="student_pwd" label="密码"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" >
                            <el-button @click="deletestudent(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination background layout='prev,pager,next,sizes,jumper':total="getstudentList.length" :page-size='pageSize' :page-sizes='pageSizes' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='currentPage'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from "vuex";

export default {
    props:{

    },
    components:{
        
    },
    data(){
        return {
            title:"学生管理",
            currentPage:1,
            pageSize:20,
            pageSizes:[5,10,20,50,100],
            studentForm:{
                student_name:'',
                room_text:'',
                grade_name:''
            }
        }
    },
    computed:{
        ...mapGetters('manger',['getgradeList','getroomList','getstudentList'])
    },
    methods:{
        ...mapActions('manger',['getgradeActions','getroomActions','getstudentActions','delstudentActions']),
        //点击选择条数
        handleSizeChange(val){
            console.log(`每页${val}条`);
            this.pageSize=val;
        },
        //跳转页面
        handleCurrentChange(val){
            console.log(`当前页${val}`);
            this.currentPage=val;
        },
        //点击删除学生
        deletestudent(row){
            this.delstudentActions({student_id:row.student_id})
        },
        //点击重置
        resetForm(formName){
            this.studentForm={
                student_name:'',
                room_text:'',
                grade_name:''
            };
            //this.$refs[formName].resetFields()
        }
    },
    created(){
        this.getgradeActions();
        this.getroomActions();
        this.getstudentActions();
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
@import "../../../styles/manger.css";

</style>