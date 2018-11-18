import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux.js'
import {connect} from 'react-redux'
@withRouter

@connect(
    state => state.user,
    {loadData}
)

class AuthRoute extends React.Component{
    componentDidMount() {
        /*获取用户信息 
          是否登录，url是否跳转到login type是牛人还是BOSS
          个人信息是否完善
        */
       
        //先判断下是不是登录页或者注册页
        const publicList = ['/login','/regsiter']
        const pathName = this.props.location.pathname
        if(publicList.indexOf(pathName) > -1){
            console.log('已经是登录页或者注册页了')
            return 
        }
        axios.get("/user/info").then((res)=>{
            if(res.status == 200){
                if(res.data.code === 0 ){
                    //有登录信息的
                    this.props.loadData(res.data.data)
                }
                else{
                    console.log('没有登录信息的： '+JSON.stringify(this.props))
                  
                    this.props.history.push('/login')
                }
            }
        })

    }

    render(){
        return null
    }
}

export default AuthRoute
