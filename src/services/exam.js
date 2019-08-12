import request from '../utils/request';

//zwy 获取所有考试类型接口
export function examType() {
  return request('/exam/examType')
}

//zwy 获取所有课程接口
export function subject() {
  return request('/exam/subject')
}

// zwy 创建试卷接口
export function addexam(obj) {
  return request('/exam/exam', {
    method: 'POST',
    data: obj
  })
}

//zwy 获取试卷列表
export function questionList(obj) {
  return request('/exam/exam', {
    method: 'GET',
    params:{obj}
  })
}

// 获取学生试卷列表接口
export function marks_exam_paper() {
  return request('/exam/student');
}

//获取学生试卷列表详情
export function mark_detail(id){
  return request('/exam/student/t27znv-gu7azm-qpq9ai-laaf9m');
}