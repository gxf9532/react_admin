import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import RoleForm from './roleForm' 
import AuthForm from './authForm'
import { addRoles, reqRoles } from '../../api'
export default class Role extends Component {

    state = {
        loading: false,
        isShow: false, // 默认不显示添加界面
        isShowAuth: false, // 设置权限界面(默认不显示) 
        role: {}, // 选中的role
        roles: [
            // {
            //     "menus": [
            //         "/home",
            //         "/category",
            //         "/role"
            //     ],
            //     "_id": "dj232093829043290423kjds",
            //     "name": "角色1",
            //     "create_time": "3829382038012342",
            //     "auth_time": "4329443948309438042",
            //     "auth_name": "admin"
            // },
            // {
            //     "menus": [
            //         "/home",
            //         "/category"
            //     ],
            //     "_id": "dj2320938290432904289kjds",
            //     "name": "角色2",
            //     "create_time": "38293820380132342",
            //     "auth_time": "4329443948309438483",
            //     "auth_name": "user1"
            // }
        ]

    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getRoles()
    }


    // 获取所有角色列表 
    getRoles = async () => {
        const result = await reqRoles()
        
        if (result.status === 0) {
            const roles = result.data 
            this.setState({ roles })
        }
    }

    // 初始化列 
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    // 用户添加操作
    addRole = () => {
        // 全局验证
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // 获取用户输入的角色名称
                const { name } = values   
                // 重置form
                this.form.resetFields()

                // 发送ajax请求后台进行添加操作
                const result = await addRoles(name)

                if (result.status === 0) {
                    message.success('添加角色成功!')
                    // 隐藏输入框
                    this.setState({ isShow: false })

                    // 修改rules状态 
                    // const { roles } = this.state  
                    // const roles = [...this.state.roles]
                    // roles.push(result.data)
                    // this.setState({ roles })

                    // 推荐写法 
                    // 更新roles的状态 要基于原来的状态数据进行更新 
                    this.setState(state => ({
                        roles: [...state.roles, result.data]
                    }))

                } else {
                    message.error(result.mes)
                }
                
            }
        })
    }

    handleCancel = () => {
        this.setState({ isShow: false })
    }

    // 修改用户权限操作  
    updateRole = () => {
        console.log('这里是用户权限操作')
    }

    setAuth = () => {
        const { role } = this.state 
     
        let arr = Object.keys(role);
        
        if(arr.length == 0) {
            message.error('请选中角色再进行权限操作!')
        } else {
            this.setState({ isShowAuth: true })
        }
        
    }

    onRow = role => {
        return {
            onClick: event => {
                this.setState({ role })
            }
        }
    }
    handleAuthCancel = () => {
        this.setState({ isShowAuth: false })
    }
    render() {
        const { loading, roles, role, isShow, isShowAuth } = this.state
        const title = (
            <span>
                <Button type="primary" onClick={() => { this.setState({ isShow: true })}}>创建角色</Button>&nbsp; | &nbsp;
                <Button type="primary" onClick={() => { this.setAuth() }}>设置权限</Button>
            </span>
        )
        return (
            <div>
                <Card title={title}>
                    <Table
                        bordered={true}
                        rowKey="_id"
                        loading={loading}
                        columns={this.columns}
                        dataSource={roles}
                        pagination={{ defaultPageSize: 3, showQuickJumper: true }}
                        rowSelection={{ type: 'radio', selectedRowKeys: [role._id]}}
                        onRow={this.onRow}
                        />
                    <Modal
                        title="添加角色"
                        visible={isShow}
                        onOk={this.addRole}
                        onCancel={this.handleCancel}
                    >
                    <RoleForm getForm={roleForm => this.form = roleForm}/>
                    </Modal>

                    <Modal
                        title="设置权限"
                        visible={isShowAuth}
                        onOk={this.updateRole}
                        onCancel={this.handleAuthCancel}
                    >
                    <AuthForm role={role}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
