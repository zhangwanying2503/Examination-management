import request from '../utils/request'

//登录接口
export function login(user_name,user_pwd) {
    return request('/user/login',{
        method: 'POST',
        data: {
            user_name,
            user_pwd
        }
    })
}
// 主页(/main) 内的接口请求:

//1.请求用户信息接口
export function getInfo(){
    return request('/user/userInfo');
}

//2.请求用户权限信息接口
export function getAuthority(user_id){
    return request('/user/new',{method:'GET',data:{user_id}});
}

export function showUser() {
    return request('/user/user')
}
export function Identity(){
    return request('/user/identity')
}
export function Apiport(){
    return request('/user/api_authority')
}
export function IdentityApi(){
    return request('/user/identity_api_authority_relation')
}
export function Viewport(){
    return request('/user/view_authority')
}
export function Identityview(){
    return request('/user/identity_view_authority_relation')
}