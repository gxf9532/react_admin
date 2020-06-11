import React, { Component } from 'react'
import logo from '../../assets/images/logo.jpg'
import './login.less'
import { Form, Icon, Input, Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import localUtils from '../../utils/localUtils'
import memUtils from '../../utils/memUtils'
import { loginRequest } from '../../api'
const Item = Form.Item

class Login extends Component {

    handleSubmit = e => {
       
        e.preventDefault()
        const form = this.props.form
        // const values = form.getFieldsValue()
        //{username: "admin", password: "123"}

        /** 
             * async/await的理解和使用  
             * 简化promise对象的使用  不再使用then()
             * 用同步的方式实现异步流程 
             * 
             * 使用 
             * 哪里使用await? 在返回primise对象的表达式左侧  
             * 左侧得到的不再是promise 而是promise异步成功的值 
             * 
             * 哪里使用async? await所在的最近函数定义的左侧 
             * 
            */
            // 这里的await拿到成功的值 
        // 进行表单的统一验证
        form.validateFields(async (err, { username, password }) => {
            if (!err) {
                let resData = await loginRequest(username, password)
                // console.log(resData)
                if (resData.status === 0) {
                    // 登录成功 
                    // localStorage.setItem('user_key', JSON.stringify(resData.result))
                    // 向本地写入登陆信息
                    localUtils.saveLoginData(resData.result)
                    // 向内存写入登陆信息
                    memUtils.isLogin = resData.result
                    message.success('登录成功!')
                    
                    // 跳转到后台首页
                    this.props.history.push('/')
                } else {
                    message.error(resData.mes)
                }
            }
        })

    }

    // 验证密码
    pwdValidateHandler = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('必须输入密码!')
        } else if(value.length < 4){
            callback('密码长度必须大于4位')
        } else if (value.length > 16) {
            callback('密码长度不能大于16位!')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是字母、数字、下划线组成!')
        } else {
            // 验证通过
            callback()
        }
    }
    render() {
        // const userData = JSON.parse(localStorage.getItem('user_key'))
        // if (userData._id) {
        //     return <Redirect to='/'/>
        // }
        // const userData = localUtils.getLoginData()

            const userData = memUtils.isLogin
        if (userData._id) {
            return <Redirect to='/'/>
        }
        const { getFieldDecorator } = this.props.form
        return (
            <div className="login"> 
                <div className="login-header">
                    <img src={logo} alt=""/>
                    <h1>点赞商城后台管理系统</h1>
                </div>

                <div className="login-content">
                    <h3>后台登录</h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
            {
                getFieldDecorator('username', {
                    initialValue: 'admin',
                    rules: [
                        { 
                            required: true,
                            whitespace: true,
                            message: '必须输入用户名!'
                        },
                        {
                            min: 4,
                            message: '用户名不能小于4位!'
                        },
                        {
                            max: 16,
                            message: '用户名不能大于16位'
                        },
                        {
                            pattern: /^[a-zA-Z][a-zA-Z0-9_]+$/,
                            message: '用户名必须为字母数字或下划线,不能以数字开头!'
                        }
                    ]
                })(
                <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />)
            }
            
 
        </Item>
        <Item>
            {
                getFieldDecorator('password', {
                    rules: [
                        { validator: this.pwdValidateHandler}
                    ]
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    autoComplete="off"
                  />
                )
            }
           
   
        </Item>
        <Item>
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
            
        </Item>
      </Form>
                </div>
            </div>
        )
    }
}

const WrappedLogin = Form.create()(Login)

export default WrappedLogin
/*
    Form.create() 包装会产生一个新组件
    新组件->给原来的组件中传递一个对象 form 
    
    讲两个概念 
    1.高阶函数 
    接收的参数是函数 或者返回值是函数
    数组的遍历  定时器  Promise
    2.高阶组件 
    本质上是一个函数 函数接收一个组件作为参数 返回一个新的组件
    
*/ 






