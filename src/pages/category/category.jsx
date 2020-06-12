import React, { Component } from 'react'
import { Button, Card, Table, Modal, Form, message } from 'antd'
import CategoryForm from './categoryForm'
import { reqAddCategory, reqCategory, reqUpdateCategory } from '../../api'
import MyButton from '../../components/my-button'
export default class Category extends Component {

    state = {
        loading: false, // 是否在请求
        categorys: [], // 所有分类
        showStatus: 0, // 0 不显示  1 显示添加  2显示修改
        name: '', // 当前要显示的分类列表的名称
        _id: '', // 要修改的分类id,
        parentId: '0' // 父级分类id
    }

    componentWillMount() {
        // 设置表字段信息
        this.getColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    // 异步获取分类列表
    getCategorys = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state 
        const result = await reqCategory(parentId)
        if (result.status === 0) {
            const categorys = result.data
            this.setState({ loading: false, categorys })
        } else {
            this.setState({ loading: false})
        }
    }

    // 异步获取子分类列表 
    showSubCategorys = (category) => {
        console.log(category)
        message.success('这里要获取子分类列表')
    }
    // 显示修改分类输入框
    showUpdate = (category) => {
        this.category = category
        let { name,_id } = category
        
        // 修改状态
        this.setState({
            showStatus: 2,
            name,
            _id
        })
        
    }


    // 获取table-columns
    getColumns = () => {
        this.columns = [
            {
                title: '名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 200,
                render: category => (
                    <span>
                        <MyButton onClick={() => {this.showUpdate(category)}}>修改</MyButton>&nbsp; | &nbsp;
                        <MyButton onClick={() => {this.showSubCategorys(category)}}>查看子分类</MyButton>
                    </span>
                    )


            }
        ]
    }

    // 添加分类的回调  
    handleOk = () => {
        // 读取用户输入的数据 

        this.form.validateFields(async (err, values) => {
            if (!err) {
                const { name, parentId } = values
                const { showStatus } = this.state
                let result = '';
                if (showStatus == 1) {
                    // 发送添加分类的请求 
                    result = await reqAddCategory(name, parentId)
                
                }
                // 重置所有表单数据
                this.form.resetFields()
                // 重置父组件的showStatus
                this.setState({ showStatus: 0 })

                if (result.status === 0) {
                    this.getCategorys()
                    message.success('添加分类成功!')
                } else {
                    message.error('添加分类失败!')
                }   
            }
        })
    }

    // 修改分类的回调
    updateCate = () => {
        
        this.form.validateFields(async (err, values) => {
            if (!err) {
              
                const { _id,name } = values
                const { showStatus } = this.state
                let result = '';
                if (showStatus == 2) {
                    // 发送添加分类的请求 
                    result = await reqUpdateCategory(_id,name)
                    // console.log(result)
                }
                // 重置所有表单数据
                this.form.resetFields()
                // 重置父组件的showStatus
                this.setState({ showStatus: 0 })

                if (result.status === 0) {
                    this.getCategorys()
                    message.success('修改分类成功!')
                } else {
                    message.error('修改分类失败!')
                }   
            }
        })
    }

    // 用户取消添加/修改操作  
    handleCancel = () => {
        this.setState({ showStatus: 0 })
    }
    render() {
        let { loading, categorys, showStatus, name, _id, parentId } = this.state


        // 读取更新后的categorys

        const extraButton = (
            <Button type="primary" onClick={() => {
                this.categorys = {}
                this.setState({ showStatus: 1 })
            }}>添加分类</Button>
        )
        return (
            <Card extra={extraButton} >
                <Table
                    bordered={true}
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={categorys}
                    pagination={{ defaultPageSize: 4, showQuickJumper: true }}

                />
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                >

                    <CategoryForm getForm={categoryForm => this.form = categoryForm} categorys={categorys} parentId={parentId}/>
                </Modal>

                <Modal
                title="修改分类"
                visible={showStatus === 2}
                onOk={this.updateCate}
                onCancel={this.handleCancel}

            >

                <CategoryForm getForm={categoryForm => this.form = categoryForm} name={name} flag={{f: true}} _id={_id}/>
            </Modal>
            </Card>
        )
    }
}
