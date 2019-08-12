import request from '../utils/request';

// 获取添加试题接口
export function getAddQuestions(obj) { 
  return request('/exam/questions', {
    method: 'POST',
    data: {
      questions_type_id: obj.questions_type_id, // 试题类型id
      questions_stem: obj.questions_stem, // 	题干
      subject_id: obj.subject_id, // 课程id
      exam_id: obj.exam_id, // 考试类型id
      user_id: obj.user_id, // 用户id
      questions_answer: obj.questions_answer, // 题目答案
      title: obj.title // 试题的标题
    }
  });
}

// 所有考试类型
export function getExamType() {
  return request('/exam/examType');
}

// 所有课程类型
export function getSubjectType() {
  return request('/exam/subject');
}

//添加试题
// export function getquest(obj) {
//     console.log(obj,'objjjjjjj')
   
// }


//更新试题（试题编辑）
export function updateQuestion(options){
  return request('/exam/questions/update',{method:'PUT',data:options});
}