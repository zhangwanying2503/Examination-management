<template>
    <div class='studentDetail'>
        <h2>{{title}}</h2>
        <div class='content'>
            <div class="main"></div>
            <div class="fractionBox">
                <div class="fraction">  
                    <p>姓名</p>
                    <p>得分：<span>{{value}}</span></p>
                    <div class='block'>
                        <el-slider v-model='value'></el-slider>
                    </div>
                    <el-button type='primary'>确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            title:"阅卷",
            value:0
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
<style >
.studentDetail{
    width:100%;
	height:100%;
	display: flex;
	flex-direction: column;
	flex: auto;
	min-height: 0;
	padding: 0px 24px 24px;
	overflow-x: hidden;
	overflow-y:auto;
	box-sizing: border-box;
}

.studentDetail>h2{
   padding: 20px 0px; 
   margin: 10px 0; 
   box-sizing: border-box;
}

.content {
	width: 100%;
	flex:1;
	padding:10px 20px;
	box-sizing: border-box;
    display: flex;
}

.main{
    flex:1;
    height:auto;
    background: #fff;
    border-radius: 10px;
}

.fractionBox{
    margin-left:20px;
    width:350px;
    height:100%;
}

.fraction{
    position:fixed;
    top:172px;
    right:50px;
    margin-left:20px;
    width:300px;
    height:260px;
    background:#fff;
    border-radius: 10px;
    padding:25px;
}

.fraction>p{
    font-size:22px;
    line-height:50px;
}

.fraction>p>span{
    color:#00f;
}

.fraction .block{
    margin:15px 0;
}
</style>