<template>
    <div class="editWrapper">
        <h3>编辑试题</h3>
        <div class="question_content">
            <Question />
        </div>
    </div>
</template>
<script>
import Question from '../../../components/aboutQuestion/question'

export default {
    components:{
        Question
    },
    created(){
        
    }
}
</script>
<style scoped lang="scss">
.editWrapper{
    width:100%; 
    height:100%;
    overflow:hidden;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    padding:0 20px; 
    .question_content{
        width:100%; 
        border-radius:10px;
        box-sizing:border-box;
        padding:20px; 
        background:#fff;
    }
}
</style>
