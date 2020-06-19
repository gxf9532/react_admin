import React, { Component } from 'react'
import { Card, Icon, Form, Input, Select, Button, message } from 'antd'
import { reqAllCategory, reqAddProduct, reqGoodsName } from '../../api'
import PicturesWall from './pictureswall'
import { Debounce } from '../../utils/debounceUtil'
import RichTextEditor from './richeditor'
const { Option } = Select;

class Addupdate extends Component {

    state = {
        categorys: []
    }

    constructor(props) {
        super(props)
        // 创建ref容器 
        this.picRef = React.createRef()

        // 创建富文本编辑器
        this.richRef = React.createRef()  
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
    
    // 自定商品名称验证器(函数防抖优化 减少请求次数)  
    checkGoodsName = Debounce(async (rule, value, callback) => {
        // 在数据库中查找是否有同名商品  
        const { status } = await reqGoodsName(value)
        if (value === '') {
            callback('') 
        } else if(status === 1) {
            callback('此商品已存在!')
        } else {
            callback()
        }

    }, 500)

    componentDidMount() {
        this.getcategorys()
    }

    //提交表单统一验证
    handleSubmit = (event) => {
        event.preventDefault()  
        
        // 进行表单的统一验证
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
              
               const { name, desc, price, categoryId} = values
                
               const imgs = this.picRef.current.getImgs()

            //    console.log(name, desc, price, categoryId)
            //    console.log(imgs)

                const detail = this.richRef.current.getDetail()
                // console.log(richText)

                // 向后台发送数据 

                // 封装发送的数据对象
                const product = { name, desc, price, categoryId, imgs, detail}
                
                const result = await reqAddProduct(product)

                if (result.status === 0) {
                    message.success('添加商品成功!')
                    this.props.history.replace('/product')
                }
                
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
                            },{
                                validator: this.checkGoodsName
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
               
                    <Item label="商品详情" wrapperCol={{ span: 20}}>
                        <RichTextEditor ref={this.richRef}/>
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
