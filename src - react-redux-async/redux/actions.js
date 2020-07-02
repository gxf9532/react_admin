/*
    创建若干个action行为的工厂函数
*/
import { INCREMENT, DECREMENT } from './action-types'
// 增加的action行为
export const increment = number => ({type: INCREMENT, data: number})
// 减少的action行为
export const decrement = number => ({type: DECREMENT, data: number})

// 异步action
export const incrementAsync = number => {
    return dispatch => {
        setTimeout(() => {
            // 当异步完成之后, 再分发同步的action 
            dispatch(increment(number))
        }, 1000)
    }
} 
