/**
 * 认证组件
 */

import React, { Component } from 'react'

import {connect} from 'react-redux'
// import {addGun,addGunAnsyc,removeGun} from './index.redux'
import {login,getUserData} from './Auth.redux.js'
import {Redirect} from 'react-router-dom'


//通过connect state属性 和 方法 都挂载到props
//这里挂了state.auth  所以下面可以通过this.props.isAuth 取得用户是否登录
@connect(
    state => state.auth,
    {login,getUserData}
)

class Auth extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{}
        }
    }
    componentWillMount(){ //组件挂在之前钩子
        
        this.props.getUserData() //获取用户信息并改变状态
        
        console.log(this.props)
        /*axios.get('/data').then(res=>{
                if(res.status == 200){
                    this.setState({
                        data:res.data
                    })
                }   
                
                console.log('state.data ',JSON.stringify(this.state.data.user,null,2))  
        })*/
    }
    render(){
        console.log('auth页面的props' + JSON.stringify(this.props))

        return (
            <div>
                {/*<h2>我的名字是{this.state.data.user}</h2>*/}
                <h2>用户名：{this.props.user},年龄:{this.props.age}</h2>
                
                {this.props.isAuth ? <Redirect to='/Dashbord' /> : <h2>你没有权限，需要登录才能看</h2>}

                <button onClick={this.props.login}>登录</button>
            </div>
            
        )
    }
}
export default Auth
