import request from "../utils/request";

//获取班级
export function getgrade(){
    return request("/manger/grade")
}

//添加班级
export function addgrade(obj){
    console.log(obj)
    return request("/manger/grade",{method:"POST",data:obj})
}

//更新班级
export function updategrade(obj) {
    return request("/manger/grade/update",{method:"PUT",data:obj})
}

//删除班级
export function delgrade(obj){
    return request("/manger/grade/delete",{method:"DELETE",data:obj})
}

//获取教室
export function getroom(){
    return request("/manger/room")
}

//添加教室
export function addroom(room_text){
    return request("/manger/room",{method:"POST",data:{room_text}})
}

//删除教室
export function delroom(room_id){
    return request("/manger/room/delete",{method:"DELETE",data:{room_id}})
}

//获取课程
export function getsubject(){
    return request("/exam/subject")
}

export function getstudentIs(){
    return request("/manger/student")
}

export function getstudentNo(){
    return request('/manger/student/new')
}

//删除学生
export function delstudent(obj){
    return request("/manger/student/:id=>student_id",{method:"DELETE",data:{obj}})
}