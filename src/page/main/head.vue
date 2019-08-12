<template>
    <header class="header">
        <div class="logo">
            <h1>考试系统</h1>
        </div>
        <el-dropdown>
            <span class="el-dropdown-link"> <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561643949372&di=d26c8c0bb9e596fb98ffc14e4bcadf30&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3382395264%2C3262354891%26fm%3D214%26gp%3D0.jpg"> {{user_name}} </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>我的班级</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </header>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState('main',['user_name'])
    },
    methods:{
        logout(){
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('authoList');
            this.$router.push('/');
        }
    },
    mounted(){
        
    },
    created(){
        
    }
}
</script>
<style scoped lang="scss">
.logo{
    flex:1;
    display:flex;
}
h1{
    display:flex;
    flex-direction: column;
    justify-content: center;
    img{
        width:auto;
        height:auto;
    }
}
.el-dropdown{
    float:right;
    display:flex;
    flex-direction:column;
    justify-content:center;
    span{
        display:flex;
        align-items:center;
        padding:0 10px;
        img{
            border-radius:50%;
            height:30px;
            width:30px;
            margin:0 10px;
        }
    }
    .el-dropdown-menu{
        width:90%;
        left:0;
        top:0;
    }
}
.el-dropdown:hover{
    background:#eee;
}
</style>
