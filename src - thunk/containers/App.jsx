
/**
 *  容器组件 
 *  通过connect来包装UI组件
 *  connect() 是一个高阶函数 返回一个高阶组件(传进去一个UI组件  返回一个容器组件)
 *  容器组件可以向UI组件传递需要的特性
 *  
*/

import { connect } from 'react-redux'

// 加载UI组件
import Counter from '../components/Counter'

// 加载action行为
import { increment, decrement, incrementAsync } from '../redux/actions'


export default connect(
    state => ({ count: state}),
    {
        increment, // 这里实际上传递的是 (number) => dispatch(increment(number))
        decrement,
        incrementAsync
    }
)(Counter)





