/*
    reducer模块 
    用来根据当前的state状态和指定的action来返回一个新的state  
*/
import { INCREMENT, DECREMENT } from './action-types'

export default function count (state = 0, action) {
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