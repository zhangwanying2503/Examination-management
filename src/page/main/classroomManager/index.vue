<template>
    <div class="room">
       <h2>{{title}}</h2> 
       <div class="content">
            <el-button type="primary" class="addGradeBtn" @click="dialogFormVisible=true">+{{btnCon}}</el-button>
            <template>
                <el-table :data='roomList' class="gradeTable" id="roomTable" :header-cell-style="{background:'#fafafa'}">
                    <el-table-column prop="room_text" label="教室号"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" >
                            <el-button @click="delroomActions(scope.row.room_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
       </div>
       <el-dialog title="添加班级" :visible.sync='dialogFormVisible'>
            <el-form :model='form'>
                <el-form-item >
                    <p><b>*</b>教室号：</p>
                    <el-input v-model="form.room_text" placeholder="班级名"></el-input>
                </el-form-item>
            </el-form>
            <div slot='footer' class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取消</el-button>
                <el-button type='primary' @click="addroom">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from "vuex"

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            title:"教室管理",
            btnCon:"添加教室",
            dialogFormVisible:false,
            form:{
                room_text:''
            }
        }
    },
    computed:{
        ...mapState('manger',['roomList'])
    },
    methods:{
        ...mapActions('manger',['getroomActions','addroomActions','delroomActions']),
        addroom(){
            this.addroomActions({room_text:this.form.room_text});
            this.dialogFormVisible=false;
        },
    },
    created(){
        this.getroomActions();
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
@import "../../../styles/manger.css";
</style>