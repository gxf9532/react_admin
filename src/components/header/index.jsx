import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Modal, Button } from 'antd'
import localUtils from '../../utils/localUtils'
import memUtils from '../../utils/memUtils'
import MyButton from '../my-button/index'
import { getDate } from '../../utils/timeUtils'
import './index.less'
class Header extends Component {
    /** 
     * 
     * 1、componentWillMount  将要装载，在render之前调用；

      componentDidMount，（装载完成），在render之后调用

2、componentWillMount  每一个组件render之前立即调用；

      componentDidMount  render之后并不会立即调用，而是所有的子组件都render完之后才可以调用

3、componentWillMount  可以在服务端被调用，也可以在浏览器端被调用；

      componentDidMount  只能在浏览器端被调用，在服务器端使用react的时候不会被调用
     * 
    */
    state = {
        currentTime: getDate(Date.now())
    }

    componentDidMount() {
        // 开启定时器
        this.timer = setInterval(() => {
            this.setState({
                currentTime: getDate(Date.now())
            })
        }, 1000)
    }

    componentWillMount() {
        // 清除定时器
        clearInterval(this.timer)
    }

    

    handleCheckout = () => {
        // const that = this
        const { confirm } = Modal
        confirm({
            title: '确认退出吗?',
            onOk: () => {
                // 删除用户登陆信息(1)本地local (2)内存
                localUtils.removeLoginData()
                memUtils.isLogin = {}

                this.props.history.replace('/')
            },
            onCancel() { },
        });
    }
    render() {
        // 获取当前时间
        const { currentTime }  = this.state
            
        return (
            <div className="header">
                <div className="header-top">
                    欢迎, <span style={{ color: '#F00' }}>{memUtils.isLogin.username}</span> &nbsp; &nbsp;
                    <MyButton onClick={this.handleCheckout}>退出</MyButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>{ currentTime }</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
