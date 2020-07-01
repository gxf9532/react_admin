
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
import { increment, decrement } from '../redux/actions'


// 将redux管理的state状态映射成UI组件的一般属性
function mapStateToProps(state) {
    return {
        count: state
    }
}

// 用来将包含dispatch代码的函数映射成UI组件的函数属性
function mapDispatchToProps(dispatch) {
    return {
        increment: (number) => dispatch(increment(number)),
        decrement: (number) => dispatch(decrement(number))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)





