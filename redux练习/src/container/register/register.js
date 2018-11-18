import React, { Component } from 'react';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux.js'

@connect(
    state => state.user,
    {register}
)


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatPwd:'',
            type:'genius' //或者boss
        }
    }
    componentDidMount(){

    }

    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }

    handleRegister(){
        console.log(this.state) //this.state已经是注册的完整信息了
        //已经通过connect放入this.props下

        console.log(this.props) 
        this.props.register(this.state)

    }

    register(){

    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <h2>注册页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='errorMsg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户
                        </InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v=>this.handleChange('repeatPwd',v)}>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type === 'genius'}
                        onChange={()=>this.handleChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type === 'boss'} 
                        onChange={()=>this.handleChange('type','boss')}>
                            BOSS
                        </RadioItem>
                    </List>
                    <Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
    
                </WingBlank>
            </div>
        )
    }
}

export default Register
