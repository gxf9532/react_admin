/*
    redux核心对象store  
*/
import { createStore, applyMiddleware } from 'redux'

// 加载异步中间件 
import thunk from 'redux-thunk'

import reducer from './reducer'

// 加载redux扩展工具调试  
import { composeWithDevTools } from 'redux-devtools-extension'
// 向外暴露产生的store对象
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))