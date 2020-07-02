/** 
 *   根据之前的State和传递的action来返回新的state
 * 
*/

import { combineReducers } from 'redux'
import { HEAD_TITLE } from './action-types'
// 管理头部标题  
const initTitle = '首页'
function headTitle(state = initTitle, action) {
    switch (action.type) {
        case HEAD_TITLE: 
        return action.data

        default:
            return state
    }
}

// 管理登录用户
function user(state = 'admin', action) {
    switch (action.type) {
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})

