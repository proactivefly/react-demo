import React from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink/navlink'
import {Switch,Route,Redirect} from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'

import {getMsgList,recvMsg} from '../../redux/chat.redux.js'
//进场动画
import QueueAnim from 'rc-queue-anim';




@connect(
    state => state,
    {getMsgList,recvMsg}
)



class Dashbord extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasFalse:false
        }
    }
    //页面出错的时候触发
    componentDidCatch(error, info){
        console.log(error)
        this.setState({
            hasFalse:true
        })
    }

    componentDidMount(){  
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()  
        //页面加载的时候读取 消息列表 
        this.props.recvMsg()  
        }

        
        //server.js拿到了 sendmsg给的信息，再把给这个信息给了全局，这里做监听
        // socket.on('recvmsg',(data)=>{
        //     console.log(data)
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })

    }
    // shouldComponentUpdate(nextProps, nextState) {
    //    console.log('nextProps',nextProps)
    //   }

   
    render(){
        const pathName = this.props.location.pathname
        const user = this.props.user;
        const navList = [
            {
                path:'/boss',//boss身份进来要看到牛人的列表
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                //BOSS的导航栏是否显示
                hide:user.type == 'genius'
            },
            {
                path:'/boss',//boss身份进来要看到牛人的列表
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                //BOSS的导航栏是否显示
                hide:user.type == 'genius'
            },

            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type == 'boss'
            },

             {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        //ant-motion进出场动画生效 ，只能渲染一个router,根据path来决定组件是什么
        const page = navList.find(v=>v.path == pathName)
        console.log('page',page)
        return page ? (              
            <div>
                {/*es6 find 代表查找数组的每一项 只要匹配就返回这一项*/}
                <NavBar className='fixed-header' mode="dark">{navList.find(v=>v.path==pathName).title}</NavBar>
                <div style={{marginTop:45}}>
                {/*用switch只匹配找到的第一个 在navlink里push路由这里就切换了*/}
                  {/*<Switch>
                        {
                            navList.map((v,i)=>(
                                <Route key={i} path={v.path} component={v.component}></Route>
                            ))
                        } 
                    </Switch>*/}
                  <QueueAnim type='scaleX'>
                      <Route path={page.path} component={page.component}></Route>
                  </QueueAnim>  
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
        :
        <Redirect to='/msg'></Redirect>
          
    }
}

export default Dashbord
