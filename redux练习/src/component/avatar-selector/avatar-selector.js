import React, { Component } from 'react';
import { Grid,List } from 'antd-mobile';
//react 16已经将 props验证单独提取成一个库
import PropTypes from 'prop-types'
class AvatarSelector extends Component{
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        //1,2,3,4 是图片名字
        const avatarList = ['1','2','3','4'].map((v,i)=>({
            icon: require(`../img/${v}.png`),
            text: v
        }))   

        const gridHeadr = this.state.text ? 
                          (<div>
                              <span>已选择头像</span>
                              <img style={{width:40}} src={this.state.icon} />
                          </div>) 
                          :
                          '还没选择头像'
        return (
            <div>
                {gridHeadr}
                {/*点击头像的时候把 {icon:xxx,text:xxx直接塞入state}*/}
                <Grid data={avatarList} activeStyle={false} onClick={_el => {
                    this.setState(_el)
                    this.props.selectAvatar(_el.text)}}/>
            </div>
        )
    }
}


export default AvatarSelector
