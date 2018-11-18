
import React, { Component } from 'react';
import { NavBar,InputItem, TextareaItem,Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'
@connect(
    state => state.user,
    {update}
)

class GeniusInfo extends Component{
    constructor(){
        super()
        this.state = {
            title:'',
            avatar:''
        }
    }
    onChange(key,value){
        this.setState({
            [key]:value
        })
    }
    selectAvatar(imgName){
        this.setState({
            avatar:imgName
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo

        console.log(path,redirect)
        return (
            //防止当前是GeniusInfo了 还跳转到GeniusInfo报错
            
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector selectAvatar = {this.selectAvatar.bind(this)}></AvatarSelector>
                <InputItem onChange={v=>this.onChange('title',v)}>求职岗位</InputItem>
                 <TextareaItem title="个人简介" rows={3} autoHeight onChange={v=>this.onChange('desc',v)}/>
                 <Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}


export default GeniusInfo
