import React, { Component } from 'react'
import io from 'socket.io-client'
import {List,InputItem,Icon,Grid } from 'antd-mobile'
import { NavBar } from 'antd-mobile';
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux.js'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim';
   //因为后台在9093 前台在3000 跨域 需要手动指定下
//const socket = io('ws://localhost:9093')

@connect(
    state => state,
    {getMsgList,sendMsg,recvMsg}
)



class Chat extends Component{
    constructor(){
        super()
        this.state = {
            text : '',
            msg:[],
            showEmoji:false
        }
    }
      shouldComponentUpdate(nextProps, nextState) {
      
       console.log('nextProps',nextProps)
      }
    componentDidMount(){  
         
            this.props.getMsgList()
             //页面加载的时候读取 消息列表 
            this.props.recvMsg() 
      
          
        
        //server.js拿到了 sendmsg给的信息，再把给这个信息给了全局，这里做监听
        // socket.on('recvmsg',(data)=>{
        //     console.log(data)
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })

    }
    handleSubmit(){
        //把信息传递给了 server.js
        //socket.emit('sendmsg',{text:this.state.text})
        //清空输入框
        //this.setState({text:''})
        //取得聊天发起人
        console.log(this.props)
        const from = this.props.user._id 
        //取得和谁聊天
        const to = this.props.match.params.user
        //当前聊天的内容
        const msg = this.state.text;


        this.props.sendMsg({from,to,msg})
        this.setState({
            text:''
        })

    }
    render(){  
        const emoji ='😃 😁 😂 🤣 😃 😄 😅'.split(' ').map(v=>({
            text:v
        }))



        console.log('emoji',emoji)

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users;
        const chatid = getChatId(userid,this.props.user._id)
       
        console.log('chatid',chatid)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>
            v.chatid == chatid
        )

        console.log('chatmsgs',chatmsgs)

        const chatList =  chatmsgs.map((v,i)=>{
                            const avatar = require(`../img/${users[v.from].avatar}.png`)
                            return v.from == userid ? 
                            (<List key={i}>
                                <Item thumb={avatar}> {v.content} </Item>
                            </List>)
                            :
                            (<List key={i}>
                                <Item extra={<img src={avatar} />} 
                                className='chat-me'> {v.content} </Item>
                            </List>)
            
                          })
        return (

            <div id="chat-page">
                <NavBar mode='dark' 
                        icon={<Icon type='left'>返回</Icon>}
                        onLeftClick={()=>{this.props.history.goBack()}}
                >
                    {Object.keys(users).length?users[userid].name:userid}
                </NavBar>
                <QueueAnim>
                    {chatList}
                </QueueAnim>
                <div className='stick-footer'>
                    <List>
                        <InputItem placeholder='请输入' value={this.state.text} onChange={(v)=>{
                            this.setState({
                                text:v
                            })
                        }} extra={
                            <div>
                                <span style={{marginRight:15}} onClick={()=>{
                                    this.setState({
                                        showEmoji:!this.state.showEmoji
                                    })
                                }}>😃</span>
                                <span onClick={this.handleSubmit.bind(this)}>发送</span>
                            </div>
                        }>信息</InputItem>
                    </List>
                    { this.state.showEmoji ? 
                        <Grid data={emoji} 
                              columnNum={8} 
                              onClick={el=>{
                                console.log(el)
                                this.setState({
                                    text:this.state.text+el.text
                                })
                              }}></Grid> 
                        : null}
                    
                </div>
                <h2>chat with: {this.props.match.params.user}</h2>
            </div>
            
        )
    }
}

export default Chat
