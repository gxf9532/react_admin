/**
 * 同步action: 对象: {type: 'xxx', data: 数据}
 * 异步action: 函数: dispatch => {}  
 * 
 */
import { HEAD_TITLE } from './action-types'
export const setTitle = title => ({ type: HEAD_TITLE, data: title })