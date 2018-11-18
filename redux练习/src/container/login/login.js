import React, { Component } from 'react';
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from '../../redux/user.redux.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {login}
)

/*高阶组件概念
1.组件就是一个函数
2.函数可以当一个参数传入到另一个函数里

@WrapHello //相当于 Hello = WrapHello(Hello) 重新赋值HELLO组件
class Hello extends Component{
    render(){
        return <h2>hello world</h2>
    }
}

function WrapHello(Comp){
    return class WrapComp extends React.Component{
        render(){
            return (
                <div>
                    <h2>这是高阶组件特有的元素</h2>
                    <Comp {...this.props}></Comp>
                </div>
            )
        }
    }
}
Hello = WrapHello(Hello)*/


class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:''
        }
    }
    register(){
        console.log(this.props)
        this.props.history.push('/register')
    }

     handleChange(key,value){
        this.setState({
            [key]:value
        })
    }

    handleLogin(){
        this.props.login(this.state)
    }

    render(){
        return (
            <div>
               {/*<Hello></Hello>*/}
                {(this.props.redirectTo && this.props.redirectTo != '/login') ?<Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <h2>登录页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='errorMsg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace />
                    </List>
                    <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register.bind(this)} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
