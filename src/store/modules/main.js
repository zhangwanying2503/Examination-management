import {login,getInfo,getAuthority} from '../../services/index';

const main={
    namespaced:true,
    state:{
        user_id:'',
        user_name:'',
        authoList:[]
    },
    getters:{
        getData(state){
            return {user_id:state.user_id,user_name:state.user_name,authoList:state.authoList}
        }
    },
    mutations:{
        setDatas(state,options){
            //state={...state,...options};
            for(var i in options){
                state[i]=options[i]
            }
        }
    },
    actions:{
        async getInfo({commit},options){
            const result=await getInfo();
            localStorage.setItem('userInfo',JSON.stringify(result.data.data))
            commit('setDatas',{user_id:result.data.data.user_id,user_name:result.data.data.user_name});
            return result.data.data.user_id;
        },
        async getAuthority({commit,dispatch},options){
            const user_id=await dispatch('getInfo');
            const result=await getAuthority(user_id);
            localStorage.setItem('authoList',JSON.stringify(result.data.data))
            commit('setDatas',{authoList:result.data.data});
        }
    }
}
export default main;