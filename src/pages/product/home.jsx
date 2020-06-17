import React, { Component } from 'react'
import { Card, Table, Button, Icon, Input, Select } from 'antd'

const Option = Select.Option
export default class Home extends Component {

    state = {
        loading: false, // 是否正在加载 
        total: 0, //商品总数量
        products: [
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe131231231235op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe131231231265op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe131231231275op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe131231238235op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe131231230235op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe131231221235op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe13123123145235op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
            {
                "status": 0,
                "imgs": [
                    "qweqw3123dWSDSDAkl23313.jpg"
                ],
                "_id": "adwdqpwoe1312312322235op",
                "name": "联想笔记本",
                "desc": "这是一台非常好用的笔记本",
                "price": 3000,
                "detail": "这里是商品详情",
                "categoryId": "5ee2e42f1bfc8f0d98ea4355",
                "__v": 0
            },
        ]
    }

    componentWillMount() {
        this.initColumns()
    }

    // 初始化商品操作
    optHandle = product => {
        return (
            <span>
                <Button>详情</Button>&nbsp; | &nbsp;
                <Button>修改</Button>
            </span>
        )

    }

    // 初始化商品状态显示
    productStatus = status => {
        let btnValue = "下架"
        let statusText = '在售'

        if (status === 2) {
            btnValue = '上架'
            statusText = '停售'
        }
        return (
            <span>
                <Button>{btnValue}</Button>
                <span>{statusText}</span>
            </span>
        )
    }
    // 初始化字段
    initColumns = () => {
        this.columns = [
            {
                title: "商品名称",
                dataIndex: "name"
            },
            {
                title: "商品描述",
                dataIndex: "desc"
            },
            {
                title: "商品价格",
                dataIndex: "price",
                render: price => '￥' + price
            },
            {
                title: "商品状态",
                width: 100,
                dataIndex: "status",
                render: this.productStatus
            },
            {
                title: "操作",
                width: 200,
                render: this.optHandle
            }
        ]
    }

    render() {
        const { loading, products, total } = this.state

        const extraButton = (
            <Button onClick={() => {
                this.props.history.push('/product/addupdate')
            }}>
                <Icon type="plus" />
                添加商品
            </Button>
        )

        const title = (
            <span>
                <Select value="1">
                    <Option value="1">按名称</Option>
                    <Option value="2">按描述</Option>
                </Select>
                &nbsp; &nbsp; 
                <Input style={{ width: 160 }} placeholder="请输入关键字" /> &nbsp;&nbsp;
                <Button type="primary">搜索</Button>
            </span>
        )
        return (
            <div>
                <Card extra={extraButton} title={title}>
                    <Table
                        bordered={true}
                        rowKey="_id"
                        loading={loading}
                        columns={this.columns}
                        dataSource={products}
                        pagination={{ defaultPageSize: 4, showQuickJumper: true }}

                    />

                </Card>
            </div>
        )
    }
}
