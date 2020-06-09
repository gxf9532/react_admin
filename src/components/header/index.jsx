import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Modal, Button } from 'antd'
import localUtils from '../../utils/localUtils'
import memUtils from '../../utils/memUtils'
import './index.less'
class Header extends Component {

    
 
    handleCheckout = () => {
        // const that = this
        const { confirm } = Modal
        confirm({
            title: '确认退出吗?',
            onOk:() => {
                // 删除用户登陆信息(1)本地local (2)内存
                localUtils.removeLoginData()
                memUtils.isLogin = {}
                
                this.props.history.replace('/')
            },
            onCancel() {},
          });
    }
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    欢迎, <span style={{ color: '#F00'}}>{ memUtils.isLogin.username }</span> &nbsp; &nbsp; 
                    <Button onClick={this.handleCheckout}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
