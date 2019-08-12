<template>
    <div class="leftsidebar">
        <el-menu default-active="2" class="el-menu-vertical-demo" text-color="#ffffff" background-color="#232a41" :unique-opened="uniqueFlag">
            <template v-for="(item,index) in listData">
                <el-submenu :key="index" :index="(index*1+1).toString()" v-if="item.isShow">
                    <template slot="title">
                        <i :class="item.groupIcon"></i>
                        <span>{{item.groupName}}</span>
                    </template>
                    <template v-for="(file,ind) in item.routes">
                        <el-menu-item-group :key="ind" v-if="file.isShow">
                            <el-menu-item :index="`${index*1+1}-${ind*1+1}`" @click="gotoFn(file.path)">{{file.title}}</el-menu-item>
                        </el-menu-item-group>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import {getMenuData} from '../../router/router.config'
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
            listData:[],
            uniqueFlag:true
        }
    },
    computed:{
        ...mapState('main',['user_name','authoList'])
    },
    methods:{
        ...mapActions('main',['getAuthority']),
        gotoFn(path){
            this.$router.push(path);
        },
        checkShowList(){
            //定义子模块的访问权限isShow
            this.listData.forEach(item=>{
                item.routes.forEach(file=>{
                    const ind=this.authoList.findIndex(val=>file.view_id===val.view_id);
                    if(ind==-1){
                        file.isShow=false;
                    }else{
                        file.isShow=true;
                    }
                })
            })
            //定义父模块的访问权限isShow
            this.listData.forEach(item=>{
                item.isShow=item.routes.some(file=>file.isShow==true);
            })
        }
    },
    created(){
        this.listData=getMenuData();
        this.getAuthority();
    },
    mounted(){
        
    },
    watch:{
        'authoList'(newData,oldData){
            this.checkShowList();
        }
    }
}
</script>
<style scoped lang="scss">

</style>
