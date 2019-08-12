import {getgrade,addgrade,updategrade,delgrade,
        getroom,addroom,delroom,
        getsubject,
        getstudentIs,getstudentNo,delstudent
} from "../../services/manger";

function alertRaload(data){
    if(data.code===0){
        alert(data.msg)
    }else{
        alert(data.msg);
        window.location.reload()
    }
}

const manger = {
    namespaced:true,
    state:{
        gradeList:[],//班级列表
        roomList:[],//教室列表
        subjectList:[],//课程列表
        studentList:[],//学生列表
    },
    getters:{
        getgradeList(state){
            return state.gradeList;
        },
        getroomList(state){
            return state.roomList
        },
        getsubjectList(state){
            return state.subjectList;
        },
        getstudentList(state){
            return state.studentList;
        }
    },
    mutations:{
        //班级列表
        getgradeMutations(state,data){
            state.gradeList=data;
        },
        //教室列表
        getroomMutations(state,data){
            state.roomList=data;
        },
        //课程列表
        getsubjectMutations(state,data){
            state.subjectList=data;
        },
        //学生列表
        getstudentMutations(state,data){
            state.studentList=data;
        }
    },
    actions:{
        //班级
        async getgradeActions({commit}){
            const res=await getgrade();
            //console.log(res.data.data);
            commit('getgradeMutations',res.data.data)
        },
        async addgradeActions({commit},obj){
            const res=await addgrade(obj);
            alertRaload(res.data);
        },
        async updateActions({commit},obj){
            const res=await updategrade(obj);
            alertRaload(res.data);
        },
        async delgradeActions({commit},obj){
            const res=await delgrade(obj);
            alertRaload(res.data);
        },
        //教室
        async getroomActions({commit,dispatch}){
            const result = await getroom();
            commit('getroomMutations',result.data.data);
        },
        async addroomActions({commit},obj){
            const result = await addroom(obj.room_text);
            alertRaload(result.data);
        },
        async delroomActions({commit},id){
            const result = await delroom(id);
            alertRaload(result.data);
        },
        //课程
        async getsubjectActions({commit}){
            const result = await getsubject();
            //console.log(result);
            commit('getsubjectMutations',result.data.data);
        },
        //学生
        async getstudentActions({commit}){
            const res = await getstudentIs();
            const result = await getstudentNo();
            //console.log(res.data.data,result.data.data);
            commit('getstudentMutations',res.data.data.concat(result.data.data))
        },
        async delstudentActions({commit},obj){
            const res=await delstudent(obj);
            //console.log(res);
            alertRaload(result.data);
        }
    }
}

export default manger;