import request from '../utils/request';

//请求所有课程
export function getAllCourses(){
    return request('/exam/subject');
}

//请求所有试题类型
export function getAllTypeOfQuestion(){
    return request('/exam/getQuestionsType',{method:'GET'})
}

//请求所有考试类型
export function getAllTypeOfExam(){
    return request('/exam/examType',{method:'GET'})
}


//请求所有试题列表
export function getAllQuestion(){
    return request('/exam/questions/new',{method:'GET'})
}


//按条件查找试题
export function getQuestionWithCondition(options){
    return request('/exam/questions/condition',{method:'GET',data:options})
}