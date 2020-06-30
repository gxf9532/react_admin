/*
    redux核心对象store  
*/
import { createStore } from 'redux'
import reducer from './reducer'

// 向外暴露产生的store对象
export default createStore(reducer)