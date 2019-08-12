<template>
    <div class="detailWrapper">
        <h3>试题详情</h3>
        <div class="contentbox">
            <div class="leftCon">
                <p>出题人:{{info.user_name}}</p>
                <h4>题目信息</h4>
                <div class="tips"><span>{{info.questions_type_text}}</span><span>{{info.subject_text}}</span><span>{{info.exam_name}}</span></div>
                <p :style="{color:'#000',fontSize:'14px'}">{{info.title}}</p>
                <div class="questionBox">
                    <mavon-editor class="md questionDetail"
                    :value="info.questions_stem"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :scrollStyle=false
                    :ishljs="true"
                    ></mavon-editor>
                </div>
            </div>
            <div class="rightCon">
                <h4>答案信息</h4>
                <div class="answerBox">
                    <mavon-editor class="md questionDetail"
                    :value="info.questions_answer"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :scrollStyle=false
                    :ishljs="true"
                    ></mavon-editor>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    data(){
        return {
            info:JSON.parse(localStorage.getItem('info'))
        }
    },
    methods:{
        ...mapActions('questionManager',['watchDetailOfQuestion'])
    },
    created(){
        const {exam_id,questions_id,questions_type_id,subject_id} = this.info;
        this.watchDetailOfQuestion({exam_id:exam_id,questions_id:questions_id,questions_type_id:questions_type_id,subject_id:subject_id})
    }
}
</script>
<style scoped lang="scss">
.detailWrapper{
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
    .contentbox{
        width:100%;
        height:auto;
        display:flex;
        background:#eee;
        .leftCon{
            flex:1;
            height:3000px;
            margin-right:15px;
            border-radius:10px; 
            background:#fff;
            box-sizing:border-box;
            padding:25px;
            display:flex;
            flex-direction:column;
            p{
                color:#666;
                font-size:14px;
                margin:5px 0;
            }
            h4{
                font-size:16px;
                margin:20px 0;
                font-weight:normal;
            }
            .tips{
                margin:10px 0;
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
            .questionBox{
                width:100%;
                height:auto;
                margin-top:10px;
                overflow:hidden;
                .v-note-wrapper{
                    width:500px;
                    height:auto; 
                    height:auto;
                    .v-note-panel{
                        width:100%;
                    }
                }
            }
        }
        .rightCon{
            width:500px;
            padding:25px;
            height:3000px;
            border-radius:10px; 
            background:#fff;
            h4{
                font-size:16px;
                margin:20px 0;
                font-weight:normal;
            }
            .answerBox{
                width:100%;
                height:auto;
                margin-top:10px;
            }
        }
    }
}
</style>
