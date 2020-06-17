import React, { Component } from 'react'
import { Card, Icon, Form, Input, Select, Button, message } from 'antd'
import { reqAllCategory } from '../../api'
import PicturesWall from './pictureswall'
const { Option } = Select;

class Addupdate extends Component {

    state = {
        categorys: []
    }

    constructor(props) {
        super(props)
        // 创建ref容器 
        this.picRef = React.createRef()
    }
    // 处理用户提交
    getcategorys = async () => {
        const result = await reqAllCategory()
        if (result.status === 0) {
            this.setState({
                categorys: result.data
            })
        }
    }

    // 自定义商品价格验证器
    validatePrice = (rule, value, callback) => {
        if (value === ''){
            callback('')
        } else if (value * 1 <= 0) {
            callback('价格必须大于0')
        } else {
            callback()
        }
    }

    componentDidMount() {
        this.getcategorys()
    }

    //提交表单统一验证
    handleSubmit = (event) => {
        event.preventDefault()  
        
        // 进行表单的统一验证
        this.props.form.validateFields((err, values) => {
            if (!err) {
              
               const { name, desc, price, categoryId} = values
                
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { categorys } = this.state
        const title = (
            <span>
                <span>添加商品</span>
            </span>
        )
        const Item = Form.Item
        const formConfig = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        return (
            <Card title={title}>
                <Form {...formConfig} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialvalue: '',
                            rules: [{
                                required: true,
                                message: "必须输入商品名称!"
                            }]
                        })(<Input placeholder="商品名称" />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialvalue: '',
                            rules: [{
                                required: true,
                                message: "必须输入商品描述!"
                            }]
                        })(<Input placeholder="商品描述" />)}
                    </Item>

                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialvalue: '',
                            rules: [{
                                required: true,
                                message: "必须输入商品价格!"
                            },
                            {
                                validator: this.validatePrice
                            }
                        ]
                        })(<Input type="number" style={{ width: 150 }} placeholder="商品价格" addonAfter="元" />)}
                    </Item>

                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialvalue: "",
                            rules: [{
                                required: true,
                                message: "必须指定商品分类!"
                            }]
                        })(
                            <Select>
                                <Option value="" key="">--请选择--</Option>
                                {
                                    categorys.map(cate => <Option value={cate._id} key={cate._id}>{cate.name}</Option>)
                                }

                            </Select>
                        )}
                    </Item>

                    <Item label="商品图片">
                        <PicturesWall ref={this.picRef}/>
                    </Item>

                    <Item label="">
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(Addupdate)
