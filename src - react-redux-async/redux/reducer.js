/*
    reducer模块 
    用来根据当前的state状态和指定的action来返回一个新的state  
*/
// 引入合并reducer模块
import { combineReducers } from 'redux'
import { INCREMENT, DECREMENT } from './action-types'

function count (state = 0, action) {
    console.log('这里执行了count')
    switch (action.type) {
        case INCREMENT:
            return state + action.data

        case DECREMENT:
            return state - action.data

        default:
            return state
    }
}

// 管理用户的状态数据 
const userData = {name: 'admin', age: 20, sex: 'nan'}

function user (state = userData, action) {

    switch(action.type) {
        default: 
        return state
    }

}

// combineReducers这个函数接收包含所有reducer函数的对象 返回一个新的reducer函数
export default combineReducers({
    count,
    user
})