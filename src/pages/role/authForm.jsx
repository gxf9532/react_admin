import React, { Component } from 'react'
import { Form, Input, message, Tree } from 'antd'
import { menuList } from '../../config/menu'
import PropTypes from 'prop-types'
const Item = Form.Item
const { TreeNode } = Tree
export default class AuthForm extends Component {

    constructor(props) {
        super(props)
        // 拿到传入的角色的初始状态 
        const { menus } = this.props.role
        
        this.state = {
            checkedKeys: menus
        }
      
    }

    static propTypes = {
        role: PropTypes.object
    }

    // 在render之前调用 而且在组件接收到新的属性props的时候就会调用
    componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({ checkedKeys: menus })
    }

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

    // 选中某个node节点时的回调
    onCheck = checkedKeys => {
        this.setState({ checkedKeys })
    }

    /// 向外暴露给父组件一个回调去搜集表单提交数据
    getMenus = () => this.state.checkedKeys

    render() {
        const formConfig = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        }
        const { role } = this.props
        const { checkedKeys } = this.state 
        return (
            <div>
                <Item label={'角色名称'} {...formConfig}>
                    <Input value={role.name} disabled />
                </Item>


                <Tree
                    checkable
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    defaultExpandAll={true}
                >   
                    <TreeNode title="系统权限" key="0-0">
                        { this.treeNodes }
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
