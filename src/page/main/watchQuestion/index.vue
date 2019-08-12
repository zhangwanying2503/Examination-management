<template>
    <div class="wrapper">
        <h3>查看试题</h3>

        <!-- 搜索框 -->
        <div class="search">
            <p>
                <b>课程类型：</b>
                <ul>
                    <li :class="{'liactive':checkAll==true}" @click="checkAllFn">All</li>
                    <li v-for="(item,index) in allCoursesList" :key="index" @click="checkOneFn(index,item)" :class="{'liactive':activeIndex==index}" ref="optionTip">{{item.subject_text}}</li>
                </ul>
            </p>
            <div class="condition">
                <label id="testBox">考试类型：
                    <el-select v-model="examValue" placeholder="请选择" size="25px">
                        <el-option
                            v-for="(item,index) in typeOfExamList"
                            :key="index"
                            :value="item.exam_name">
                        </el-option>
                    </el-select>
                </label>
                
                <label> 题目类型：
                    <el-select v-model="questionValue" placeholder="请选择">
                        <el-option
                            v-for="(item,index) in typeOfQuestionList"
                            :key="index"
                            :value="item.questions_type_text">
                        </el-option>
                    </el-select>
                </label>

                <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
            </div>
        </div>

        <!-- 试卷列表 -->
        <div class="content">
            <ol v-if="allQuestionList.length>0">
                <li v-for="item in allQuestionList" :key="item.id" @click="editQuestion(item,$event)">
                    <p>{{item.title}} <b :style="{color:'blue',float:'right',fontWeight:'normal'}">编辑</b></p>
                    <p><span>{{item.questions_type_text}}</span><span>{{item.subject_text}}</span><span>{{item.exam_name}}</span></p>
                    <p>{{item.user_name}} 发布</p>
                </li>
            </ol>
            <div class="warnBox" v-else>
                <h3>没有查找到数据</h3>
            </div>
        </div>

    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex';

export default {
    props:{
        
    },
    data(){
        return {
            activeIndex:1000,
            checkAll:false,
            examValue:'',
            questionValue:'',
            subject_id:'',
            exam_id:'',
            questions_type_id:''
        }
    },
    components:{

    },
    computed:{
        ...mapState('questionManager',['allCoursesList','typeOfExamList','typeOfQuestionList','allQuestionList'])
    },
    methods:{
        ...mapActions('questionManager',['getAllCourses','getAllTypeOfExam','getAllTypeOfQuestion','getAllQuestion','getQuestionWithCondition']),
        checkAllFn(){
            this.subject_id='';
            this.checkAll=!this.checkAll;
            if(this.checkAll==true){
                this.$refs.optionTip.forEach(item=>{
                    item.classList.add('liactive');
                })
            }else{
                this.$refs.optionTip.forEach(item=>{
                    item.classList.remove('liactive');
                })
            }
        },
        checkOneFn(index,item){
            this.checkAll=false;
            this.$refs.optionTip.forEach(item=>{
                item.classList.remove('liactive');
            })
            this.activeIndex=index;
            this.subject_id=item.subject_id;
        },
        editQuestion(item,e){
            localStorage.setItem('info',JSON.stringify(item));
            if(e.target.nodeName==="B"){
                this.$router.push({name:'editQuestion',params:{item:item}});
            }else{
                this.$router.push({name:'detailOfQuestion',params:{item:item}})
            }
        },
        searchFn(){
            this.examValue && (this.exam_id=this.typeOfExamList.find(item=>item.exam_name===this.examValue).exam_id);
            this.questionValue && (this.questions_type_id=this.typeOfQuestionList.find(item=>item.questions_type_text===this.questionValue).questions_type_id);
            //筛选试题
            this.subject_id=this.subject_id===""?null:this.subject_id;
            if(this.exam_id===""){
                this.getQuestionWithCondition({questions_type_id:this.questions_type_id,subject_id:this.subject_id});
            }else if(this.questions_type_id===""){
                this.getQuestionWithCondition({exam_id:this.exam_id,subject_id:this.subject_id});
            }else{
                this.getQuestionWithCondition({exam_id:this.exam_id,questions_type_id:this.questions_type_id,subject_id:this.subject_id}); 
            }   
        }
    },
    created(){
        //获取所有课程
        this.getAllCourses(); //subject_id
        //获取所有考试类型
        this.getAllTypeOfExam();
        //获取所有试题类型
        this.getAllTypeOfQuestion();
        //获取所有试题
        this.getAllQuestion();
    },
    mounted(){
        
    }
}
</script>
<style scoped lang="scss">
.wrapper{
    width:100%; 
    height:100%;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    padding:20px; 
    h3{
        font-weight:normal;
        font-size:18px;
        margin:10px 0;
    }
    .search{
        width:100%;
        height:auto; 
        margin:10px 0; 
        border-radius:10px;
        background:white;
        box-sizing:border-box; 
        padding:20px; 
        p{
            display:flex;
            b{
                font-weight:normal;
                margin:10px 2px;
            }
            ul{
                flex:1;
                display:flex;
                flex-wrap:wrap;
                li{
                padding:3px 10px;
                font-size:12px; 
                color:#666;
                margin:10px 2px;
                }
                .liactive{
                    background:blue;
                    color:#fff;
                    border-radius:3px;
                }
            }
        }
        .condition{
            display:flex;
            margin:10px 0;
            label{
                margin-right:10px;
            }
            .el-select{
                width:170px; 
                height:25px;
                .el-input{
                    display:flex;
                    width:100%;
                    height:25px!important;
                    line-height:25px!important;
                    padding:0;
                    overflow:hidden;
                    .el-input__inner{
                        height:25px!important;
                        line-height:25px!important;
                    }
                }
            }
            button{
                margin-left:30px;
                background:blue;
                width:150px;
            }
        }
    }
    .content{
        width:100%; 
        box-sizing:border-box;
        padding:25px;
        background:#fff;
        border-radius:10px;
        margin-top:15px;
        ol{
            width:100%; 
            display:flex;
            flex-direction:column;
            li{
                width:100%; 
                border-bottom:solid #ccc 1px;
                color:#666;
                display:flex;
                flex-direction:column;
                font-size:14px;
                p{
                    margin:10px;
                    span{
                        padding:2px 6px;
                        margin-right:10px;
                        font-size:12px;
                    }
                    span:nth-child(1){
                        border:solid 1px #91d5ff;
                        background:#e6f7ff;
                        color:#1890ff;
                    }
                    span:nth-child(2){
                        border:solid 1px #adc6ff;
                        background:#f0f5ff;
                        color:#2f54eb;
                    }
                    span:nth-child(3){
                        border:solid 1px #ffd591;
                        background:#fff7e6;
                        color:#fa8c16;
                    }
                }
                p:nth-child(3){
                    color:blue;
                }
            }
            li:hover{
                background:#f7f8ff;
            }
        }
        .warnBox{
            width:100%;
            height:500px;
            h3{
                width:100%;
                height:100px;
                line-height:100px;
                text-align:center;
                font-size:18px;
                color:#777;
            }
        }
    }
}
</style>