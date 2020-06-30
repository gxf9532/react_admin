import React, { Component } from 'react'
import { Button } from 'antd'
import { increment, decrement } from './redux/actions'
export default class App extends Component {


    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    increment = () => {
        // 获取seelct的值  
        const num = this.ref.current.value * 1
        // // 修改状态
        // this.setState(state => ({
        //     count: state.count + num
        // }))
        this.props.store.dispatch(increment(num))
    }

    decrement = () => {
        // 获取seelct的值  
        const num = this.ref.current.value * 1
        // // 修改状态
        // this.setState(state => ({
        //     count: state.count - num
        // }))
        this.props.store.dispatch(decrement(num))

    }

    async = () => {

        clearTimeout(this.timer)
        const num = this.ref.current.value * 1
        this.timer = setTimeout(() => {
            // this.setState(state => ({
            //     count: state.count + num
            // }))
        this.props.store.dispatch(increment(num))

        }, 1000)
    }

    reset = () => {
        this.setState({ count: 0 })
    }

    render() {
        // 从redux的核心对象store中的getState()来获取状态
        const count  = this.props.store.getState()
    
        return (
            <div>
                <div>计数: {count}</div>
                <select ref={this.ref}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <Button onClick={this.increment}>+</Button>
                <Button onClick={this.decrement}>-</Button>
                <Button onClick={this.async}>异步</Button>
                <Button onClick={this.reset}>reset</Button>

            </div>
        )
    }
}
