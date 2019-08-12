<template>
    <div class="wrapper">
        <Head></Head>
        <section>
            <LeftBar></LeftBar>
            <div class="rightContent">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script>
import Head from './head';
import LeftBar from './leftBar';
export default {
    props:{

    },
    components:{
        Head,
        LeftBar
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
html,body{
    width:100%; 
    height:100%; 
    overflow:hidden;
}
.wrapper{
    width:100%; 
    height:100%; 
    overflow:hidden;
    display:flex;
    flex-direction:column;
}
.header{
    width:100%; 
    height:10%; 
    background:white;
    display:flex;
    box-sizing:border-box;
    padding:0 100px;
}
section{
    width:100%; 
    flex:1; 
    display:flex;
}
.leftsidebar{
    width:220px;
    max-width:220px;
    min-width:220px;
    height:100%; 
    background:#232a41;
    overflow-y:auto;
}
.rightContent{
    flex:1; 
    height:100%; 
    background:#eee;
    overflow:hidden;
}
</style>