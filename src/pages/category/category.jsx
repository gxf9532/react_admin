import React, { Component } from 'react'
import { Button, Card, Table, Modal, Form, message} from 'antd'
import CategoryForm from './categoryForm'
import { reqAddCategory } from '../../api'
export default class Category extends Component {

    state = {
        loading: false, // 是否在请求
        categorys: [], // 所有分类
        showStatus: 0 // 0 不显示  1 显示添加  2显示修改
    }

    componentWillMount() {
        this.getColumns()
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
                width: 200

            }
        ]
    }

    // 确定按钮的回调  
    handleOk = () => {
        // 读取用户输入的数据 
    
        this.form.validateFields(async (err, values) => {
            if (!err) {
                const { categoryName } = values
                const { showStatus } = this.state
                let result = '';
                if (showStatus == 1) {
                    // 发送添加分类的请求 
                    result = await reqAddCategory(categoryName)
                    console.log(result)
                }
                // 重置所有表单数据
                this.form.resetFields()
                // 重置父组件的showStatus
                this.setState({ showStatus: 0 })
            }
        })
    }

    // 用户取消添加/修改操作  
    handleCancel = () => {
        this.setState({ showStatus: 0})
    }
    render() {
        let { loading, categorys, showStatus } = this.state
        
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
                />
                <Modal
                    title="添加分类"
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                
                    <CategoryForm getForm={categoryForm => this.form = categoryForm}/>
                </Modal>
            </Card>
        )
    }
}
