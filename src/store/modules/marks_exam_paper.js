import {
    marks_exam_paper,mark_detail
} from '../../services/exam';
import { Row } from 'element-ui';

const markingManagement = {
    namespaced: true,
    state:{
        examPaperList: []
    },
    getters:{
        get_marks_exam_paper(state) {
            return state.examPaperList
        },
        mutations_marks_exam_detail(id){

        }
    },
    mutations:{
        mutations_marks_exam_paper(state, data) {
            state.examPaperList =data.markingStudentList
            // state.examPaperList.forEach(item=>{
            //     item['grade_name']==data.obj.row.grade_name;
            // })
            // console.log(state.examPaperList)
            data.obj.$router.push({name:'markingstudent'})
        }
    },
    actions: {
        //获取阅卷列表
        async axios_marks_exam_paper({commit},obj) {
            const result = await marks_exam_paper();
            const markingStudentList=result.data.exam.filter(item=>item.grade_id==obj.row.grade_id);
            commit('mutations_marks_exam_paper',{markingStudentList,obj})
        },
        async getStudentActions({commit,dispatch},obj){
            dispatch('axios_marks_exam_paper',obj)
        },
        async axios_marks_exam_detail({commit},obj){
            const result = await mark_detail(obj.id);
            //console.log(result);
            obj.$router.push({name:'markindetail'})
        }
    }

}

export default markingManagement;
