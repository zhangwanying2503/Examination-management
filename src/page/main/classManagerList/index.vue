<template>
    <div class="grade">
        <h2>{{title}}</h2>
        <div class="content">
            <el-button type="primary" class="addGradeBtn" @click="add">+{{btnCon}}</el-button>
            <template>
                <el-table :data='gradeList' class="gradeTable" id="gradeTable" :header-cell-style="{background:'#fafafa'}">
                    <el-table-column prop="grade_name" label="班级名"></el-table-column>
                    <el-table-column prop="subject_text" label="课程名"></el-table-column>
                    <el-table-column prop="room_text" label="教室号"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" >
                            <el-button @click="change(scope.$index,scope.row)">修改</el-button>|
                            <el-button @click="deletegrade(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <grade-dialog :title="btnCon" :btnClass='btnClass' :form="form" :dialogFormVisible='dialogFormVisible' :getroomList='getroomList' :getsubjectList='getsubjectList' @abgesagt="abgesagt" @addgrade="addGrade"></grade-dialog>
    </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from "vuex";

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            title:"班级管理",
            btnCon:"添加班级",
            dialogFormVisible:false,
            btnClass:"add",
            form:{
                grade_id:'',
                grade_name:'',
                room_id:'',
                room_text:'',
                subject_id:'',
                subject_text:''
            },
            updateGrade:{
                grade_id:'',
                grade_name:'',
                subject_id:'',
                room_id:''
            }
        }
    },
    computed:{
        ...mapState('manger',['gradeList']),
        ...mapGetters('manger',['getroomList','getsubjectList'])
    },
    methods:{
        ...mapActions('manger',['getgradeActions','addgradeActions','updateActions','getroomActions','getsubjectActions','updateActions','delgradeActions']),
        //点击添加班级按钮
        add(){
            this.btnClass="add";
            this.dialogFormVisible=true;
            this.form={
                grade_id:'',
                grade_name:'',
                room_id:'',
                room_text:'',
                subject_id:'',
                subject_text:''
            }
        },
        //点击取消弹框
        abgesagt(){
            this.dialogFormVisible=false;
        },
        //点击编辑按钮
        change(index,row){
            //console.log(index,row);
            this.btnClass='update'
            this.dialogFormVisible=true;
            this.form={
                grade_name:row.grade_name,
                room_id:row.room_id,
                room_text:row.room_text,
                subject_id:row.subject_id,
                subject_text:row.subject_text
            };
            this.updateGrade={
                grade_id:row.grade_id,
                grade_name:row.grade_name,
                subject_id:row.subject_id,
                room_id:row.room_id,
            }
        },
        //点击弹框的确定按钮
        addGrade(obj){
            //判断是添加班级 还是 编辑编辑
            if(this.btnClass=='add'){
                const room=this.getroomList.filter(item=>item.room_text==obj.room_text);
                const subject=this.getsubjectList.filter(item=>item.subject_text==obj.subject_text)
                //console.log(room[0].room_id,subject[0].subject_id)
                const gradeObj={
                    grade_name:obj.grade_name,
                    room_id:room[0].room_id,
                    subject_id:subject[0].subject_id
                };
                //console.log(gradeObj)
                this.addgradeActions(gradeObj)
                this.dialogFormVisible=false; 
            }else{
                // console.log(this.updateGrade);
                this.updateActions(this.updateGrade)
            };
            //关闭弹框
            this.dialogFormVisible=false;
        },
        //删除班级
        deletegrade(row){
            // console.log(row);
            this.delgradeActions({grade_id:row.grade_id})
        }
    },
    created(){
        this.getgradeActions();
        this.getroomActions();
        this.getsubjectActions()
    },
    mounted(){

    }
}
</script>
<style  lang="">
@import "../../../styles/manger.css";
</style>