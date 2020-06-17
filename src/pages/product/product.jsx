import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './product.less'
import ProductHome from './home'
import ProductAddUpdate from './addupdate'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" exact component={ProductHome} />
                <Route path="/product/addupdate" component={ProductAddUpdate} />
                <Redirect to="/product" />
            </Switch>
        )
    }
}
