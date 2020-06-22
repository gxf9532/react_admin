import React, { Component } from 'react'
import { Form, Input, message, Tree } from 'antd'
import { menuList } from '../../config/menu'
const Item = Form.Item
const { TreeNode } = Tree
export default class AuthForm extends Component {

    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
    }
    // 自定义方法根据menu生成对应的树形结构  
    getTreeNodes = menuList => {
       
        return menuList.map(item => {
            // 判断是否含有子菜单 
            if (!item.childMenu) {
                return (
                    <TreeNode title={item.title} key={item.key} />
                )
            } else {
                return (
                    <TreeNode title={item.title} key={item.key} >
                        { this.getTreeNodes(item.childMenu) }
                    </TreeNode>
                )
            }
        })
    }
    render() {
        const formConfig = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        }
        const { role } = this.props
        return (
            <div>
                <Item label={'角色名称'} {...formConfig}>
                    <Input value={role.name} disabled />
                </Item>


                <Tree
                    checkable
                    // checkedKeys={}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="系统权限" key="0-0">
                        { this.treeNodes }
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
