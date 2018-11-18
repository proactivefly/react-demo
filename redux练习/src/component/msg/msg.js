import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile';
@connect(
    state => state
)

class Msg extends React.Component{
   getLast(arr){ //取最后一条聊天信息
    return arr[arr.length-1]
   }
   render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id  //当前登录的用户
    const userinfo = this.props.chat.users
 
    console.log('props',this.props.chat.chatmsg)
    //按照聊天分组，根据chatid
    const msgGroup = {
        // '5a1793774998d':'5a1793774998d',
        // '5a1793e7fb6d780b6c2e5630':'5a1793e7fb6d780b6c2e5630'
    }

    this.props.chat.chatmsg.forEach(v=>{
       // debugger
        msgGroup[v.chatid] = msgGroup[v.chatid] || [];
        msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup)
    console.log('chatList',chatList)

     return (
        <List>
            {
                chatList.map((v,i)=>{
                      console.log('v',v)
                      const lastItem = this.getLast(v)
                      const targetId = (v[0].from== userid)?v.to :v[0].from
                      const name = userinfo[targetId] ? userinfo[targetId].name : ''
                      const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ''
                    return (
                        <Item key={i} thumb={require(`../img/${userinfo[targetId].avatar}.png`)} onClick={()=>{
                            this.props.history.push(`/chat/${targetId}`)
                        }}>
                           {lastItem.content}
                           <Brief>{userinfo[targetId].name}</Brief>
                        </Item>
                    )

                }
                     
                
                )
            }
        </List>
     )
   }
}

export default Msg
