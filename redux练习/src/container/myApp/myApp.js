import React, { Component } from 'react'
import Login from '../login/login'
import Register from '../register/register'

import AuthRoute from '../../component/authroute/authroute'
import BossInfo from '../bossinfo/bossinfo'
import GeniusInfo from '../geniusinfo/geniusinfo'

import Chat from '../../component/chat/chat'

import Dashbord from '../../component/dashbord/dashbord'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
class MyApp extends React.Component {   
  constructor(props) {     
    super(props);     
    this.state = { 
        error: false 
    };
  }
  componentDidCatch(error, info) {     
    this.setState({
        error:true
    });
  }
  render() {
    return this.state.error ? <h2>出错了</h2> 
        :
        (
         <BrowserRouter>
              <div>    {/*这个组件就是判断用户信息的
                        他不是路由组件  接受不到STORE 没有this.props
                        需要AuthRoute组件内部用到 withRouter
                        */}             
                      <AuthRoute></AuthRoute> 
                      <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                         <Route path='/chat/:user' component={Chat}></Route>
                         {/*所有路由都没命中 ，进入dashbord*/} 
                         <Route component={Dashbord}></Route>
                      </Switch>    
                                       
              </div>
            </BrowserRouter>
    )
  } 
}

export default MyApp
