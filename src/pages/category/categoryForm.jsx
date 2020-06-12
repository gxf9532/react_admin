import React, { Component } from 'react'
import { Form, Input, message, Select } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option
class CategoryForm extends Component {

    static propTypes = {
        getForm: PropTypes.func.isRequired,
        name: PropTypes.string

    }

    componentWillMount() {
        // 将子组件中的form对象传递给父组件
        this.props.getForm(this.props.form)
    }
    render() {

        const { getFieldDecorator } = this.props.form

        const { flag, name, _id, categorys, parentId } = this.props
        // console.log(categorys)
        if (flag) {
            // 修改分类操作
            return (
                <Form>

                    <Item>
                        {
                            getFieldDecorator('name', {
                                initialValue: name,
                                rules: [
                                    { required: true, message: '分类名称必须输入!' }
                                ]
                            })(
                                <Input type="text" placeholder="请输入分类名称"></Input>
                            )
                        }

                    </Item>

                    <Item>
                        {
                            getFieldDecorator('_id', {
                                initialValue: _id,
                                rules: []

                            })(
                                <Input type="hidden" ></Input>
                            )
                        }

                    </Item>
                </Form>
            )
        }
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId,
                            rules: []

                        })(
                            <Select>
                                <Option value="0">顶级分类</Option>
                                {
                                    categorys.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                                }
                               
                            </Select>
                        )

                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '分类名称必须输入!' }
                            ]
                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(CategoryForm)
