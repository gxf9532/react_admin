import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import localUtils from '../../utils/localUtils'
import memUtils from '../../utils/memUtils'
import { Layout } from 'antd'
import './admin.less'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Product from '../product/product'
import Category from '../category/category'
import Role from '../role/role'
const { Footer, Sider, Content } = Layout
export default class Admin extends Component {
    render() {
        // const userData = JSON.parse(localStorage.getItem('user_key')) ? 
        // JSON.parse(localStorage.getItem('user_key')) : {}
        // if (!userData._id) {
        //     return <Redirect to='/login'/>
        // }
        // const userData = localUtils.getLoginData()
        const userData = memUtils.isLogin
        if (!userData._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout>
                <Sider><LeftNav/></Sider>
                <Layout>
                    <Header/>
                    <Content>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/role" component={Role}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#000', borderTop: '1px solid #37DFBC'}}>本系统推荐使用最新版谷歌浏览器以获得最佳浏览效果</Footer>
                </Layout>
            </Layout>
        )
    }
}
