import request from '../utils/request'

// 获取试题分类接口
export function getQuestionsType() {
    return request('/exam/getQuestionsType',{
        method: 'GET'
    })
}

