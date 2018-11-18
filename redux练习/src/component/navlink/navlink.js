import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter //下边就可以用this.props.location.pathname 取得当前路径了

@connect(
    state => state.chat, //下边就可以用this.props.unread取得未读信息了
)

class NavLinkBar extends React.Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    render(){
        console.log(this.props.data)

        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location

        return (            
            <div>
                <TabBar>
                    {navList.map((v,i)=>(

                        <TabBar.Item
                                     badge={v.text == '消息' ? this.props.unread : ''}
                                     title={v.text} 
                                     key={i} 
                                     icon={{uri:require(`./img/${v.icon}.png`)}}
                                     onPress = {
                                        ()=>{
                                            this.props.history.push(v.path)
                                        }
                                     }
                        >
                            
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar
