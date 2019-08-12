<template>
    <el-dialog :title='title' :visible.sync='dialogFormVisible'>
        <el-form :model='form'>
            <el-form-item >
                <p><b>*</b>班级名：</p>
                <el-input v-model="form.grade_name" placeholder="班级名"></el-input>
            </el-form-item>
            <el-form-item >
                <p><b>*</b>教室号：</p>
                <el-select v-model="form.room_text"   placeholder="请选择教室号">
                    <el-option v-for="(item) in getroomList" 
                    :key='item.room_id'
                    :label="item.room_text"  
                    :value='item.room_text'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <p><b>*</b>课程名：</p>
                <el-select v-model="form.subject_text" placeholder="课程名">
                    <el-option v-for="item in getsubjectList"
                    :key='item.subject_id'
                    :label="item.subject_text" 
                    :value='item.subject_text'></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot='footer' class="dialog-footer">
            <el-button @click="$emit('abgesagt')">取消</el-button>
            <el-button type='primary' @click="$emit('addgrade',form)">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:{
        title:String,
        btnClass:String,
        form:Object,
        dialogFormVisible:Boolean,
        getroomList:Array,
        getsubjectList:Array
    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="">

</style>