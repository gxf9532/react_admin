import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import localUtils from '../../utils/localUtils'
import memUtils from '../../utils/memUtils'
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
                return <Redirect to='/login'/>
            }
        return (
            <div>
                <h2>后台首页</h2>
            </div>
        )
    }
}
