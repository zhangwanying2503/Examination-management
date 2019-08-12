import {getAllCourses,getAllTypeOfQuestion,getAllTypeOfExam,getAllQuestion,getQuestionWithCondition} from '../../services/questionManager';

const questionManager={
    namespaced:true,
    state:{
        typeOfExamList:[],
        typeOfQuestionList:[],
        allQuestionList:[],
        allCoursesList:[],
        questionDetail:[]
    },
    getters:{

    },
    mutations:{
        //更改state值
        setDatas(state,option){
            for(var i in option){
                state[i]=option[i]
            }
        }
    },
    actions:{
        //获取所有课程
        async getAllCourses({commit}){
            const result = await getAllCourses();
            commit('setDatas',{'allCoursesList':result.data.data})
        },
        //获取所有考试类型
        async getAllTypeOfExam({commit}){
            const result = await getAllTypeOfExam();
            commit('setDatas',{'typeOfExamList':result.data.data});
        },
        //获取所有试题类型
        async getAllTypeOfQuestion({commit}){
            const result = await getAllTypeOfQuestion();
            commit('setDatas',{'typeOfQuestionList':result.data.data});
        },
        //获取所有试题
        async getAllQuestion({commit}){
            const result = await getAllQuestion();
            commit('setDatas',{'allQuestionList':result.data.data});
        },
        //筛选试题
        async getQuestionWithCondition({commit},option){
            const result = await getQuestionWithCondition(option);
            commit('setDatas',{'allQuestionList':result.data.data});
        },
        //查看试题详情
        async watchDetailOfQuestion({commit},option){
            const result = await getQuestionWithCondition(option);
            commit('setDatas',{'questionDetail':result.data.data});
        }
    }
}
export default questionManager;