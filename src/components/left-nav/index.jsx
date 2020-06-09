import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import logo from '../../assets/images/logo.jpg'
import './index.less'
const { SubMenu } = Menu
class leftNav extends Component {

    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={ logo } alt=""/>
                    <h1>商城后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['/home']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                  
                    <SubMenu
                        key="goods"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/goods">
                            <Link to="/goods">
                                <Icon type="shop" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="apartment" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                   
                </Menu>
            </div>
        )
    }
}

export default withRouter(leftNav)
