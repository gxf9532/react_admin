/*
    创建若干个action行为的工厂函数
*/
import { INCREMENT, DECREMENT } from './action-types'
// 增加的action行为
export const increment = number => ({type: INCREMENT, data: number})
// 减少的action行为
export const decrement = number => ({type: DECREMENT, data: number})